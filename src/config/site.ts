// サイト全体の設定
export const siteConfig = {
  siteName: "PT国試コミュニティ",
  siteDescription: "理学療法士国家試験対策の学習コミュニティ。勉強の型、質問できる環境、学習資産をまとめて提供。",
  siteUrl: "https://pt-community.example.com",
  
  // 外部リンク（後から差し替え可能）
  STRIPE_SUBSCRIPTION_URL: "https://buy.stripe.com/placeholder",
  SLACK_JOIN_GUIDE_URL: "https://example.com/slack-guide",
  CANVA_RESOURCE_HUB_URL: "https://canva.com/placeholder",
  SCHOOL_INQUIRY_FORM_URL: "https://forms.google.com/placeholder",
  CONTACT_EMAIL: "info@pt-community.example.com",
  
  // ソーシャル
  twitterHandle: "@pt_community",
  
  // 価格
  monthlyPrice: 500,
};

// ナビゲーションリンク
export const navLinks = [
  { label: "メッセージ", href: "/#message" },
  { label: "3つの特徴", href: "/#features" },
  { label: "数字で見る", href: "/#numbers" },
  { label: "受け取れるもの", href: "/#benefits" },
  { label: "運営者", href: "/#about-us" },
  { label: "参加者の声", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

// フッターリンク
export const footerLinks = {
  main: [
    { label: "入会する", href: "/join" },
    { label: "学習資産", href: "/resources" },
    { label: "教材・サービス", href: "/materials" },
    { label: "学校関係者の方へ", href: "/for-schools" },
    { label: "運営者について", href: "/about" },
    { label: "よくある質問", href: "/faq" },
  ],
  legal: [
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "広告について", href: "/policy/affiliate-disclosure" },
  ],
};
