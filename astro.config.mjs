import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    // Cloudflare Pages用の設定
    // 本番URLは実際のドメインまたはCloudflareのデフォルトURLに変更してください
    site: 'https://pt-kokushi.pages.dev',
    integrations: [sitemap()],
    output: 'static',
});
