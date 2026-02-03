import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    // Cloudflare Pages用の設定
    site: 'https://pt-kokushi.pages.dev',
    output: 'server',
    adapter: cloudflare(),
});
