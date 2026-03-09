# FLAGSHIP プロジェクト — CLAUDE.md

## 正本ディレクトリ（絶対遵守）
| 種別 | パス |
|---|---|
| 正本（Googleドライブ） | `G:\マイドライブ\白幡さんとの共同事業\flagship-` |
| ASCII複製（dev server用） | `C:\flagship-local` |
| 旧版（参照のみ・変更禁止） | `G:\マイドライブ\白幡さんとの共同事業\pt-community-site` |

## プロジェクト概要
PT（理学療法士）学生向け **完全無料** 学習コミュニティ
- **収益モデル**: ASP（アフィリエイト）のみ。月額課金・登録費・強制購入は一切なし
- **Slack URL**: `https://join.slack.com/t/w1770042408-udj851554/shared_invite/zt-3rx8j8dfp-f7KBi5eKMllznjjQFm4BnQ`
- **デプロイ先**: Cloudflare Pages — `https://flagship-2i0.pages.dev`
- **ブランド名**: FLAGSHIP（旧称 PT国試コミュニティ と混在注意）

## 技術スタック
```
Astro 4 (SSG)  |  TypeScript  |  Tailwind不使用
CSS v3カスタムプロパティ（--accent, --bg-alt, --border-light, --text-body など）
v2互換レイヤー → global.css末尾に追記済み（--primary→--accent, --space-*, --text-sm など）
ビルドコマンド: npm run dev / npm run build
```

## 開発ルール

### ファイル修正の原則
1. **修正はGoogleドライブ正本のみ**（C:\flagship-local は直接編集しない）
2. 正本 → ASCII複製へのSync（日本語パスを含むため Python を使う）:
   ```bash
   python -c "import shutil; shutil.copy2('G:\\マイドライブ\\...\\file.astro', 'C:\\flagship-local\\...')"
   ```
3. **build確認必須**: 変更後は `cd C:\flagship-local && npm run build`
4. **preview確認必須**: `http://localhost:4321/` で該当ページを目視確認

### 完了条件チェックリスト（毎セッション）
- [ ] `npm run build` → exit 0 / `[build] Complete!` 確認
- [ ] preview URL で変更ページを目視確認
- [ ] 有料サービスワード残骸ゼロ（`500円` `Stripe` `月額` `有料会員` `課金` `返金` `支払い方法`）
- [ ] Slackリンクが実URL（`join.slack.com/t/w1770042408...`）

### 禁止事項
- `pt-community-site` フォルダを修正しない
- 複数フォルダを並行して修正しない
- build確認なしで「完了」と宣言しない
- 有料サービス・課金の表現を追加しない

## TODO残課題
```
優先度高
  □ site.ts: canvaResourceHub を実URLに（白幡さん提供待ち）
  □ site.ts: schoolInquiryForm を実URLに（白幡さん提供待ち）
  □ index.astro: Amazonアフィリエイトリンク（ASIN）を実値に置換

優先度中
  □ about.astro: チームメンバー名・写真を実データに
  □ affiliate-disclosure.astro: 「2024年1月1日」を実日付に更新

優先度低
  □ blog: 記事を追加（現在3記事のみ）
  □ kokushi: 第60回以降追加
```

## 主要ファイルマップ
```
src/
├── config/site.ts          ← サイト設定の唯一の真実（URL, email, Slack等）
├── layouts/BaseLayout.astro← 全ページ共通レイアウト
├── styles/global.css       ← CSS v3デザインシステム（+v2互換レイヤー）
└── pages/
    ├── index.astro         ← LP（ヒーロー、ASP誘導、CTA）
    ├── join.astro          ← 参加ページ（完全無料 + Slack導線）
    ├── faq.astro           ← FAQ（v2 CSS変数使用→互換レイヤーで対応）
    ├── resources.astro     ← 学習資産ハブ（v2 CSS変数使用）
    ├── about.astro         ← チーム紹介（メンバー名TODO）
    ├── legal/tokusho.astro ← 特商法表記（無料サービス版・v3 CSS）
    └── policy/
        └── affiliate-disclosure.astro ← ASP開示
```
