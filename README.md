# Yolongtec V7.2 企业官网

**版本**: V7.2  
**技术栈**: Jekyll + GitHub Pages + GitHub Actions  
**部署地址**: https://heyxier.github.io/yolongtec-website-demo/

---

## 项目状态

⚠️ **注意**: Decap CMS 管理后台（`/admin/`）需要 Netlify 认证代理，在国内环境访问不稳定。因此内容管理采用 **Markdown 文件方式**，操作规范详见 [OPERATIONS.md](./OPERATIONS.md)。

---

## 📁 目录结构

```
yolongtec-v7.2/
├── _config.yml              # Jekyll 配置
├── Gemfile                  # Ruby 依赖
├── admin/
│   ├── index.html           # CMS 入口（静态，暂不可用）
│   └── config.yml            # CMS 配置（暂不可用）
├── content/
│   ├── products/            # 产品内容（Markdown 文件）
│   │   ├── index.html       # 产品列表页
│   │   ├── zpt-cd-18502.md  # 产品示例
│   │   └── zpt-hm-22602.md  # 新增产品
│   └── articles/            # 文章内容（Markdown 文件）
│       └── 2026-award.md
├── products/                # 静态产品分类页（V7 遗留）
│   ├── drill/
│   ├── fastening/
│   ├── hammer/
│   └── ...
├── _layouts/                # Jekyll 页面模板
│   ├── default.html         # 页面框架
│   ├── product.html         # 产品详情布局
│   └── article.html         # 文章布局
├── .github/
│   └── workflows/
│       └── build.yml        # GitHub Actions 自动构建
├── index.html               # 首页
├── styles.css               # 全局样式
├── script.js                # 交互脚本
├── SPEC.md                  # 项目规格说明
├── OPERATIONS.md            # 内容运营规范 ⚠️ 必读
├── CHANGELOG.md             # 版本变更记录
└── README.md                # 本文件
```

---

## 🚀 快速开始

### 查看网站

https://heyxier.github.io/yolongtec-website-demo/

### 本地预览

```bash
# 安装 Jekyll（需 Ruby）
gem install jekyll bundler

# 启动本地服务器
cd yolongtec-v7.2
bundle exec jekyll serve --port 8080

# 打开浏览器
http://localhost:8080
```

---

## 📝 内容管理（重要）

**内容管理不通过 Admin 后台**，而是通过 **GitHub 网页直接编辑 Markdown 文件**。

详细操作规范 → 请阅读 [OPERATIONS.md](./OPERATIONS.md)

### 产品管理

文件路径: `content/products/*.md`

添加新产品：
1. 打开 https://github.com/Heyxier/yolongtec-website-demo/tree/main/content/products
2. 点 `Add file` → `Create new file`
3. 文件名格式: `zpt-型号.md`
4. 复制模板并填写（参考 OPERATIONS.md）
5. Commit → 自动构建 → 2分钟后上线

### 文章管理

文件路径: `content/articles/*.md`

流程同上，参考 OPERATIONS.md。

---

## ⚙️ 技术架构

| 层级 | 技术 | 说明 |
|------|------|------|
| 静态生成 | Jekyll 4.3 | 将 Markdown 编译为 HTML |
| 托管 | GitHub Pages | 免费的静态网站托管 |
| CI/CD | GitHub Actions | 推送代码后自动构建部署 |
| 内容存储 | Git 仓库 | Markdown 文件直接存储在 Git 中 |
| 样式 | CSS3 + Vanilla JS | 无框架依赖 |

### 构建流程

```
push 代码 → GitHub Actions 触发 → bundle exec jekyll build → 部署到 GitHub Pages
```

---

## 📚 相关文档

| 文档 | 说明 |
|------|------|
| [SPEC.md](./SPEC.md) | 项目设计规格（色彩、字体、布局） |
| [OPERATIONS.md](./OPERATIONS.md) | **内容管理操作手册**（必读） |
| [CHANGELOG.md](./CHANGELOG.md) | 版本历史 |
| [DEPLOY.md](./DEPLOY.md) | 部署详细说明 |

---

## ❓ 常见问题

**Q: 为什么不用 Admin 后台？**  
A: Decap CMS 的 GitHub 认证需要 Netlify 作为 OAuth 代理，国内访问延迟高且不稳定。已改用 Markdown 文件方式管理内容，完全等同效果。

**Q: 如何更新网站内容？**  
A: 通过 GitHub 网页直接编辑 `content/products/` 或 `content/articles/` 下的 `.md` 文件。详见 [OPERATIONS.md](./OPERATIONS.md)。

**Q: 产品页面路径是什么？**  
A: Collection 产品页面: `/products/`  
   静态分类页: `/products/drill/`, `/products/hammer/` 等

**Q: 如何添加新产品图片？**  
A: 将图片文件上传到 `images/` 目录，然后在 `.md` 文件的 `image` 字段引用（如 `/images/product-01.jpg`）。

---

**最后更新**: 2026-05-02  
**维护方式**: 通过 GitHub 直接编辑 Markdown 文件