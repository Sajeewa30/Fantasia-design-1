"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryFormCard, type FormField } from "@/components/EnquiryForm";
import { contactPage } from "@/data/pages";

const fields: FormField[] = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
  { name: "role", label: "Role", type: "text", autoComplete: "organization-title" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "country", label: "Country", type: "text", autoComplete: "country-name" },
  { name: "area", label: "Business area", type: "select", required: true, options: contactPage.areas, span: 2 },
  { name: "productType", label: "Product type", type: "text" },
  { name: "specification", label: "Specification or grade", type: "text" },
  { name: "endUse", label: "End use", type: "text" },
  { name: "process", label: "Production process", type: "text" },
  { name: "quantity", label: "Quantity", type: "text" },
  { name: "requiredDate", label: "Required date", type: "date" },
  { name: "message", label: "Message", type: "textarea", required: true, span: 2 },
  {
    name: "files",
    label: "Upload",
    type: "file",
    hint: "Sample image, drawing, technical data sheet, safety data sheet, or current grade reference. Up to 3 files, 4 MB in total.",
    span: 2,
  },
];

const known = new Set(contactPage.areas.map((a) => a.value));

/** Contact form; `?area=yarn` pre-selects the business area when arriving from a division page. */
export default function ContactForm() {
  const params = useSearchParams();
  const area = params.get("area") ?? "";
  return (
    <EnquiryFormCard
      fields={fields}
      submit={contactPage.form.submit}
      success={contactPage.form.success}
      defaults={known.has(area) ? { area } : {}}
      source="/contact"
    />
  );
}
