'use strict';

// ===== TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    document.getElementById(`tab-${target}`)?.classList.add('is-active');
  });
});

// ===== TIMER =====
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById('timerDisplay');
const label = document.getElementById('timerLabel');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progressBar');

const modeLabels = { 25: '集中モード', 5: '休憩モード', 50: '長期集中モード' };

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateDisplay() {
  display.textContent = formatTime(remainingSeconds);
  const pct = (remainingSeconds / totalSeconds) * 100;
  progressBar.style.width = `${pct}%`;
}

function startTimer() {
  isRunning = true;
  startStopBtn.textContent = '⏸ 一時停止';
  startStopBtn.classList.add('is-running');
  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateDisplay();
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      startStopBtn.textContent = '▶ スタート';
      startStopBtn.classList.remove('is-running');
      display.textContent = '完了！';
      chrome.notifications?.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'FLAGSHIP タイマー',
        message: 'タイマーが終了しました！お疲れ様でした。',
      });
    }
  }, 1000);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  startStopBtn.textContent = '▶ スタート';
  startStopBtn.classList.remove('is-running');
}

startStopBtn?.addEventListener('click', () => {
  if (isRunning) stopTimer();
  else startTimer();
});

resetBtn?.addEventListener('click', () => {
  stopTimer();
  remainingSeconds = totalSeconds;
  updateDisplay();
});

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    stopTimer();
    const min = parseInt(btn.dataset.min, 10);
    totalSeconds = min * 60;
    remainingSeconds = totalSeconds;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    label.textContent = modeLabels[min] || `${min}分モード`;
    updateDisplay();
  });
});

// init
updateDisplay();

// ===== TIPS =====
const tips = [
  { category: '解剖学', text: '関節の構造は「骨・軟骨・滑膜・関節包」の順で覚えると整理しやすい。国試では関節包の構成も問われる！' },
  { category: '運動学', text: 'スクリューホームムーブメント：膝関節の最終伸展時に脛骨が外旋する現象。鍵は大腿骨顆の形状差！' },
  { category: '神経疾患', text: 'UMN障害 vs LMN障害：筋緊張亢進・痙縮はUMN、弛緩・線維束性収縮はLMN。鑑別は国試頻出！' },
  { category: '整形外科', text: 'Trendelenburg sign：中殿筋筋力低下。立位で骨盤が患側と反対側に傾く。Duchenne歩行とセットで覚えよう。' },
  { category: '内部障害', text: '心不全のBNP：100pg/mL以上で心不全を疑う。リハビリ中止基準（20以上増加など）も合わせて確認！' },
  { category: '過去問Tips', text: '国試は過去問の類似問題が約50%。QBを3周する前に新しい問題集に手を出すのは非効率。まず周回を！' },
  { category: '学習法', text: 'エビングハウスの忘却曲線：1日後・1週間後・1ヶ月後の復習が効果的。Slackで仲間と一緒に確認しよう！' },
  { category: '解剖学', text: '腕神経叢：C5〜T1。「ちょっと待て、5本の根が合わさる」で幹・前分枝・後分枝・束・末梢神経を意識！' },
  { category: '生理学', text: 'スターリングの心臓の法則：前負荷↑→心収縮力↑。心不全では代償機序として起動するが限界がある。' },
  { category: '整形外科', text: 'RICE処置：Rest・Ice・Compression・Elevation。急性期の基本。ICEはPOLICEに進化している点も覚えよう！' },
  { category: '国試対策', text: 'まとめノートは自分で作るより、合格者のものを活用して時間を効率化。FLAGSHIPで無料DLできるよ！' },
  { category: '神経疾患', text: 'Wallenberg症候群：PICA閉塞。同側の顔面感覚障害＋対側の体幹・四肢の感覚障害（交差性感覚障害）。' },
];

let currentTipIndex = 0;

function showTip(index) {
  const tip = tips[index % tips.length];
  document.getElementById('tipCategory').textContent = tip.category;
  document.getElementById('tipText').textContent = tip.text;
}

function setTipDate() {
  const now = new Date();
  const d = document.getElementById('tipDate');
  if (d) d.textContent = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 のTips`;
}

setTipDate();

// Load saved tip index from storage
chrome.storage?.local.get(['tipIndex'], result => {
  if (result.tipIndex !== undefined) currentTipIndex = result.tipIndex;
  showTip(currentTipIndex);
}) ?? showTip(currentTipIndex);

document.getElementById('tipNextBtn')?.addEventListener('click', () => {
  currentTipIndex = (currentTipIndex + 1) % tips.length;
  showTip(currentTipIndex);
  chrome.storage?.local.set({ tipIndex: currentTipIndex });
});
