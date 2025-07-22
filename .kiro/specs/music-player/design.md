# 设计文档

## 概述

音乐播放器是一个全栈TypeScript应用，采用前后端分离架构。前端使用React构建用户界面，后端使用Node.js + Express提供API服务。应用支持音乐文件上传、播放控制、播放列表管理等核心功能。

## 架构

### 整体架构
```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   前端 (React)   │ ←─────────────────→ │  后端 (Express)  │
│   - 用户界面     │                     │   - API 服务     │
│   - 音频播放     │                     │   - 文件处理     │
│   - 状态管理     │                     │   - 数据库操作   │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │   数据存储       │
                                        │  - SQLite DB    │
                                        │  - 音频文件     │
                                        └─────────────────┘
```

### 技术栈选择

**前端技术栈：**
- **React 18 + TypeScript** - 现代化UI框架，类型安全
- **Vite** - 快速的开发构建工具
- **Tailwind CSS** - 实用优先的样式框架
- **React Router** - 客户端路由管理
- **Zustand** - 轻量级状态管理
- **React Query** - 服务端状态管理和缓存

**后端技术栈：**
- **Node.js + Express + TypeScript** - 轻量级API服务器
- **Multer** - 多媒体文件上传处理
- **SQLite + better-sqlite3** - 轻量级数据库
- **music-metadata** - 音频元数据提取
- **cors** - 跨域资源共享
- **helmet** - 安全中间件

## 组件和接口

### 前端组件架构

```
App
├── Layout
│   ├── Header (导航栏)
│   ├── Sidebar (播放列表侧边栏)
│   └── MiniPlayer (底部播放器)
├── Pages
│   ├── Library (音乐库页面)
│   ├── Upload (上传页面)
│   └── Playlist (播放列表页面)
└── Components
    ├── AudioPlayer (音频播放器核心)
    ├── TrackList (曲目列表)
    ├── PlaylistManager (播放列表管理)
    └── FileUploader (文件上传组件)
```

### 后端API接口

**音乐文件相关：**
```typescript
// 上传音乐文件
POST /api/tracks/upload
Content-Type: multipart/form-data
Response: { id: string, title: string, artist: string, ... }

// 获取所有音乐
GET /api/tracks
Response: Track[]

// 获取音乐文件流
GET /api/tracks/:id/stream
Response: audio/mpeg stream

// 删除音乐文件
DELETE /api/tracks/:id
Response: { success: boolean }
```

**播放列表相关：**
```typescript
// 创建播放列表
POST /api/playlists
Body: { name: string }
Response: Playlist

// 获取所有播放列表
GET /api/playlists
Response: Playlist[]

// 添加歌曲到播放列表
POST /api/playlists/:id/tracks
Body: { trackId: string }
Response: { success: boolean }

// 从播放列表移除歌曲
DELETE /api/playlists/:playlistId/tracks/:trackId
Response: { success: boolean }
```

## 数据模型

### 数据库表结构

**tracks 表：**
```sql
CREATE TABLE tracks (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  title TEXT,
  artist TEXT,
  album TEXT,
  duration INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**playlists 表：**
```sql
CREATE TABLE playlists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**playlist_tracks 表：**
```sql
CREATE TABLE playlist_tracks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  playlist_id TEXT NOT NULL,
  track_id TEXT NOT NULL,
  position INTEGER NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
  FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);
```

### TypeScript 类型定义

```typescript
// 共享类型定义
interface Track {
  id: string;
  filename: string;
  originalName: string;
  title?: string;
  artist?: string;
  album?: string;
  duration?: number;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

interface Playlist {
  id: string;
  name: string;
  tracks?: Track[];
  createdAt: string;
  updatedAt: string;
}

interface PlaylistTrack {
  id: number;
  playlistId: string;
  trackId: string;
  position: number;
  addedAt: string;
}
```

## 错误处理

### 前端错误处理策略
- **网络错误：** 使用React Query的重试机制和错误边界
- **文件上传错误：** 显示具体错误信息和上传进度
- **播放错误：** 音频加载失败时跳过到下一首
- **用户反馈：** 使用Toast通知显示操作结果

### 后端错误处理策略
- **文件上传错误：** 验证文件类型、大小，返回具体错误信息
- **数据库错误：** 事务回滚，记录错误日志
- **文件系统错误：** 检查磁盘空间，处理文件权限问题
- **API错误：** 统一错误响应格式

```typescript
// 统一错误响应格式
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

## 测试策略

### 前端测试
- **单元测试：** 使用Vitest测试组件逻辑
- **集成测试：** 测试组件间交互和API调用
- **E2E测试：** 使用Playwright测试完整用户流程

### 后端测试
- **单元测试：** 测试API路由和业务逻辑
- **集成测试：** 测试数据库操作和文件处理
- **API测试：** 使用Supertest测试HTTP接口

### 测试覆盖重点
1. 文件上传和元数据提取
2. 音频播放和控制功能
3. 播放列表CRUD操作
4. 错误处理和边界情况
5. 用户界面交互

## 安全考虑

### 文件上传安全
- 文件类型白名单验证
- 文件大小限制（50MB）
- 文件名清理和重命名
- 病毒扫描（可选）

### API安全
- CORS配置限制
- 请求速率限制
- 输入验证和清理
- 安全头部设置

### 数据安全
- SQL注入防护
- 文件路径遍历防护
- 敏感信息不记录日志

## 性能优化

### 前端优化
- 组件懒加载
- 音频文件流式播放
- 图片和元数据缓存
- 虚拟滚动（大列表）

### 后端优化
- 数据库索引优化
- 文件流式传输
- 响应压缩
- 静态资源缓存

## 部署架构

### 开发环境
- 前端：Vite开发服务器 (http://localhost:5173)
- 后端：Express服务器 (http://localhost:3000)
- 数据库：本地SQLite文件

### 生产环境建议
- 前端：静态文件部署到CDN
- 后端：Node.js服务器（PM2管理）
- 数据库：SQLite或升级到PostgreSQL
- 反向代理：Nginx