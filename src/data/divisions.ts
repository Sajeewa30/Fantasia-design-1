/**
 * Fantasia Group — the four business-area pages.
 * Copy follows the "Fantasia Group Website Copy / Designer Handoff" document.
 * `pending` lists mirror the document's [REQUEST INFORMATION] items.
 */

import type { FormField } from "@/components/EnquiryForm";

export type RangeItem = { title: string; body: string; image?: string; imageAlt?: string };

export type DivisionSection =
  | { type: "list"; eyebrow: string; headline: string; items: string[]; pending?: string[] }
  | { type: "cards"; eyebrow: string; headline: string; items: { title: string; body: string }[] }
  | { type: "steps"; eyebrow: string; headline: string; items: string[] }
  | { type: "statement"; eyebrow: string; headline: string; body: string }
  | { type: "note"; eyebrow: string; headline: string; body: string };

export type Division = {
  slug: string;
  index: string;
  name: string;
  short: string;
  metaDescription: string;
  hero: {
    headline: string;
    paragraphs: string[];
    primary: { label: string; href: string };
    secondary?: { label: string; href: string; pending?: string };
    image: string;
    imageAlt: string;
  };
  range: { eyebrow: string; headline: string; items: RangeItem[]; pending?: string[] };
  sections: DivisionSection[];
  specs: { eyebrow: string; headline: string; confirmed?: { label: string; value: string }[]; pending: string[] };
  form: {
    headline: string;
    intro?: string;
    fields: FormField[];
    submit: string;
    success: string;
  };
  finalCta: { headline: string; body: string; cta: { label: string; href: string } };
};

const contactBasics: FormField[] = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
];

const upload: FormField = {
  name: "files",
  label: "Upload",
  type: "file",
  hint: "Drawing, reference image, specification sheet, or sample photo. Up to 3 files, 4 MB in total.",
  span: 2,
};

export const divisions: Division[] = [
  {
    slug: "elastics",
    index: "01",
    name: "Elastics & Narrow Fabrics",
    short: "Elastics",
    metaDescription:
      "Fantasia Narrow Fabrics manufactures and exports knitted, woven, and jacquard elastics and covered elastomeric yarn for apparel.",
    hero: {
      headline: "Where fit begins.",
      paragraphs: [
        "Fantasia Narrow Fabrics manufactures and exports knitted, woven, and jacquard elastics together with covered elastomeric yarn for apparel applications.",
        "From a lightweight insert hidden inside a garment to a branded waistband designed to be seen, we help product teams develop the stretch, feel, look, and support their design needs.",
      ],
      primary: { label: "Develop an elastic", href: "#enquiry-form" },
      secondary: { label: "View the e-catalogue", href: "/contact?area=elastics", pending: "E-catalogue link" },
      image: "/images/hero-elastics.jpg",
      imageAlt: "Rolls of knitted and woven elastic tape in rose, charcoal, and cream",
    },
    range: {
      eyebrow: "Product range",
      headline: "Four constructions. One development conversation.",
      items: [
        {
          title: "Knitted elastics",
          body: "Light, flexible elastics commonly used in lingerie, intimate wear, sleepwear, and lighter garments. Available in plain, picot, and decorative constructions, subject to the confirmed range.",
          image: "/images/elastics.jpg",
          imageAlt: "Knitted lace elastic trim coiled on a stone surface",
        },
        {
          title: "Woven elastics",
          body: "Firmer, more structured elastics for waistbands, outerwear, heavier fabrics, and applications that need stronger support.",
          image: "/images/woven-elastic.jpg",
          imageAlt: "Firm woven elastic waistband tape with a ribbed texture",
        },
        {
          title: "Jacquard elastics",
          body: "Logos, names, marks, and patterns woven directly into the elastic for visible waistbands, straps, and branded garment details.",
          image: "/images/jacquard-elastic.jpg",
          imageAlt: "Jacquard elastic with a geometric pattern woven in magenta on cream",
        },
        {
          title: "Covered elastomeric yarn",
          body: "An elastic core covered with yarn, used as a stretch component where controlled elasticity and recovery are required.",
          image: "/images/covered-yarn.jpg",
          imageAlt: "Covered elastomeric yarn wound on white cones",
        },
      ],
    },
    sections: [
      {
        type: "list",
        eyebrow: "Applications",
        headline: "Wherever a garment needs to stretch, hold, or show a name.",
        items: [
          "Lingerie and intimate wear",
          "Underwear and waistbands",
          "Sleepwear and nightwear",
          "Activewear and swimwear",
          "Outerwear, casualwear, and heavier fabrics",
        ],
        pending: ["Other confirmed applications"],
      },
      {
        type: "statement",
        eyebrow: "Why buyers come to Fantasia",
        headline: "An elastic is not chosen by appearance alone.",
        body: "Width, composition, stretch, recovery, softness, colour, finish, and end use all matter. Share your design or reference sample and our team can begin the development conversation.",
      },
    ],
    specs: {
      eyebrow: "Capabilities and specifications",
      headline: "What we can confirm today.",
      confirmed: [{ label: "Construction", value: "Knitted, woven, jacquard, and covered elastomeric yarn" }],
      pending: [
        "Confirmed width range by product",
        "Confirmed fibre and elastomer options",
        "Stretch and recovery measures or development range",
        "Colour matching, dyeing, finishing, and approval process",
        "Sampling process and design support",
        "Minimum order quantity by product",
        "Sample and bulk lead times",
        "Monthly production capacity",
        "Certifications and test standards",
      ],
    },
    form: {
      headline: "Tell us what the garment needs to do.",
      fields: [
        ...contactBasics,
        {
          name: "productType",
          label: "Product type",
          type: "select",
          required: true,
          options: ["Knitted", "Woven", "Jacquard", "Covered elastomeric yarn", "Not sure"],
        },
        { name: "endUse", label: "End use and garment type", type: "text", required: true },
        { name: "width", label: "Width", type: "text", placeholder: "e.g. 32 mm" },
        { name: "composition", label: "Composition", type: "text" },
        { name: "colour", label: "Colour", type: "text" },
        { name: "stretch", label: "Stretch requirement", type: "text" },
        { name: "quantity", label: "Estimated quantity", type: "text" },
        { name: "requiredDate", label: "Required date", type: "date" },
        upload,
      ],
      submit: "Send my requirement",
      success:
        "Thank you. Your requirement is with our narrow-fabrics team. We will contact you after reviewing the details.",
    },
    finalCta: {
      headline: "Develop your elastic.",
      body: "Have a design, sample, or specification? Send it to our team.",
      cta: { label: "Start a development enquiry", href: "#enquiry-form" },
    },
  },
  {
    slug: "yarn",
    index: "02",
    name: "Yarn",
    short: "Yarn",
    metaDescription:
      "Fantasia supplies cotton, nylon, polyester, and polyester-cotton yarn to textile manufacturers from stock or on preorder.",
    hero: {
      headline: "Every fabric starts with a thread.",
      paragraphs: [
        "Fantasia supplies cotton, nylon, polyester, and polyester-cotton yarn to textile manufacturers. Orders can be fulfilled through available stock or sourced on a preorder basis, depending on the required type, specification, volume, and delivery date.",
      ],
      primary: { label: "Find the right yarn", href: "#enquiry-form" },
      image: "/images/yarn-range.jpg",
      imageAlt: "Four yarn cones side by side: cotton, nylon, polyester, and a polyester-cotton blend",
    },
    range: {
      eyebrow: "Yarn range",
      headline: "Natural, synthetic, and blended.",
      items: [
        {
          title: "Cotton yarn",
          body: "A natural-fibre option widely used where softness, comfort, and absorbency are important, including apparel and home-textile applications.",
        },
        {
          title: "Nylon yarn",
          body: "A strong synthetic option valued for durability and abrasion resistance in apparel, hosiery, sportswear, and selected technical applications.",
        },
        {
          title: "Polyester yarn",
          body: "A versatile synthetic option known for durability, shape retention, and quick drying across apparel, home textiles, and other fabric applications.",
        },
        {
          title: "Polyester-cotton yarn",
          body: "A blend designed to balance cotton comfort with polyester durability, depending on the blend ratio and construction.",
        },
      ],
    },
    sections: [
      {
        type: "cards",
        eyebrow: "How we supply",
        headline: "From stock, or sourced to order.",
        items: [
          { title: "Available stock", body: "Selected yarn is offered from current stock, subject to availability and specification." },
          { title: "Preorder supply", body: "Yarn is sourced against an agreed type, count, composition, quantity, and required date." },
        ],
      },
    ],
    specs: {
      eyebrow: "Product information",
      headline: "Specifications by yarn type.",
      pending: [
        "Yarn counts, ply, composition, colour, twist, package format, origin, minimum quantity, certifications, current stock status, and lead time by yarn type",
      ],
    },
    form: {
      headline: "Ask about yarn.",
      intro:
        "Tell us the yarn type, count or specification, composition, colour, quantity, intended application, and required date. If you are unsure, tell us what you plan to make.",
      fields: [
        ...contactBasics,
        { name: "requirement", label: "Your yarn requirement", type: "textarea", required: true, span: 2 },
        { name: "requiredDate", label: "Required date", type: "date" },
        upload,
      ],
      submit: "Ask about yarn",
      success:
        "Thank you. Your enquiry has been sent to the right Fantasia team. We will be in touch after reviewing your requirement.",
    },
    finalCta: {
      headline: "Looking for a particular yarn?",
      body: "Share your yarn requirement and preferred delivery date.",
      cta: { label: "Send a yarn enquiry", href: "#enquiry-form" },
    },
  },
  {
    slug: "polymer",
    index: "03",
    name: "Fantasia Polymer",
    short: "Polymer",
    metaDescription:
      "Fantasia Polymer supplies HDPE, LDPE, PP, and application-specific grades to plastic manufacturers in Sri Lanka.",
    hero: {
      headline: "The raw material behind everyday plastic products.",
      paragraphs: [
        "Fantasia Polymer supplies plastic raw materials to manufacturers in Sri Lanka, including producers of grocery bags, garbage bags, packaging, containers, and other plastic products.",
        "Materials are supplied from available stock or sourced on a preorder basis. Our team begins with the application and processing method so the requested grade can be checked against the customer's requirement.",
      ],
      primary: { label: "Source a polymer", href: "#enquiry-form" },
      image: "/images/film-extrusion.jpg",
      imageAlt: "A blown-film extrusion line with a translucent polyethylene film bubble",
    },
    range: {
      eyebrow: "Material range",
      headline: "Polyethylene, polypropylene, and grades to match the process.",
      items: [
        {
          title: "HDPE",
          body: "A strong and versatile polyethylene used across flexible and rigid packaging, bottles, containers, pipes, and durable plastic products, depending on grade.",
        },
        {
          title: "LDPE",
          body: "A flexible polyethylene commonly used for films, liners, bags, and other products that need softness and flexibility, depending on grade.",
        },
        {
          title: "PP",
          body: "A widely used polymer for packaging, containers, household products, fibres, and moulded components, depending on grade and process.",
        },
        {
          title: "Application-specific grades",
          body: "Grades suited to blow moulding or injection moulding can be sourced based on the product, process, and required performance.",
        },
      ],
    },
    sections: [
      {
        type: "steps",
        eyebrow: "How to request the right grade",
        headline: "Start with the product and the process.",
        items: [
          "Tell us what you are manufacturing.",
          "Share the polymer type or current grade, if known.",
          "State the process: film extrusion, blow moulding, injection moulding, or another confirmed process.",
          "Add colour, performance needs, quantity, and required date.",
          "Upload a technical data sheet or current material reference where possible.",
        ],
      },
    ],
    specs: {
      eyebrow: "Product information",
      headline: "Grades and documents.",
      pending: [
        "Exact grades, manufacturer or origin, packaging, minimum order quantity, stock availability, lead time, technical data sheets, safety data sheets, and certificates",
      ],
    },
    form: {
      headline: "Request a polymer grade.",
      intro: "Tell us the product and process. We will take it from there.",
      fields: [
        ...contactBasics,
        {
          name: "process",
          label: "Production process",
          type: "select",
          options: ["Film extrusion", "Blow moulding", "Injection moulding", "Other or not sure"],
        },
        { name: "grade", label: "Polymer type or current grade", type: "text" },
        { name: "requirement", label: "Product, colour, performance needs, and quantity", type: "textarea", required: true, span: 2 },
        { name: "requiredDate", label: "Required date", type: "date" },
        { ...upload, hint: "Technical data sheet or current material reference. Up to 3 files, 4 MB in total." },
      ],
      submit: "Send a polymer enquiry",
      success:
        "Thank you. Your enquiry has been sent to the right Fantasia team. We will be in touch after reviewing your requirement.",
    },
    finalCta: {
      headline: "Request a polymer grade.",
      body: "Tell us the product and process. We will take it from there.",
      cta: { label: "Send a polymer enquiry", href: "#enquiry-form" },
    },
  },
  {
    slug: "chemx",
    index: "04",
    name: "CHEMX",
    short: "CHEMX",
    metaDescription:
      "CHEMX supplies calcium carbonate, colour masterbatch, and filler masterbatch to plastic manufacturers in Sri Lanka.",
    hero: {
      headline: "Small additions. A big role in the final product.",
      paragraphs: [
        "CHEMX supplies calcium carbonate and masterbatch to plastic manufacturers in Sri Lanka, including grocery-bag and garbage-bag producers.",
        "Products are supplied from available stock or sourced on a preorder basis. Selection should always begin with the base polymer, production process, finished product, and required result.",
      ],
      primary: { label: "Ask CHEMX", href: "#enquiry-form" },
      image: "/images/calcium-carbonate.jpg",
      imageAlt: "Calcium carbonate powder in a dish beside white filler and magenta colour masterbatch pellets",
    },
    range: {
      eyebrow: "Product range",
      headline: "Mineral, colour, and filler.",
      items: [
        {
          title: "Calcium carbonate",
          body: "A mineral used in selected plastic formulations. The right grade and loading depend on the base polymer, process, and required product properties.",
        },
        {
          title: "Colour masterbatch",
          body: "A concentrated colour system added during plastic processing to produce a chosen shade consistently in the finished product.",
        },
        {
          title: "Filler masterbatch",
          body: "A prepared blend commonly used to introduce mineral filler into plastics. Suitability depends on the application, processing conditions, and target performance.",
        },
      ],
      pending: ["Additional CHEMX product categories, if any"],
    },
    sections: [
      {
        type: "note",
        eyebrow: "Safety and suitability",
        headline: "Check the documents before use.",
        body: "Product selection and dosage should follow the relevant technical data, safety information, processing conditions, and supplier guidance. Ask the CHEMX team for the correct documents before use.",
      },
    ],
    specs: {
      eyebrow: "Technical information",
      headline: "Grades, dosage, and documents.",
      pending: [
        "Available grades, base or carrier resin, colour references, calcium-carbonate content, particle size where relevant, recommended addition rate, melt-flow information, compatibility, packaging, origin, minimum order, lead time, technical data sheets, safety data sheets, and certificates",
      ],
    },
    form: {
      headline: "Send a CHEMX enquiry.",
      intro: "Share your base polymer, process, finished product, and target result.",
      fields: [
        ...contactBasics,
        { name: "basePolymer", label: "Base polymer", type: "text", placeholder: "e.g. HDPE, LDPE, PP" },
        {
          name: "process",
          label: "Production process",
          type: "select",
          options: ["Film extrusion", "Blow moulding", "Injection moulding", "Other or not sure"],
        },
        { name: "requirement", label: "Finished product and target result", type: "textarea", required: true, span: 2 },
        { name: "requiredDate", label: "Required date", type: "date" },
        { ...upload, hint: "Technical data sheet, safety data sheet, or current grade reference. Up to 3 files, 4 MB in total." },
      ],
      submit: "Ask CHEMX",
      success:
        "Thank you. Your enquiry has been sent to the right Fantasia team. We will be in touch after reviewing your requirement.",
    },
    finalCta: {
      headline: "Send a CHEMX enquiry.",
      body: "Share your base polymer, process, finished product, and target result.",
      cta: { label: "Ask CHEMX", href: "#enquiry-form" },
    },
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
