# TRTC 快速体验 Demo（React 版）

基于 React 的 [腾讯云实时音视频（TRTC）](https://cloud.tencent.com/product/trtc) Web SDK v5 快速体验 Demo。

## 功能特性

- **进房/退房** – 输入 SDKAppID、SDKSecretKey、UserId 和 RoomId 后加入或离开 TRTC 房间
- **本地音视频采集** – 开启和停止本地摄像头和麦克风采集
- **静音控制** – 通过本地视频浮层上的图标按钮切换音频/视频静音
- **屏幕共享** – 开始和停止屏幕共享
- **设备管理** – 摄像头和麦克风的枚举、选择和动态切换，支持设备热插拔
- **远端视频** – 自动订阅和显示远端参与者的视频流
- **邀请链接** – 进房后生成一次性邀请链接，复制后自动刷新
- **邀请页面** – 被邀请者通过链接进入精简版通话页面
- **中英文切换** – 支持中文（zh-cn）和英文（en）两种语言

## 技术栈

- React 18 + TypeScript
- Vite 5
- Zustand（状态管理）
- React Router v6（HashRouter）
- react-i18next
- trtc-sdk-v5

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 前置条件

1. 在 [实时音视频控制台](https://console.cloud.tencent.com/trtc) 创建 TRTC 应用
2. 获取 **SDKAppID** 和 **SDKSecretKey**
3. 在 Demo 的输入框中填入对应参数

## 项目结构

```
src/
├── main.tsx              # 应用入口
├── App.tsx               # 根组件（HashRouter 路由）
├── App.css               # 全局样式
├── types/index.ts        # TypeScript 类型定义
├── store/index.ts        # Zustand 全局状态
├── hooks/useTRTC.ts      # TRTC 核心 Hook
├── locales/              # 国际化翻译文件（中/英）
├── utils/                # 工具函数
├── components/           # 可复用 UI 组件
│   ├── NavBar            # 顶部导航栏
│   ├── Guidance          # 可折叠引导步骤
│   ├── Inputs            # 参数输入框
│   ├── DeviceSelect      # 摄像头/麦克风选择
│   ├── Controls          # 操作按钮组
│   ├── InviteLink        # 邀请链接（含复制）
│   ├── LogPanel          # 操作日志面板
│   ├── LocalVideo        # 本地视频（含静音控制）
│   └── RemoteVideos      # 远端视频网格
└── pages/
    ├── HomePage           # 主页面
    └── InvitePage         # 邀请页面
```

## 安全提示

> **注意**：本 Demo 仅用于调试。正式上线前，请将 UserSig 计算代码和密钥迁移到您的后台服务器上，以避免加密密钥泄露导致的流量盗用。

## 相关链接

- [TRTC Web SDK 文档](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/zh-cn/tutorial-11-basic-video-call.html)
- [GitHub 仓库](https://github.com/Tencent-RTC/TRTC_Web)
