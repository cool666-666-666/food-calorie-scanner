/**
 * 合并脚本：将 信息 数据合并到 foods_data.js
 * 逻辑：按 name 匹配，有则更新，无则插入，同时去重
 * 用法: node merge_foods.js
 */
const fs = require('fs');
const path = require('path');

// 读取 信息 文件（纯 JSON 数组）
const infoPath = path.join(__dirname, '信息');
const infoRaw = fs.readFileSync(infoPath, 'utf8');
const infoData = JSON.parse(infoRaw);
console.log(`信息文件共 ${infoData.length} 条`);

// 读取 foods_data.js（CommonJS 模块）
const foodsPath = path.join(__dirname, 'miniprogram', 'foods_data.js');
const foodsRaw = fs.readFileSync(foodsPath, 'utf8');

// 解析 foods_data.js：提取 JSON 数组部分
// 格式: module.exports = [...]\n;
const match = foodsRaw.match(/module\.exports\s*=\s*(\[[\s\S]*?\])\s*;/);
if (!match) {
  console.error('无法解析 foods_data.js');
  process.exit(1);
}
const foodsData = JSON.parse(match[1]);
console.log(`foods_data.js 原始 ${foodsData.length} 条`);

// 构建信息数据的 name 索引
const infoMap = new Map();
for (const item of infoData) {
  infoMap.set(item.name, item);
}

// 统计
let updated = 0;
let inserted = 0;
let dedupRemoved = 0;

// 遍历 foods_data，按 name 去重并更新
const seenNames = new Set();
const merged = [];

for (const item of foodsData) {
  const name = item.name;

  if (seenNames.has(name)) {
    // 重复项，直接跳过（删除）
    dedupRemoved++;
    continue;
  }

  seenNames.add(name);

  if (infoMap.has(name)) {
    // 信息中有这条数据 → 用信息的数据更新
    merged.push(infoMap.get(name));
    infoMap.delete(name); // 标记为已处理
    updated++;
  } else {
    // 信息中没有 → 保留原数据
    merged.push(item);
  }
}

// 信息中有但 food_data 中没有的 → 插入
for (const [name, item] of infoMap) {
  merged.push(item);
  inserted++;
  seenNames.add(name);
}

// 写入
const output = `module.exports = ${JSON.stringify(merged, null, 2)};\n`;
fs.writeFileSync(foodsPath, output, 'utf8');

console.log(`\n合并完成！`);
console.log(`更新: ${updated} 条`);
console.log(`插入: ${inserted} 条`);
console.log(`去重删除: ${dedupRemoved} 条`);
console.log(`合并后共 ${merged.length} 条`);
