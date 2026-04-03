# TRTC Quick Demo React

A React-based quick demo for [Tencent Real-Time Communication (TRTC)](https://www.tencentcloud.com/products/trtc) Web SDK v5.

## Features

- **Enter/Exit Room** – Join or leave a TRTC room with SDKAppID, SDKSecretKey, UserId and RoomId
- **Local Audio/Video** – Capture and stop local camera and microphone
- **Mute Controls** – Toggle audio/video mute via overlay buttons on the local video
- **Screen Sharing** – Start and stop screen sharing
- **Device Management** – Enumerate, select, and switch cameras and microphones; hot-plug support
- **Remote Video** – Automatically subscribe and display remote participants' video streams
- **Invite Link** – Generate a one-time invite link after entering a room, auto-refresh on copy
- **Invite Page** – Simplified page for invited users to join a call directly
- **i18n** – Chinese (zh-cn) and English (en) language switching

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Zustand (state management)
- React Router v6 (HashRouter)
- react-i18next
- trtc-sdk-v5

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Prerequisites

1. Create a TRTC application in the [TRTC Console](https://console.trtc.io/)
2. Obtain your **SDKAppID** and **SDKSecretKey**
3. Enter them in the demo's input fields

## Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Root component with HashRouter
├── App.css               # Global styles
├── types/index.ts        # TypeScript type definitions
├── store/index.ts        # Zustand global store
├── hooks/useTRTC.ts      # Core TRTC hook
├── locales/              # i18n translations (en/zh-cn)
├── utils/                # Utility functions
├── components/           # Reusable UI components
│   ├── NavBar            # Top navigation bar
│   ├── Guidance          # Collapsible step-by-step guide
│   ├── Inputs            # Parameter input fields
│   ├── DeviceSelect      # Camera/microphone selectors
│   ├── Controls          # Action buttons
│   ├── InviteLink        # Invite link with copy
│   ├── LogPanel          # Operation log display
│   ├── LocalVideo        # Local video with mute controls
│   └── RemoteVideos      # Remote video grid
└── pages/
    ├── HomePage           # Main demo page
    └── InvitePage         # Invite landing page
```

## Security Notice

> **Warning**: This demo is for **debugging purposes only**. Before going to production, please migrate the UserSig calculation logic and secret key to your backend server to prevent unauthorized usage from key leakage.

## Links

- [TRTC Web SDK Documentation](https://web.sdk.qcloud.com/trtc/webrtc/v5/doc/en/tutorial-11-basic-video-call.html)
- [GitHub Repository](https://github.com/Tencent-RTC/TRTC_Web)
