# PT国試コミュニティ 公式サイト

理学療法士国家試験向け学生コミュニティの公式ホームページです。

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
cd pt-community-site
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:4321` を開きます。

### 3. 本番ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが生成されます。

## ⚙️ 設定ファイルの編集

### 外部リンクの変更

`src/config/site.ts` を編集してください：

```typescript
export const siteConfig = {
  // 以下のURLを実際の値に差し替えてください
  STRIPE_SUBSCRIPTION_URL: "https://buy.stripe.com/your-payment-link",
  SLACK_JOIN_GUIDE_URL: "https://your-slack-guide-url",
  CANVA_RESOURCE_HUB_URL: "https://your-canva-hub-url",
  SCHOOL_INQUIRY_FORM_URL: "https://forms.google.com/your-form",
  CONTACT_EMAIL: "your-email@example.com",
};
```

### サイトURLの変更

`astro.config.mjs` を編集してください：

```javascript
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/your-repo-name',
  // ...
});
```

## 📝 記事の追加・編集

### 教材比較記事の追加

1. `src/content/materials/` に新しいMarkdownファイルを作成
2. 以下のフロントマターを設定：

```markdown
---
title: "記事タイトル"
description: "記事の説明"
category: "kokushi-comprehensive" # カテゴリID
publishedDate: 2024-01-01 # 公開日
---

記事本文...
```

### カテゴリID

- `kokushi-comprehensive` - 国試総合
- `anatomy` - 解剖学
- `kinesiology` - 運動学
- `internal-medicine` - 内科系
- `clinical-practice` - 実習対策

## 🚢 デプロイ

### GitHub Pages へのデプロイ

1. GitHubにリポジトリを作成（`kazuya0077/flagship-`）

2. GitHub Actionsのワークフローを設定

`.github/workflows/deploy.yml` を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. GitHubリポジトリの Settings > Pages で、ソースを "GitHub Actions" に設定

4. コードをpushすると自動的にデプロイされます

### Cloudflare Pages へのデプロイ

1. Cloudflareダッシュボードで新しいPagesプロジェクトを作成
2. GitHubリポジトリを接続
3. ビルド設定：
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 20

## 📁 ディレクトリ構成

```
pt-community-site/
├── src/
│   ├── config/
│   │   └── site.ts          # 設定ファイル
│   ├── layouts/
│   │   └── BaseLayout.astro # 共通レイアウト
│   ├── components/          # UIコンポーネント
│   ├── pages/               # ページ
│   ├── content/
│   │   └── materials/       # Markdown記事
│   └── styles/
│       └── global.css       # グローバルスタイル
├── public/                  # 静的ファイル
├── astro.config.mjs         # Astro設定
└── package.json
```

## ⚠️ 注意事項

- 教材比較ページ（/materials）にはアフィリエイトリンクを含みます
- 各記事の冒頭に広告表記を必ず入れてください
- 合格保証や誇大表現は避けてください

## 📜 ライセンス

プライベートリポジトリ用。無断転載・複製禁止。
