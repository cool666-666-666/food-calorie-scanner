# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

...mermaid
flowchart TB
 subgraph subGraph0["本地开发环境 (Local Development)"]
        B("小程序前端 /miniprogram")
        A["project.config.json"]
        C("云函数 /cloudfunctions")
        D["project.private.config.json"]
        F{"微信开发者工具 CLI"}
        E["uploadCloudFunction.sh"]
  end
 subgraph s1["核心能力"]
        H[("云数据库")]
        G["quickstartFunctions"]
        J["云存储 Storage"]
  end
 subgraph subGraph2["腾讯云开发后端 (TCB Backend)"]
        I["foods_data.json"]
        s1
  end
    A -- 定义根目录 --> B
    A -- 定义云函数目录 --> C
    D -- 覆盖配置 --> A
    E -- 部署脚本 --> F
    F -- 部署云函数 --> G
    H --- I
    G -- 读写 --> H
    B -- 调用 --> G
    B -- 管理 --> J
    I -. 初始化导入 .-> H
    B -. JSON 接口请求 .-> G

     A:::config
     B:::process
     C:::process
     D:::config
     E:::process
     F:::process
     G:::process
     H:::storage
     I:::storage
     J:::storage
    classDef config fill:#f9f,stroke:#333,stroke-width:2px
    classDef process fill:#bbf,stroke:#333,stroke-width:2px
    classDef storage fill:#dfd,stroke:#333,stroke-width:2px
## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

