/**
 * Google AI Studio (Gemini / Imagen 3) 画像生成スクリプト
 * プロジェクト: Flagship PT コミュニティ (C:/flagship-local)
 * デザイン: ダークネイビー × ブルー (#00A8FF) × クリーンテック
 *
 * ◆ 事前準備 (APIキー設定):
 *   Windows CMD:   set GOOGLE_AI_API_KEY=AIza...あなたのキー...
 *   Windows PS:    $env:GOOGLE_AI_API_KEY="AIza...あなたのキー..."
 *   Mac/Linux:     export GOOGLE_AI_API_KEY=AIza...あなたのキー...
 *
 * ◆ 実行:
 *   node scripts/generate-images.mjs
 *
 * ◆ 特定画像だけ生成:
 *   node scripts/generate-images.mjs hero-bg
 *   node scripts/generate-images.mjs community slack resources
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── API キー ───────────────────────────────────────────
const API_KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('\n❌ エラー: GOOGLE_AI_API_KEY が設定されていません。');
  console.error('\n設定方法:');
  console.error('  Windows CMD: set GOOGLE_AI_API_KEY=AIza...');
  console.error('  Windows PS:  $env:GOOGLE_AI_API_KEY="AIza..."');
  console.error('  Mac/Linux:   export GOOGLE_AI_API_KEY=AIza...\n');
  process.exit(1);
}

// ─── 出力ディレクトリ ───────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'images');
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── コマンドライン引数でフィルタ ───────────────────────
const args = process.argv.slice(2);

// ─── 生成ターゲット定義 ─────────────────────────────────
/**
 * デザインコンセプト: 「クリーン・テックドリブン・近未来プロフェッショナル」
 * - ダークネイビー (#050d18, #0a1628) 背景
 * - シアンブルー (#00A8FF) グロー・アクセント
 * - グリッドオーバーレイ、データビジュアライゼーション
 * - 日本人医療学生の現実感ある描写
 */
const imageTargets = [
  {
    id: 'hero-bg',
    filename: 'hero-bg.jpg',
    description: 'Hero 背景 — 近未来ダークネイビー学習シーン',
    prompt: `
      Cinematic wide-angle photograph for a website hero background.
      A sleek modern study room at night with deep navy blue walls (#050d18).
      Empty desk with a glowing laptop emitting cyan-blue light (#00A8FF).
      Faint blue grid lines overlay the dark floor like a holographic projection.
      Subtle blue radial glow from the center, fading to darkness at edges.
      Medical/PT textbooks stacked neatly on one side.
      No people visible. Abstract, atmospheric, futuristic.
      Shot on Sony A7 IV, 24mm ultra-wide, cinematic dark blue color grading.
      Very dark overall: 80% dark navy, 20% blue glow accents.
      Mood: professional, focused, technological. No text. 16:9 landscape.
    `,
  },
  {
    id: 'community',
    filename: 'feature-community.jpg',
    description: 'Feature — 仲間との繋がり（学習コミュニティ）',
    prompt: `
      Dynamic editorial photograph of 4 young Japanese medical students (20s)
      studying together in a modern minimalist library.
      Clean white and light grey interior with blue accent lighting from screens.
      Students smiling, sharing notes on tablets, genuinely engaged.
      One student pointing at a tablet showing medical diagrams.
      Background: blurred bookshelves, subtle blue-tinted ambient light.
      Photography style: Canon R5, 50mm, natural editorial, slightly desaturated.
      Mood: collaborative, supportive, professional, authentic community.
      No text visible. 16:9 landscape format.
    `,
  },
  {
    id: 'slack',
    filename: 'feature-slack.jpg',
    description: 'Feature — 質問し放題（チャットコミュニティ）',
    prompt: `
      Clean editorial photograph of a Japanese medical student's hand
      holding a smartphone showing a dark-themed chat interface (fictional UI, no logos).
      The phone screen glows with blue-white light.
      Background: blurred modern study desk with medical textbooks and a laptop.
      Soft cyan-blue bokeh lights in the background.
      Premium tech product photography style. Minimalist composition.
      Mood: connected, responsive, real-time, trustworthy.
      No brand logos visible. 16:9 landscape format.
    `,
  },
  {
    id: 'resources',
    filename: 'feature-resources.jpg',
    description: 'Feature — 学習資産（教材・資料）',
    prompt: `
      Clean flat-lay photograph of physical therapy study materials
      arranged on a white or light grey surface.
      Items: open medical textbook with highlighted passages, color-coded notes,
      anatomy diagrams, a tablet showing digital study sheets, a modern pen.
      Subtle cool blue-white light from upper left, casting soft shadows.
      Composition: minimal, organized, professional.
      Photography: Canon R5, overhead shot, studio lighting, clean editorial.
      Mood: organized, high-value, aspirational academic.
      No visible text on materials. 16:9 landscape format.
    `,
  },
  {
    id: 'about',
    filename: 'feature-about.jpg',
    description: 'Feature — 運営者紹介',
    prompt: `
      Professional portrait photograph of a young Japanese physical therapist (male, 20s-30s),
      wearing a clean white or light grey clinical coat.
      Standing in a modern bright clinic or hospital corridor.
      Natural confident smile, approachable and professional expression.
      Background: softly blurred modern medical facility with clean lines.
      Lighting: studio-quality natural light, slightly warm.
      Photography: Sony A7 IV, 85mm, shallow depth of field.
      Mood: trustworthy, professional, competent, approachable. No text. 3:2 portrait or 16:9.
    `,
  },
];

// フィルタ適用（引数あり時）
const targets = args.length > 0
  ? imageTargets.filter(t => args.some(a => t.id.includes(a) || t.filename.includes(a)))
  : imageTargets;

// ─── Imagen 3 高品質生成 ──────────────────────────────────
async function generateWithImagen3(prompt, filename) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: prompt.trim() }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '16:9',
        safetyFilterLevel: 'BLOCK_SOME',
        personGeneration: 'ALLOW_ADULT',
      },
    }),
  });

  if (!res.ok) throw new Error(`Imagen3 API error ${res.status}: ${await res.text()}`);

  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error('Imagen3: 画像データなし');

  const buf = Buffer.from(b64, 'base64');
  const out = join(OUTPUT_DIR, filename);
  writeFileSync(out, buf);
  return out;
}

// ─── Gemini Flash 画像生成（フォールバック）────────────────
async function generateWithGeminiFlash(prompt, filename) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt.trim() }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  });

  if (!res.ok) throw new Error(`Gemini Flash API error ${res.status}: ${await res.text()}`);

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imgPart) throw new Error('Gemini Flash: 画像データなし');

  const buf = Buffer.from(imgPart.inlineData.data, 'base64');
  const out = join(OUTPUT_DIR, filename);
  writeFileSync(out, buf);
  return out;
}

// ─── メイン処理 ───────────────────────────────────────────
async function main() {
  console.log('\n🎨 Flagship — 画像生成スクリプト (Imagen 3 / Gemini Flash)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`出力先: ${OUTPUT_DIR}`);
  console.log(`生成予定: ${targets.length} 枚\n`);

  let success = 0;
  let fail = 0;

  for (const target of targets) {
    console.log(`📸 [${target.id}] ${target.description}`);

    try {
      let path;
      try {
        path = await generateWithImagen3(target.prompt, target.filename);
        console.log(`   ✅ Imagen 3 生成完了 → ${target.filename}`);
      } catch (e1) {
        console.log(`   ⚠️  Imagen 3 失敗 (${e1.message.slice(0, 60)})`);
        console.log(`      → Gemini Flash にフォールバック...`);
        path = await generateWithGeminiFlash(target.prompt, target.filename);
        console.log(`   ✅ Gemini Flash 生成完了 → ${target.filename}`);
      }
      success++;
    } catch (err) {
      console.error(`   ❌ 失敗: ${err.message}`);
      fail++;
    }

    if (targets.indexOf(target) < targets.length - 1) {
      await new Promise(r => setTimeout(r, 2500)); // レート制限対策
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✨ 完了: 成功 ${success} 枚 / 失敗 ${fail} 枚`);
  if (success > 0) {
    console.log(`   public/images/ を確認してください。`);
    console.log(`   npm run dev でプレビュー確認できます。\n`);
  }
}

main().catch(err => {
  console.error('\n❌ 予期しないエラー:', err.message);
  process.exit(1);
});
