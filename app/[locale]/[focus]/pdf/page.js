import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Resume } from "@/components/Resume";
import { FOCUSES } from "@/lib/content";

const ROUTED_FOCUSES = FOCUSES.filter((focus) => focus !== "fullstack");

export function generateStaticParams() {
  return ROUTED_FOCUSES.map((focus) => ({ focus }));
}

export default async function ResumeFocusPdfPage({ params }) {
  const { locale, focus } = await params;
  if (!ROUTED_FOCUSES.includes(focus)) notFound();
  setRequestLocale(locale);

  return <Resume focus={focus} interactive={false} />;
}