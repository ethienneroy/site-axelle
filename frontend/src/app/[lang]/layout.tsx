import type {Metadata} from "next";
import "./globals.css";
import "./styles/style.css"
import "./styles/_mixins.css"
import "./styles/_variables.css"
import "./styles/bootstrap.min.css"
import "./styles/custom.css"
import "./styles/plugins.css"
import "./styles/style.css"
import "./styles/elements/_breadcrumb.css"
import {getStrapiMedia, getStrapiURL} from "./utils/api-helpers";
import {fetchAPI} from "./utils/fetch-api";

import {i18n} from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";
import Head from "next/head";
import Script from "next/script";


async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = {headers: {Authorization: `Bearer ${token}`}};
  console.log('current lang is', lang)

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links.links",
      "navbar.links.link",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
      "businessInformations",
      "businessInformations.title",
      "businessInformations.informations",
      "SocialLinks",
      "SocialLinks.links",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({params}: { params: { lang: string } }): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const {metadata, favicon} = meta.data.attributes;
  const {url} = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
                                           children,
                                           params,
                                         }: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) {
    return (<html lang={params.lang}>
    <body><h1>Here i am</h1>
    </body>
    </html>)
  }

  const {notificationBanner, navbar, footer, businessInformations, SocialLinks: socialLinks} = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang={params.lang}>
    <body>
    <div id={"wrapper"} className="wrapper">
      <Navbar
        links={navbar.links}
        notificationBanner={notificationBanner}
        logoUrl={navbarLogoUrl}
        logoText={navbar.navbarLogo.logoText}
        companyPhone={global.data.attributes.CompanyPhone}
        companyEmail={global.data.attributes.CompanyEmail}
      />

      <main className="min-h-screen">
        {children}
      </main>

      {/*<Banner data={notificationBanner}/>*/}

      <Footer
        logoUrl={footerLogoUrl}
        logoText={footer.footerLogo.logoText}
        menuLinks={footer.menuLinks}
        // categoryLinks={footer.categories.data}
        legalLinks={footer.legalLinks}
        socialLinks={socialLinks}
        businessInfos={businessInformations}
      />
    </div>
    </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({lang: locale}));
}
