import { setRequestLocale } from "next-intl/server";
import { Resume } from "@/components/Resume";

export default async function ResumePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Resume focus="fullstack" />;
}
