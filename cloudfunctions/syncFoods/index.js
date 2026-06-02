// 云函数：批量同步食物数据到云数据库（upsert：有则更新，无则插入）
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event) => {
  const { foods } = event;
  if (!foods || !Array.isArray(foods) || foods.length === 0) {
    return { success: false, errMsg: '参数 foods 不能为空' };
  }

  const results = { total: foods.length, updated: 0, inserted: 0, failed: 0, errors: [] };

  // 分批处理，避免超时
  const BATCH_SIZE = 20;
  for (let i = 0; i < foods.length; i += BATCH_SIZE) {
    const batch = foods.slice(i, i + BATCH_SIZE);
    const promises = batch.map(async (food) => {
      try {
        const res = await db.collection('foods').where({ name: food.name }).get();
        if (res.data.length > 0) {
          // 已存在 → 更新（使用第一个匹配项的 _id）
          const docId = res.data[0]._id;
          await db.collection('foods').doc(docId).update({
            data: {
              calorie: food.calorie,
              unit: food.unit,
              aliases: food.aliases
            }
          });
          results.updated++;
        } else {
          // 不存在 → 插入
          await db.collection('foods').add({ data: food });
          results.inserted++;
        }
      } catch (e) {
        results.failed++;
        results.errors.push({ name: food.name, errMsg: e.message });
      }
    });
    await Promise.all(promises);
  }

  return { success: true, ...results };
};
