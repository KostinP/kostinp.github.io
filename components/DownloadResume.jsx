import { getLocale, getTranslations } from "next-intl/server";

export const DownloadResume = async () => {
  const locale = await getLocale();
  const t = await getTranslations("profile");

  return (
    <a
      className="badge-btn"
      href={`/pavel-kostin-cv-${locale}.pdf`}
      download
      title={t("downloadCta")}
      aria-label={t("downloadCta")}
    >
      <i className="bx bx-download" />
    </a>
  );
};
