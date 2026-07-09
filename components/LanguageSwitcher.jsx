"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const otherLocale = routing.locales.find((l) => l !== locale);

  return (
    <Link
      className="change-language"
      href={pathname}
      locale={otherLocale}
      id="language-button"
      title={t("switchTo", { lang: t(otherLocale) })}
    >
      {locale.toUpperCase()}
    </Link>
  );
};
