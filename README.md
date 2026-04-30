# Yolongtec V7.2 - Decap CMS 企业官网

**版本**: V7.2  
**CMS**: Decap CMS (Git-based)  
**基础版本**: V7 (静态网站)

---

## 🎯 项目简介

Yolongtec V7.2 在 V7 静态网站基础上集成了 Decap CMS，提供图形化管理后台，支持网页编辑产品、文章、图片，无需接触代码即可完成内容更新。

---

## 📁 目录结构

```
yolongtec-v7.2/
├── _config.yml              # Decap CMS 配置
├── admin/
│   └── index.html           # CMS 管理入口 (/admin/)
├── content/
│   ├── products/            # 产品内容 (Markdown)
│   └── articles/            # 文章内容 (Markdown)
├── .github/
│   └── workflows/
│       └── build.yml        # GitHub Actions 自动构建
├── index.html               # 复用 V7 首页
├── styles.css               # 复用 V7 样式
├── script.js                # 复用 V7 脚本
└── README.md                 # 本文件
```

---

## 🚀 快速开始

### 本地预览 CMS

1. 安装 Decap CMS 本地开发服务器：
```bash
npx decap-server
```

2. 在项目目录启动：
```bash
npx decap-server --port 8080
```

3. 打开浏览器访问：`http://localhost:8080/admin/`

### 部署到 GitHub Pages

详见 [DEPLOY.md](./DEPLOY.md)

---

## 📝 内容管理

### 产品管理

1. 访问 `/admin/`
2. 选择 "产品" 栏目
3. 可添加/编辑/删除产品
4. 保存后自动提交到 GitHub 仓库
5. 自动触发 GitHub Actions 构建

### 文章管理

1. 访问 `/admin/`
2. 选择 "文章" 栏目
3. 支持富文本 Markdown 编辑
4. 保存后自动发布

---

## 🔧 配置说明

### 修改 GitHub 仓库

编辑 `_config.yml` 中的 `repo` 字段：
```yaml
backend:
  name: github
  repo: your-username/yolongtec   # 改成你的仓库
  branch: main
```

### 添加新产品分类

编辑 `_config.yml` 中 `products` 集合的 `category` 字段：
```yaml
- {label: "分类", name: "category", widget: "select", 
  options: ["drill", "fastening", "grinder-cutter", "hammer", "saw", 
           "sander-polisher", "cleanning", "lighting"]}
```

---

## 📚 相关文档

- [SPEC.md](./SPEC.md) - 项目规格说明
- [TODO.md](./TODO.md) - 待办事项
- [DEPLOY.md](./DEPLOY.md) - 部署指南
- [Decap CMS 官方文档](https://decapcms.org/)

---

**最后更新**: 2026-04-30