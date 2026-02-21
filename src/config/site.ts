// サイト全体の設定
export const siteConfig = {
  name: "FLAGSHIP",
  tagline: "PT国試対策・無料学習コミュニティ",
  description: "理学療法士国家試験対策の情報サイト。おすすめ教材・学習法・無料Slackコミュニティを提供。合格者運営。",
  url: "https://flagship-2i0.pages.dev",
  email: "info@flagship-pt.jp",

  // 外部リンク（Slackの招待リンクに差し替えてください）
  links: {
    slackJoin: "https://join.slack.com/placeholder",
    canvaResourceHub: "https://canva.com/placeholder",
    schoolInquiryForm: "https://forms.google.com/placeholder",
  },

  // ソーシャル
  twitterHandle: "@flagship_pt",
};

// ナビゲーションリンク
export const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "おすすめ教材", href: "/#books" },
  { label: "学習資産", href: "/resources" },
  { label: "無料コミュニティ", href: "/join" },
  { label: "FAQ", href: "/faq" },
  { label: "運営者紹介", href: "/about" },
];

// フッターリンク
export const footerLinks = {
  main: [
    { label: "入会する", href: "/join" },
    { label: "学習資産", href: "/resources" },
    { label: "学校関係者の方へ", href: "/for-schools" },
    { label: "運営者について", href: "/about" },
    { label: "よくある質問", href: "/faq" },
  ],
  legal: [
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "特定商取引法に基づく表記", href: "/legal/tokusho" },
    { label: "広告について", href: "/policy/affiliate-disclosure" },
  ],
};
