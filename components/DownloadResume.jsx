import { getLocale } from "next-intl/server";
import { getResume } from "@/lib/content";

export const DownloadResume = async () => {
  const locale = await getLocale();
  const { profile } = await getResume(locale);

  return (
    <a
      className="badge-btn"
      href={`/pavel-kostin-cv-${locale}.pdf`}
      download
      title={profile.downloadCta}
      aria-label={profile.downloadCta}
    >
      <i className="bx bx-download" />
    </a>
  );
};
