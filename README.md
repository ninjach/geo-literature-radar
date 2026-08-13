# 地球系统科学前沿追踪

面向课题组的动态文献雷达。网站跟踪 24 种高质量地球系统科学期刊，保留出版方英文题名、关键词和摘要，并提供主题雷达、字段检索、质量分层、开放获取筛选、个人收藏与阅读记录。

线上地址：[https://ninjach.github.io/geo-literature-radar/](https://ninjach.github.io/geo-literature-radar/)

## 动态更新机制

GitHub Actions 每天北京时间 05:17 执行一次：

1. 从 OpenAlex 与 Crossref 获取最近 12 个月的真实元数据，并以期刊 RSS 作为补充。
2. 对请求执行分批、限速、指数退避和旧数据回退。
3. 校验文章数量、期刊覆盖、日期、DOI 与摘要覆盖率。
4. 将新数据回写到仓库，使定时工作流保持活跃并保留可审计历史。
5. 生成静态站点并部署到 GitHub Pages。

`OPENALEX_API_KEY`、`OPENALEX_MAILTO`、`CROSSREF_MAILTO` 可在仓库的 `Settings > Secrets and variables > Actions` 中配置。OpenAlex 免费 API key 能显著降低匿名池限流风险；不配置时仍会使用匿名批量请求和旧数据回退。

## 本地运行

```powershell
cd website
npm start
```

访问 `http://localhost:8051`。本地 Node 服务支持即时刷新和数据健康接口；GitHub Pages 使用构建时生成的静态数据。

## 构建与验证

```powershell
cd website
npm run build:pages:refresh
npm run validate
npm test
```

生成目录为 `website/dist`。公开构建不包含 `.env`、API 密钥或服务端缓存。

## 数据边界

- 文章元数据来自 OpenAlex、Crossref 和期刊 RSS，网站提供 DOI 与期刊原始页面链接。
- 英文摘要可能受出版方许可和索引完整度影响；界面明确标识缺失项，不生成虚构摘要。
- 收藏、阅读历史和个人档案仅保存在浏览器本地，可导入、导出或清除。
- 详细整改与验证记录见 [`docs/upgrade-audit-2026-08.md`](docs/upgrade-audit-2026-08.md)。
