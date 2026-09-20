/**
 * Fantasia Group — inner-page content (About, Our Businesses, Sustainability, Contact, legal).
 * Copy follows the "Fantasia Group Website Copy / Designer Handoff" document.
 * Every `pending` list mirrors a [REQUEST INFORMATION] item in that document and is rendered
 * as a visible "awaiting information" block so the client can see exactly what is still needed.
 */

export const about = {
  eyebrow: "About Fantasia Group",
  headline: "Built from manufacturing. Ready for what comes next.",
  body: "Fantasia Group combines manufacturing experience with a growing network of material supply businesses serving apparel and plastic manufacturers in Sri Lanka and beyond.",
  story: {
    eyebrow: "Our story",
    headline: "Rooted in narrow fabrics. Grown around our customers.",
    paragraphs: [
      "Fantasia's story is rooted in narrow-fabric manufacturing. Through Fantasia Narrow Fabrics, the group manufactures and exports knitted, woven, and jacquard elastics together with covered elastomeric yarn. The facility is approved by the Board of Investment of Sri Lanka and serves both local and international customers.",
      "As customer needs grew, so did the group. Today, Fantasia's business areas also cover cotton and synthetic yarn, polymer raw materials, calcium carbonate, and masterbatch. Each area serves a different part of the production process, but all are connected by one idea: helping manufacturers get the material they need to keep making.",
      "Fantasia continues to invest in its operations, including approximately 1.5 MW of installed solar power across two factories. It is a practical step toward using cleaner energy and building more efficient manufacturing operations.",
    ],
  },
  whatWeDo: {
    eyebrow: "What we do",
    headline: "Four verbs. One supply chain.",
    items: [
      { title: "We manufacture", body: "Elastics, narrow fabrics, and covered elastomeric yarn for apparel applications." },
      { title: "We source", body: "Yarn, polymers, calcium carbonate, and masterbatch based on customer requirements." },
      { title: "We stock", body: "Selected materials are available through a stock-and-sell model, subject to availability." },
      { title: "We supply", body: "Orders are matched to the customer's material, grade, quantity, and delivery requirement." },
    ],
  },
  purpose: {
    eyebrow: "Our purpose",
    statement:
      "To help manufacturers make better products by giving them clear access to dependable materials and practical support.",
  },
  leadershipMessage: {
    eyebrow: "A message from our leadership",
    paragraphs: [
      "From the beginning, our focus has been simple: understand what our customers are trying to make and help them make it well. We have grown by staying close to production, learning from every requirement, and expanding where our customers need us most.",
      "As Fantasia moves forward, we will continue investing in better capability, stronger relationships, and more responsible operations.",
    ],
    pending: ["One short, personal founder story or belief", "Founder or spokesperson name and title"],
  },
  journey: {
    eyebrow: "Our journey",
    headline: "Milestones, in order.",
    /* Year and detail arrive from the client; the shape of the timeline is final. */
    milestones: [
      { label: "Established", pending: "Year established and original purpose" },
      { label: "Narrow fabrics", pending: "Key narrow-fabric manufacturing milestone" },
      { label: "Yarn", pending: "Year and reason the yarn business began" },
      { label: "Fantasia Polymer", pending: "Year Fantasia Polymer launched and first market served" },
      { label: "CHEMX", pending: "Year CHEMX launched and the need it was created to solve" },
      { label: "Solar", pending: "Year the 1.5 MW solar capacity was commissioned" },
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    headline: "The people behind the group.",
    intro: "Meet the people responsible for Fantasia's direction, operations, customers, and future growth.",
    pending: ["Leadership names, titles, portraits, and 35–50 word biographies"],
    placeholders: 3,
  },
  structure: {
    eyebrow: "Group structure",
    headline: "One master brand. Four business areas.",
    body: "Fantasia Group is the public-facing master brand connecting four business areas: Elastics & Narrow Fabrics, Yarn, Fantasia Polymer, and CHEMX. Each area has a distinct product focus while sharing the group's customer-first approach and operational knowledge.",
    pending: ["Exact registered company names, ownership relationship, and which entity invoices each product line"],
  },
};

export const businessesPage = {
  eyebrow: "Our businesses",
  headline: "Four business areas. One practical purpose.",
  body: "Fantasia Group manufactures and supplies materials used across apparel and plastic production. Choose the area that matches what you are making.",
  steps: {
    eyebrow: "How every enquiry works",
    headline: "Four steps from question to material.",
  },
  finalCta: {
    headline: "Not sure which division to choose?",
    body: "Describe the finished product and we will guide you.",
    cta: { label: "Start an enquiry", href: "/contact" },
  },
};

export const sustainabilityPage = {
  eyebrow: "Sustainability",
  headline: "Powering production with the sun.",
  body: "Fantasia has approximately 1.5 MW of installed solar capacity across two factories. By generating renewable electricity on-site, we are reducing our reliance on conventional grid power and taking a practical step toward lower-carbon manufacturing.",
  cta: { label: "See our solar story", href: "#solar-story" },
  facts: [
    { value: "1.5 MW", label: "Installed solar capacity" },
    { value: "2", label: "Factories with solar installations" },
  ],
  story: {
    eyebrow: "Our solar story",
    headline: "Electricity generated where it is used.",
    paragraphs: [
      "Our solar installations support day-to-day factory operations with electricity generated at the point of use. This investment helps lower dependence on conventional electricity and provides a stronger foundation for improving the energy profile of our manufacturing operations over time.",
      "For customers, clear energy data can support supplier evaluation and wider value-chain reporting. Once verified, this page will publish annual generation, the share of facility electricity met by solar, and the method used to calculate avoided emissions.",
    ],
  },
  details: {
    eyebrow: "Solar project details",
    headline: "The numbers, once verified.",
    rows: [
      "Commissioning year",
      "Factory locations",
      "Annual generation (MWh)",
      "Share of electricity demand supplied by solar",
      "Estimated avoided emissions (tCO₂e per year)",
      "Calculation method or emission factor",
      "Installation or verification partner",
    ],
  },
  beyond: {
    eyebrow: "Beyond solar",
    headline: "Solar is our clearest current action.",
    intro: "As verified information becomes available, we will share our wider progress here.",
    pending: [
      "Current or planned energy-efficiency initiatives",
      "Current or planned waste and material-management initiatives",
      "Responsible sourcing and compliance information",
      "Future sustainability targets, including baseline year and deadline",
    ],
  },
  finalCta: {
    headline: "Our sustainability factsheet.",
    body: "Verified figures, calculation methods, and targets in one document. Request it from our team while the published version is being prepared.",
    cta: { label: "Request the factsheet", href: "/contact?area=sustainability" },
    pending: ["Sustainability factsheet file or link"],
  },
};

export const contactPage = {
  eyebrow: "Contact",
  headline: "Tell us what you are making.",
  body: "Choose a business area and share your requirement. If you are not sure which product or grade you need, describe the finished product and our team can direct your enquiry.",
  form: {
    headline: "How can we help?",
    submit: "Send my enquiry",
    success:
      "Thank you. Your enquiry has been sent to the right Fantasia team. We will be in touch after reviewing your requirement.",
    error: "We could not send your enquiry. Please try again or email us at",
  },
  areas: [
    { value: "elastics", label: "Elastics & Narrow Fabrics" },
    { value: "yarn", label: "Yarn" },
    { value: "polymer", label: "Fantasia Polymer" },
    { value: "chemx", label: "CHEMX" },
    { value: "sustainability", label: "Sustainability or corporate" },
    { value: "unsure", label: "Not sure" },
  ],
  details: {
    eyebrow: "Contact details",
    pending: ["Confirmed group email", "Confirmed group telephone number", "Confirmed head-office address", "Business hours", "Map link"],
  },
};

export const legalPages: Record<string, { title: string; description: string; pending: string }> = {
  privacy: {
    title: "Privacy Policy",
    description: "How Fantasia Group collects, uses, and protects the information you share with us.",
    pending: "Approved privacy policy",
  },
  terms: {
    title: "Terms of Use",
    description: "The terms that apply when you use the Fantasia Group website.",
    pending: "Approved terms of use",
  },
  cookies: {
    title: "Cookie Notice",
    description: "Which cookies this website uses and how you can manage them.",
    pending: "Approved cookie notice",
  },
};
