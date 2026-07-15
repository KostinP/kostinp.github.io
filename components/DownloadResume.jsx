import { getLocale } from "next-intl/server";
import { getProfile } from "@/lib/content";

export const DownloadResume = async ({ focus }) => {
  const locale = await getLocale();
  const { profile } = await getProfile(locale);
  const suffix = focus === "fullstack" ? "" : `-${focus}`;

  return (
    <a
      className="badge-btn"
      href={`/pavel-kostin-cv-${locale}${suffix}.pdf`}
      download
      title={profile.downloadCta}
      aria-label={profile.downloadCta}
    >
      <i className="bx bx-download" />
    </a>
  );
};
