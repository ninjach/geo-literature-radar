# 地球系统科学前沿追踪

面向课题组与外部访问者的高质量地球系统科学文献追踪网站。前端可通过 GitHub Pages 静态部署；本地仍可运行 Node 服务刷新 OpenAlex / DOI 元数据。

## 本地运行

```powershell
cd website
npm start
```

访问 `http://localhost:8051`。

## GitHub Pages 部署

本仓库已配置 `.github/workflows/pages.yml`。推送到 `main` 后，GitHub Actions 会执行：

```bash
cd website
npm run build:pages
```

并发布 `website/dist` 到 GitHub Pages。

首次在 GitHub 仓库中启用 Pages：

1. 打开仓库的 `Settings`。
2. 进入 `Pages`。
3. 在 `Build and deployment` 中选择 `GitHub Actions`。
4. 等待 `Actions` 中的 `Deploy GitHub Pages` 工作流完成。

公开访问地址通常是：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```

## 数据说明

- 公网页面读取 `assets/data/articles.json` 和 `assets/data/journals.json`。
- 公开版本只包含英文原始题名、英文关键词、英文摘要、作者、DOI、期刊和官方链接。
- `.env`、后端代码、缓存原始 JSON 不会进入 GitHub Pages 发布目录。
