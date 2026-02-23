'use strict';

chrome.runtime.onInstalled.addListener(() => {
  console.log('FLAGSHIP 学習ツール installed');
});

// Alarm handler (for future background timer support)
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'pomodoro') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'FLAGSHIP タイマー',
      message: 'タイマーが終了しました！お疲れ様でした。',
    });
  }
});
