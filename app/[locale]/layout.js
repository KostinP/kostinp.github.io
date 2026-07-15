import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { getPitch } from "@/lib/content";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Fallback metadata (the "fullstack" pitch); /[locale]/[focus] overrides
// this with its own generateMetadata for backend/frontend.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const { meta } = await getPitch(locale, "fullstack");

  return {
    title: meta.title,
    description: meta.description,
    icons: { icon: "/favicon.png" },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <SetHtmlLang locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
