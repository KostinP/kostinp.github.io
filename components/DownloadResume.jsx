import { getLocale, getTranslations } from "next-intl/server";

export const DownloadResume = async () => {
  const locale = await getLocale();
  const t = await getTranslations("profile");

  return (
    <a className="download-btn" href={`/pavel-kostin-cv-${locale}.pdf`} download>
      <i className="bx bx-download" /> {t("downloadCta")}
    </a>
  );
};
