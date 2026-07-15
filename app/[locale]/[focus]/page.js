import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Resume } from "@/components/Resume";
import { FOCUSES, getPitch } from "@/lib/content";

// "fullstack" is served at the plain /[locale]/ root; this route only
// covers the other, more specific focuses.
const ROUTED_FOCUSES = FOCUSES.filter((focus) => focus !== "fullstack");

export function generateStaticParams() {
  return ROUTED_FOCUSES.map((focus) => ({ focus }));
}

export async function generateMetadata({ params }) {
  const { locale, focus } = await params;
  if (!ROUTED_FOCUSES.includes(focus)) notFound();

  const { meta } = await getPitch(locale, focus);
  return { title: meta.title, description: meta.description };
}

export default async function ResumeFocusPage({ params }) {
  const { locale, focus } = await params;
  if (!ROUTED_FOCUSES.includes(focus)) notFound();
  setRequestLocale(locale);

  return <Resume focus={focus} />;
}
