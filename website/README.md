# Geo Literature Radar

面向本人和课题组研究生的地球系统科学前沿追踪网站。网站追踪近半年高质量期刊论文，并按气候变化、水文水资源、地球系统模型、遥感与 GeoAI、生态与碳循环、灾害风险和综合顶刊等主题组织。

## 本地运行

```powershell
cd "C:\Users\Ninjalago\Desktop\0513汇报\website"
& "C:\Users\Ninjalago\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js
```

访问：

```text
http://localhost:8051
```

## 当前功能

- 扁平化双语界面，可在中文和英文之间切换。
- 论文层面只展示英文原始题名、英文关键词、英文摘要、作者、DOI 和官方链接。
- 首页卡片突出英文题名、英文关键词和英文摘要缩略，避免任何自动生成的中文题名、摘要或关键词。
- 主题雷达用于快速查看不同研究方向的最新论文数量和摘要覆盖情况。
- 支持主题、期刊、摘要状态、时间窗口、阅读优先级和引用热度筛选排序。
- 对综合顶刊条目做基础清洗，过滤新闻、目录、Editorial Board、Correction 等不适合作为研究论文的记录。

## 数据刷新

手动刷新近半年论文：

```powershell
& "C:\Users\Ninjalago\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js --refresh-once
```

默认元数据源是 OpenAlex DOI metadata；设置 `USE_CROSSREF=1` 后会额外尝试 Crossref。本项目不下载或转载付费全文，只展示题录、摘要元数据、关键词和官方链接。

## 自检

```powershell
& "C:\Users\Ninjalago\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js --self-test
```

自检会验证首页、API、文章缓存、摘要覆盖率和前端所需的英文原始元数据。

## 当前优化

- 标题收束为“地球系统科学前沿追踪”，减少解释性话术。
- 删除前端中文元数据生成入口，避免 OpenAI 额度问题干扰使用。
- API 输出给前端时会剥离中文生成字段，页面只消费英文原始元数据。
- 卡片视觉改为更克制的文献速览结构：日期、期刊、摘要状态、英文题名、关键词、摘要缩略和官方链接。
