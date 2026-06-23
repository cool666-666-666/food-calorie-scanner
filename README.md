# AI 热量助手

项目介绍：基于微信小程序 + 腾讯云开发 + 百度视觉 AI + DeepSeek LLM 的 AI 拍照识食热量管理工具。支持拍照扫描自动识别食物并获取热量数据、1100+ 内置食物库智能搜索、每日饮食日记与热量统计，以及 AI 个性化饮食建议与基础代谢计算。

## 主要工作

- **AI 辅助高效开发**：借助 Cursor + Claude 等 AI 编程工具辅助完成约 90% 的代码生成与迭代，在 AI 辅助下独立完成需求分析、架构设计、Prompt Engineering 与代码审查；配置 Git PostToolUse Hook 实现每次修改后自动提交并推送至 GitHub，显著提升开发效率。
- **AI 多模态食物识别系统**：设计并实现三路百度视觉 API（菜品识别、果蔬识别、通用物体识别）并行调用方案，通过加权共识评分算法自动选出最优识别结果，单次识别耗时低于 2 秒，覆盖 1100+ 常见食物的热量查询。
- **LLM 个性化饮食顾问**：基于 DeepSeek API 构建 LLM 饮食建议引擎，通过 System Prompt 角色设定 + Few-shot 示例注入 + JSON 结构化输出的 Prompt Engineering 方案，根据用户实际摄入与目标热量的差额，自动生成具体食物补充建议或运动消耗方案；LLM 调用失败时自动降级为公式估算，保证服务可用性。每日调用约 100 次。
- **拍照扫描一键记热量**：用户拍照或从相册选图即可自动完成食物识别 → 热量匹配 → 日记记录全流程，单次操作从拍照到记录完成约 5 秒，无需手动输入任何文字。

## 技术架构

```
小程序前端 (WeChat Mini-Program)
├── pages/
│   ├── index/         拍照识别 & 手动选择
│   ├── diary/         饮食日记 & AI 建议
│   └── profile/       个人中心 & BMR 计算
├── services/          业务逻辑层
│   ├── aiService      AI 视觉识别（三路并行 + 共识评分）
│   ├── foodService    食物查询（云端 + 本地 + 缓存）
│   ├── diaryService   日记 CRUD
│   └── bmrService     BMR 计算（Mifflin-St Jeor）
└── utils/             工具函数

云函数 (Tencent Cloud Base)
├── aiAdvisor/         LLM 饮食顾问（Prompt 工程 + Few-shot 示例）
├── deleteFood/        食物删除
├── diaryService/      日记数据操作
└── foodService/       食物数据查询
```

## AI 能力详情

### 1. 视觉识别（百度 AI 视觉 API）

- 三路 API 并行调用：菜品识别、果蔬识别、通用物体识别
- 包装检测：自动识别瓶/罐/袋等包装特征，动态调整阈值
- 跨 API 共识评分：加权投票 + 共识加分算法
- 识别不可信时自动降级为手动选择

### 2. LLM 饮食顾问（DeepSeek API）

- **Prompt 工程**：System Prompt 角色设定 + Few-shot 示例注入 + JSON 结构化输出
- 热量不足 → 推荐具体食物及食用量补充
- 热量超标 → 推荐具体运动及时长消耗
- LLM 调用失败时自动降级为公式估算建议

## 快速开始

1. 在微信开发者工具中导入项目
2. 复制 `miniprogram/config.example.js` 为 `config.js`，填入百度 AI API Key
3. 在云函数 `aiAdvisor` 中配置环境变量 `LLM_API_KEY`（DeepSeek API Key）
4. 部署云函数

## 配置要求

| 服务 | 配置位置 | 获取地址 |
|---|---|---|
| 百度 AI 视觉 | `miniprogram/config.js` | [百度智能云](https://console.bce.baidu.com/ai/) |
| DeepSeek LLM | 云函数环境变量 `LLM_API_KEY` | [DeepSeek Platform](https://platform.deepseek.com/) |
| 微信云开发 | `miniprogram/app.js` | 微信开发者工具 |
