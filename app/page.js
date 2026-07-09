"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routing } from "@/src/i18n/routing";

const pickLocale = () => {
  const stored = localStorage.getItem("locale");
  if (routing.locales.includes(stored)) return stored;

  const preferred = navigator.language?.slice(0, 2);
  return routing.locales.includes(preferred) ? preferred : routing.defaultLocale;
};

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${pickLocale()}/`);
  }, [router]);

  return (
    <noscript>
      <meta httpEquiv="refresh" content={`0; url=/${routing.defaultLocale}/`} />
    </noscript>
  );
}
