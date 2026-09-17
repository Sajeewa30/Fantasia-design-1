/**
 * Fantasia Group — site content.
 * Copy is taken from the "Fantasia Group Website Copy / Designer Handoff" document.
 * Anything marked PLACEHOLDER must be confirmed by the client before launch.
 */

export const site = {
  name: "Fantasia Group",
  tagline: "The materials behind what the world makes.",
  brandLine:
    "Fantasia Group manufactures and supplies materials used across apparel and plastic production.",
  location: "Sri Lanka",
  established: "PLACEHOLDER", // [REQUEST INFORMATION: Year established]
  email: "hello@fantasia.lk", // PLACEHOLDER — confirmed group email required
  phone: "+94 00 000 0000", // PLACEHOLDER — confirmed group telephone required
  address: "Head office address to be confirmed", // PLACEHOLDER
  year: new Date().getFullYear(),
};

export const nav = [
  { label: "About", href: "/about" },
  { label: "Our Businesses", href: "/businesses" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Materials for apparel and plastic manufacturers",
  headline: "The materials behind what the world makes.",
  body: "From the stretch in clothing to the raw materials used in bags, packaging, and plastic products, Fantasia Group helps manufacturers make what people use every day.",
  primary: { label: "Explore our businesses", href: "/businesses" },
  secondary: { label: "Talk to our team", href: "/contact" },
};

export const intro = {
  headline: "Built on manufacturing. Growing through supply.",
  paragraphs: [
    "Fantasia Group brings together practical material solutions for apparel and plastic manufacturers. We manufacture narrow fabrics and supply yarn, polymers, calcium carbonate, and masterbatch through four focused business areas.",
    "Whether you need a custom elastic for a new garment, yarn for production, polymer for a plastic application, or an additive for colour and performance, our team helps you begin with the right material.",
  ],
};

export type Business = {
  index: string;
  slug: string;
  name: string;
  short: string;
  description: string;
  audience: string;
  materials: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const businesses: Business[] = [
  {
    index: "01",
    slug: "elastics",
    name: "Elastics & Narrow Fabrics",
    short: "Elastics",
    description:
      "Stretch, support, fit, and brand detail for lingerie, underwear, activewear, outerwear, and other apparel.",
    audience: "For apparel teams developing fit, stretch, support, comfort, and branded detailing.",
    materials: ["Knitted", "Woven", "Jacquard", "Covered elastomeric yarn"],
    cta: "Explore elastics",
    href: "/businesses/elastics",
    image: "/images/elastics.jpg",
    imageAlt: "Knitted lace elastic trim coiled on a stone surface",
  },
  {
    index: "02",
    slug: "yarn",
    name: "Yarn",
    short: "Yarn",
    description:
      "Cotton, nylon, polyester, and polyester-cotton yarn supplied by preorder or from available stock.",
    audience: "For textile manufacturers sourcing cotton, nylon, polyester, and blended yarn.",
    materials: ["Cotton", "Nylon", "Polyester", "Polyester-cotton"],
    cta: "Explore yarn",
    href: "/businesses/yarn",
    image: "/images/yarn.jpg",
    imageAlt: "Cotton and polyester yarn cones stacked on a wooden table",
  },
  {
    index: "03",
    slug: "polymer",
    name: "Fantasia Polymer",
    short: "Polymer",
    description:
      "HDPE, LDPE, and PP grades for film, bags, containers, and moulded plastic products.",
    audience: "For plastic manufacturers sourcing HDPE, LDPE, PP, and application-specific grades.",
    materials: ["HDPE", "LDPE", "PP", "Application-specific grades"],
    cta: "Explore polymers",
    href: "/businesses/polymer",
    image: "/images/polymer.jpg",
    imageAlt: "White polymer pellets spilling from a paper scoop",
  },
  {
    index: "04",
    slug: "chemx",
    name: "CHEMX",
    short: "CHEMX",
    description:
      "Calcium carbonate, colour masterbatch, and filler masterbatch for plastic manufacturing.",
    audience: "For plastic manufacturers sourcing calcium carbonate and colour or filler masterbatch.",
    materials: ["Calcium carbonate", "Colour masterbatch", "Filler masterbatch"],
    cta: "Explore CHEMX",
    href: "/businesses/chemx",
    image: "/images/chemx.jpg",
    imageAlt: "Colour masterbatch granules in ceramic bowls beside calcium carbonate powder",
  },
];

export const story = {
  headline: "You may not see our name. You see what our materials help create.",
  body: "A better fit. A stronger bag. A more consistent colour. A product ready for everyday use. Fantasia works behind the finished item, helping manufacturers choose and source the materials that make it possible.",
};

/** Confirmed facts only. Two more facts (year established, employees or countries served) are awaiting the client. */
export const facts = [
  { value: 4, suffix: "", label: "Focused business areas" },
  { value: 1.5, suffix: " MW", label: "Installed solar capacity", decimals: 1 },
  { value: 2, suffix: "", label: "Factories powered by the sun" },
  { value: "BOI", suffix: "", label: "Board of Investment approved facility", isText: true },
];

export const sustainability = {
  headline: "Powering production with the sun.",
  body: "Fantasia has approximately 1.5 MW of installed solar capacity across two factories — a practical step toward cleaner energy and more efficient manufacturing operations.",
  cta: { label: "See our solar story", href: "/sustainability" },
};

export const enquirySteps = [
  "Tell us what you are making.",
  "Share the material, specification, grade, sample, or target performance.",
  "Add the quantity and date you need it.",
  "Our team confirms availability, sourcing route, and next steps.",
];

export const finalCta = {
  headline: "Tell us what you need.",
  body: "Making something? Let us help you find the right material.",
  cta: { label: "Start an enquiry", href: "/contact" },
};

export const materialsTicker = [
  "Knitted elastics",
  "Woven elastics",
  "Jacquard elastics",
  "Covered elastomeric yarn",
  "Cotton yarn",
  "Nylon yarn",
  "Polyester yarn",
  "HDPE",
  "LDPE",
  "PP",
  "Calcium carbonate",
  "Colour masterbatch",
  "Filler masterbatch",
];

export const footer = {
  main: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Businesses", href: "/businesses" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Contact", href: "/contact" },
  ],
  businesses: businesses.map((b) => ({ label: b.name, href: b.href })),
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Notice", href: "/cookies" },
  ],
};
