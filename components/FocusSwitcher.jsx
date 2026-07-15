"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";
import { FOCUSES } from "@/lib/focuses";

const hrefFor = (focus) => (focus === "fullstack" ? "/" : `/${focus}`);

export const FocusSwitcher = ({ focus }) => {
  const t = useTranslations("focus");
  const router = useRouter();

  return (
    <select
      className="focus-select"
      value={focus}
      onChange={(event) => router.push(hrefFor(event.target.value))}
      aria-label={t("ariaLabel")}
    >
      {FOCUSES.map((f) => (
        <option key={f} value={f}>
          {t(f)}
        </option>
      ))}
    </select>
  );
};
