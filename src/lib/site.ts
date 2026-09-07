export const site = {
  name: "Prince Sharma",
  role: "Senior Full Stack Developer | Next.js · WordPress · React Native · 7+ years",
  tagline: "Next.js · WordPress · React Native · 7+ years",
  url: "https://princesharma.dev",
  email: "prncsharma275@gmail.com",
  location: "Siliguri, West Bengal, India",
  availability: "Open to international remote opportunities",
  resume: "/assets/Resume.pdf",
  portrait: "/assets/profile.webp",
  ogImage: "https://princesharma.dev/assets/profile.webp",
  twitterHandle: "@_shprince",
  description:
    "Senior Full Stack Developer with 7+ years building scalable web and mobile applications across React, Next.js, Node.js, AWS and WordPress.",
};

/** `id` maps to an icon in components/SocialIcon.tsx. */
export const socials = [
  { id: "github", label: "GitHub", href: "https://github.com/P-25" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shprince",
  },
  { id: "x", label: "X", href: "https://twitter.com/_shprince" },
  { id: "email", label: "Email", href: "mailto:prncsharma275@gmail.com" },
] as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Games", href: "/games" },
  { label: "Resume", href: "/assets/Resume.pdf", external: true },
];

/** Companies whose teams I've worked with, and where they live. */
const company = {
  khatabook: "https://khatabook.com",
  nurix: "https://www.nurix.ai",
  curefit: "https://www.cult.fit",
};

/* ---------------------------------------------------------------- *
 * Hero — the positioning statement. Bold marks the phrases that
 * should carry the sentence when someone only skims it.
 * ---------------------------------------------------------------- */
export const hero = {
  headline:
    "Full-stack web and mobile app developer, and amateur Game Developer.",
  statement: [
    {
      text: "I direct a team of 8+ developers and stay hands-on in the code. ",
    },
    {
      text: "React, Next.js and React Native on the front, Node.js, PHP and AWS behind it",
      bold: true,
    },
    { text: ". Seven years in, I've shipped " },
    {
      text: "SaaS platforms, headless commerce and cross-platform mobile apps",
      bold: true,
    },
    { text: ", working with the teams at " },
    { text: "Khatabook", bold: true, href: company.khatabook },
    { text: ", " },
    { text: "Nurix/Nuplay", bold: true, href: company.nurix },
    { text: " and " },
    { text: "Curefit", bold: true, href: company.curefit },
    { text: ". Games are the part I build purely for the fun of it." },
  ],
};

/* ---------------------------------------------------------------- *
 * What I do — four capabilities, one sentence each. Kept to an even
 * number so the two-column grid never leaves a gap.
 * ---------------------------------------------------------------- */
export const capabilities = [
  {
    title: "Web Products",
    stack: "React · Next.js · TypeScript",
    body: "SaaS platforms and headless frontends built end to end — from data model and API through to the interface people use every day.",
  },
  {
    title: "Mobile Apps",
    stack: "React Native · iOS · Android",
    body: "Cross-platform apps for startup clients, owned from codebase architecture all the way through to app store deployment.",
  },
  {
    title: "Backend & Cloud",
    stack: "Node.js · AWS · DynamoDB",
    body: "Serverless services on Lambda, API Gateway and SQS that take heavy processing off the main servers and keep it available.",
  },
  {
    title: "WordPress at Scale",
    stack: "WordPress · WooCommerce · PHP",
    body: "Custom plugins, deep WooCommerce work and performance tuning on stores large enough that every query counts.",
  },
];

/* ---------------------------------------------------------------- *
 * Selected work — outcome-first. Every number here comes from real work.
 * ---------------------------------------------------------------- */
export const proof = [
  {
    title: "A SaaS platform for the furnishing industry",
    body: "I built and scaled the platform on Next.js and Node.js, covering the full stack from data modelling and APIs through to the customer-facing product.",
    result: [
      { text: "It now supports " },
      { text: "over 4,000 active users", bold: true },
      { text: " in day-to-day operation." },
    ],
  },
  {
    title: "KYC and Buy Now, Pay Later for a B2B store",
    body: "I implemented custom KYC and BNPL modules against the TWO API, handling user verification and credit checks inside a modern frontend.",
    result: [
      { text: "The work contributed directly to a " },
      { text: "40% increase in GMV", bold: true },
      { text: "." },
    ],
  },
  {
    title: "A two-million-item catalogue, moved to headless",
    body: "Migrating a legacy WordPress store to a Next.js frontend backed by Node.js and AWS Lambda, and replacing default search with Algolia's instant, faceted filtering.",
    result: [
      { text: "Technical operations across " },
      { text: "over 2 million items", bold: true },
      { text: ", with load times and " },
      { text: "Core Web Vitals", bold: true },
      { text: " measurably improved." },
    ],
  },
];

/* ---------------------------------------------------------------- *
 * Track record — two roles, full facts, minimal space.
 * ---------------------------------------------------------------- */
export const experience = [
  {
    company: "Appycodes",
    title: "Lead JavaScript / WordPress Developer",
    period: "2020 — Present",
    note: "Directing a team of 8+ developers across up to four concurrent projects, bridging modern JavaScript applications and traditional CMS work while staying hands-on.",
  },
  {
    company: "Mus Technologies Services",
    title: "Junior Developer",
    period: "2018 — 2020",
    note: "Co-developed a React Native wallet app that registered 1,000+ users in its first week, plus PHP backend services for recharges, bills and ticketing.",
  },
];

/** Teams I have worked with through Appycodes, who owns those relationships. */
export const clients = [
  { name: "Khatabook", href: company.khatabook },
  { name: "Nurix/Nuplay", href: company.nurix },
  { name: "Curefit", href: company.curefit },
];

export const toolkit = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "Express",
  "PHP",
  "AWS Lambda",
  "DynamoDB",
  "MongoDB",
  "MySQL",
  "Terraform",
  "Tailwind",
  "Jest",
  "WordPress",
  "WooCommerce",
];
