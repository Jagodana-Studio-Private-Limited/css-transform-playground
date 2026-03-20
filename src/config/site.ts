export const siteConfig = {
  name: "CSS Transform Playground",
  title: "CSS Transform Playground - Visual CSS Transform Builder & Preview",
  description: "Interactively build and preview CSS transforms with live visual feedback. Compose translate, rotate, scale, skew, and perspective transforms with generated CSS code.",
  url: "https://css-transform-playground.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "Move3d",
  brandAccentColor: "#6366f1",

  keywords: [
    "css transform",
    "css transform generator",
    "css transform playground",
    "css rotate",
    "css scale",
    "css translate",
    "css skew",
    "css perspective",
    "css 3d transform",
    "transform builder",
    "css transform preview",
    "visual css editor",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#3b82f6",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/Dharmendra_Jago",
    "https://github.com/Jagodana-Studio-Private-Limited",
    "https://www.linkedin.com/company/jagodana-llc",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/css-transform-playground",
    website: "https://jagodana.com",
  },

  footer: {
    about: "CSS Transform Playground is a free visual tool for composing CSS transforms. Build translate, rotate, scale, skew, and perspective transforms interactively with instant preview and copy-ready CSS code.",
    featuresTitle: "Features",
    features: [
      "Live visual preview",
      "All CSS transform functions",
      "3D perspective support",
      "One-click CSS copy",
    ],
  },

  hero: {
    badge: "Free Visual CSS Tool",
    titleLine1: "Build CSS Transforms",
    titleGradient: "Visually",
    subtitle: "Compose translate, rotate, scale, skew, and perspective transforms with interactive sliders and instant live preview. Copy the generated CSS with one click.",
  },

  featureCards: [
    {
      icon: "🎯",
      title: "Interactive Sliders",
      description: "Fine-tune every transform property with intuitive range sliders and numeric inputs.",
    },
    {
      icon: "👁️",
      title: "Live Preview",
      description: "See your transforms applied in real-time on a visual preview box with 3D perspective.",
    },
    {
      icon: "📋",
      title: "Copy & Use",
      description: "Generated CSS code updates instantly. Copy to clipboard with one click and paste into your project.",
    },
  ],

  relatedTools: [
    {
      name: "CSS Animation Generator",
      url: "https://css-animation-generator.tools.jagodana.com",
      icon: "🎬",
      description: "Create CSS keyframe animations visually.",
    },
    {
      name: "CSS Box Shadow Generator",
      url: "https://css-box-shadow-generator.tools.jagodana.com",
      icon: "🔲",
      description: "Design box shadows with a visual editor.",
    },
    {
      name: "Cubic Bezier Editor",
      url: "https://cubic-bezier-editor.tools.jagodana.com",
      icon: "📈",
      description: "Create custom CSS easing functions visually.",
    },
    {
      name: "CSS Filter Playground",
      url: "https://css-filter-playground.tools.jagodana.com",
      icon: "🎨",
      description: "Experiment with CSS filter functions interactively.",
    },
    {
      name: "Clip Path Generator",
      url: "https://clip-path-generator.tools.jagodana.com",
      icon: "✂️",
      description: "Create CSS clip-path shapes visually.",
    },
    {
      name: "Glassmorphism Generator",
      url: "https://glassmorphism-generator.tools.jagodana.com",
      icon: "🪟",
      description: "Generate glassmorphism CSS effects.",
    },
  ],

  howToSteps: [
    { name: "Adjust Transform Values", text: "Use the interactive sliders to set translate, rotate, scale, and skew values for X, Y, and Z axes.", url: "" },
    { name: "Preview in Real-Time", text: "Watch the preview box update instantly as you adjust each transform property. Toggle 3D perspective to see depth effects.", url: "" },
    { name: "Copy the CSS", text: "Click the copy button to copy the generated CSS transform property to your clipboard, ready to paste into your stylesheet.", url: "" },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What CSS transform functions does this tool support?",
      answer: "This tool supports all major CSS transform functions: translateX, translateY, translateZ, rotateX, rotateY, rotateZ, scaleX, scaleY, skewX, skewY, and perspective. You can combine any of these to create complex transforms.",
    },
    {
      question: "Does this tool support 3D transforms?",
      answer: "Yes! You can enable 3D perspective to see depth effects. Adjust translateZ, rotateX, and rotateY to create 3D transform effects with configurable perspective distance.",
    },
    {
      question: "Is my data processed on a server?",
      answer: "No. Everything runs 100% in your browser. No data is sent to any server — it's completely private and works offline.",
    },
    {
      question: "Can I use the generated CSS in production?",
      answer: "Absolutely. The generated CSS uses standard transform properties that work in all modern browsers. Just copy and paste the code into your stylesheet.",
    },
    {
      question: "How do I reset all values?",
      answer: "Click the Reset button to return all transform values to their defaults (no translation, no rotation, scale 1, no skew).",
    },
  ],

  pages: {
    "/": {
      title: "CSS Transform Playground - Visual CSS Transform Builder & Preview",
      description: "Interactively build and preview CSS transforms with live visual feedback. Compose translate, rotate, scale, skew, and perspective transforms with generated CSS code.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
