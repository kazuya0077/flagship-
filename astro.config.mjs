import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://pt-kokushi.pages.dev',
    output: 'static', // 静的サイト生成（SSG）モード - 最もシンプルで確実
});
