// サイト全体の設定
export const siteConfig = {
  name: "PT国試コミュニティ",
  tagline: "一人で悩まない、仲間と一緒に国試を乗り越えよう",
  description: "理学療法士国家試験対策の学習コミュニティ。勉強の型、質問できる環境、学習資産をまとめて提供。月500円で学習を継続可能に。",
  url: "https://flagship-2i0.pages.dev",
  email: "info@pt-community.example.com",

  // 外部リンク
  links: {
    stripeSubscription: "https://buy.stripe.com/placeholder",
    slackJoinGuide: "https://example.com/slack-guide",
    canvaResourceHub: "https://canva.com/placeholder",
    schoolInquiryForm: "https://forms.google.com/placeholder",
  },

  // ソーシャル
  twitterHandle: "@pt_community",

  // 価格
  monthlyPrice: 500,
};

// ナビゲーションリンク
export const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "入会する", href: "/join" },
  { label: "学習資産", href: "/resources" },
  { label: "特商法", href: "/legal/tokusho" },
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
