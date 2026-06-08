# 栖居 ESTATE · 臻选房源

前端对接 [Supabase](https://supabase.com) 的房产展示与管理站点。支持房源浏览、详情轮播、预约看房，以及独立管理后台（房源 CRUD、图片上传、预约记录）。

未连接 Supabase 或数据表为空时，自动降级为内置演示数据。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | React 19 + TypeScript |
| 构建工具 | Vite 6 |
| UI 组件 | Ant Design 6（管理后台） |
| 样式 | 原生 CSS（前台自定义设计系统） |
| 后端服务 | Supabase（PostgreSQL + Storage + RLS） |
| 路由 | Hash 路由（`#/property/:id`、`#/admin/*`） |

## 功能概览

- **前台**：房源列表与筛选、详情页、多图轮播、预约看房表单
- **管理后台**：房源增删改查、本地图片上传至 Storage、预约记录查看、Supabase 连接配置
- **降级策略**：无 Supabase 配置或 `properties` 表为空时展示 `mockProperties` 演示数据

## 快速开始

### 环境要求

- Node.js 18+
- npm

### 安装与运行

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env，填入 Supabase 项目的 URL 与 anon key（eyJ 开头的 JWT）

# 3. 启动开发服务器
npm run dev
```

也可在管理后台「系统设置」中填写 Supabase 连接信息（保存在浏览器 `localStorage`）。

### 构建与预览

```bash
npm run build    # TypeScript 检查 + 生产构建
npm run preview  # 预览构建产物
```

## 项目结构

```
src/
├── components/       # 前台 UI 组件
├── pages/            # 前台页面（首页、房源详情）
├── pages/admin/      # 管理后台（房源、预约、设置）
├── lib/              # 业务逻辑（Supabase、路由、存储、分页）
├── hooks/            # 自定义 Hook
├── types/            # TypeScript 类型
└── data/             # 演示数据
```

## Supabase 配置

在 Supabase Dashboard → **SQL Editor** 中执行建表脚本。完整 SQL（含 RLS、Storage、故障排查）见 [`supabase.txt`](./supabase.txt)。

### 1. 房源表 `properties`

```sql
create table properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric not null,
  address text not null,
  city text not null,
  bedrooms int,
  bathrooms int,
  area_sqm numeric,
  property_type text,
  image_url text,
  image_urls text[],
  featured boolean default false,
  status text default 'available',
  created_at timestamptz default now()
);

alter table properties enable row level security;

create policy "public read properties"
  on properties for select to public using (true);

create policy "public insert properties"
  on properties for insert to public with check (true);

create policy "public update properties"
  on properties for update to public using (true) with check (true);

create policy "public delete properties"
  on properties for delete to public using (true);

grant select, insert, update, delete on properties to anon, authenticated;
```

`image_url` 为封面图（第一张），`image_urls` 存储全部图片 URL，详情页轮播展示。

### 2. 预约表 `appointments`

```sql
create table appointments (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete set null,
  name text not null,
  phone text not null,
  city text,
  message text,
  created_at timestamptz default now()
);

alter table appointments enable row level security;

create policy "public read appointments"
  on appointments for select to public using (true);

create policy "public insert appointments"
  on appointments for insert to public with check (true);

grant select, insert on appointments to anon, authenticated;
```

### 3. 图片 Storage

图片上传至 Supabase Storage 桶 `property-images`（需设为 **Public bucket**），再将公开 URL 写入房源字段。

```sql
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

create policy "public read property images"
  on storage.objects for select to public
  using (bucket_id = 'property-images');

create policy "public upload property images"
  on storage.objects for insert to public
  with check (bucket_id = 'property-images');
```

上传失败或图片 403 时，参见 [`supabase.txt`](./supabase.txt) 中的「Storage 权限修复」与「RLS 报错修复」。

## 字段说明

| 列名 | 说明 |
|------|------|
| `title` | 房源标题 |
| `price` | 价格（元，如 12800000） |
| `city` / `address` | 城市与地址 |
| `bedrooms` / `bathrooms` / `area_sqm` | 卧室、卫浴、面积 |
| `property_type` | `apartment` / `villa` / `townhouse` / `penthouse` |
| `image_url` | 封面图 URL |
| `image_urls` | 全部图片 URL 数组 |
| `featured` | 是否臻选推荐 |
| `status` | `available` / `pending` / `sold` |

## 管理后台

访问 `#/admin/properties`（或点击前台右上角「管理后台」）进入管理界面：

| 路由 | 功能 |
|------|------|
| `#/admin/properties` | 房源列表（分页） |
| `#/admin/properties/new` | 新增房源 |
| `#/admin/properties/:id/edit` | 编辑房源 |
| `#/admin/appointments` | 预约记录 |
| `#/admin/settings` | Supabase 连接配置 |

## 环境变量

| 变量 | 说明 |
|------|------|
| `VITE_SUPABASE_URL` | Supabase 项目 API URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key（`eyJ` 开头） |

在 Supabase Dashboard → **Project Settings → API** 获取。

## 许可证

Private
