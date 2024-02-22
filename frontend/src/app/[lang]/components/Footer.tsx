"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import {CgWebsite} from "react-icons/cg";
import {FaDiscord} from "react-icons/fa";
import {AiFillTwitterCircle, AiFillYoutube} from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({url, text}: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({attributes}: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="hover:dark:text-violet-400"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({social}: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite/>;
    case "TWITTER":
      return <AiFillTwitterCircle/>;
    case "YOUTUBE":
      return <AiFillYoutube/>;
    case "DISCORD":
      return <FaDiscord/>;
    default:
      return null;
  }
}

export default function Footer({
                                 logoUrl,
                                 logoText,
                                 menuLinks,
                                 categoryLinks,
                                 legalLinks,
                                 socialLinks,
                                 businessInfos
                               }: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks?: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
  businessInfos: any
}) {

  const socials: any = socialLinks.reduce((a, v) => ({ ...a, [`${v.social}`]: v}), {})

  console.log('socialLinks', socials)

  return (
    <footer className="footer">

      <div className="footer-toparea tm-padding-section">
        <div className="container">
          <div className="row widgets footer-widgets">

            <div className="col-lg-6 col-md-6 col-12">

              <div className="single-widget widget-contact">
                <h5 className="widget-title">Get In Touch</h5>
                <ul>
                  {businessInfos.informations.map(({title, value}: any) => (
                    <li><b>{title} :</b> {value}</li>
                  ))}
                </ul>
                <ul className="widget-contact-social">
                  {socials['TWITTER'] && <li><a href={socials['TWITTER'].url}><i className="zmdi zmdi-twitter"></i></a></li>}
                  {socials['FACEBOOK'] && <li><a href={socials['FACEBOOK'].url}><i className="zmdi zmdi-facebook"></i></a></li>}
                  {socials['PINTEREST'] && <li><a href={socials['PINTEREST'].url}><i className="zmdi zmdi-pinterest"></i></a></li>}
                  {socials['LINKEDIN'] && <li><a href={socials['LINKEDIN'].url}><i className="zmdi zmdi-linkedin"></i></a></li>}
                </ul>
              </div>

            </div>

            <div className="col-lg-4 col-md-6 col-12">

              <div className="single-widget widget-quicklinks">
                <h5 className="widget-title">Services</h5>
                <ul>
                  {menuLinks.map((link) => (
                    <li><a href={link.url}>{link.text}</a></li>
                  ))}
                </ul>
              </div>

            </div>


          </div>
        </div>
      </div>


      <div className="footer-bottomarea">
        <div className="container">
          <p className="footer-copyright">Copyright 2019 by <a href="#">thememarch</a>. All rights
            reserved</p>
        </div>
      </div>


    </footer>
  );
}
