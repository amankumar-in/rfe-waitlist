import type { Metadata } from "next";
import { NavColleges } from "@/components/colleges/nav-colleges";
import { ContactForm } from "@/components/colleges/contact-form";

export const metadata: Metadata = {
  title: "Contact Institutional Partnerships | Rewards For Education",
  description:
    "Request more information or download the CFC College Partnership Offer.",
};

export default async function CollegesContactPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "offer" ? "offer" : "info";

  return (
    <main className="bg-slate-950 text-white antialiased min-h-screen flex flex-col">
      <NavColleges />
      <ContactForm mode={mode} />
    </main>
  );
}
