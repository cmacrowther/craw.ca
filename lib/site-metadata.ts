import type { Metadata } from "next";

export const siteUrl = "https://craw.ca";
export const siteName = "Colin Crowther";
export const homepageTitle = "Colin Crowther — Full-Stack Developer & Designer";
export const homepageDescription =
  "Portfolio of Colin Crowther, a full-stack developer in Prince Edward Island building thoughtful web apps, tools, games, and digital experiences.";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  imageAlt = homepageTitle,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: new URL(path, siteUrl).toString(),
      siteName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/og-image.png"],
    },
  };
}
