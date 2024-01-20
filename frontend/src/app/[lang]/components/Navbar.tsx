"use client";
import Logo from "./Logo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Dialog} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({url, text}: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({url, text, closeMenu}: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
                                 links,
                                 notificationBanner,
                                 logoUrl,
                                 logoText,
                                 companyPhone,
                                 companyEmail
                               }: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  notificationBanner: any | null;
  companyPhone?: string;
  companyEmail?: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  console.log('links are', links)
  return (
    <div className="header">
      <div className="header-toparea">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-sm-6 col-12">
              {(companyPhone || companyEmail) && <div className="header-topinfo">
                <ul>
                  {companyEmail && <li>Contactez-nous : <a href={`mailto://${companyEmail}`}>{companyEmail}</a></li>}
                  {companyPhone && <li><a href={`tel://${companyPhone}}`}>{companyPhone}</a></li>}
                </ul>
              </div>}
            </div>
            {notificationBanner && notificationBanner.link && <div className="col-md-5 col-sm-6 col-12">
              <div className="header-topbutton">
                <a href={notificationBanner.link.url}
                   className="tm-button tm-button-white">{notificationBanner.link.text}</a>
              </div>
            </div>}
          </div>
        </div>
      </div>

      <div className="header-bottomarea">
        <div className="container">
          <div className="header-bottominner">
            <div className="header-logo">
              <a href="index.html">
                <Logo src={logoUrl}>
                  {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
                </Logo>
              </a>
            </div>
            <nav className="tm-navigation">
              <ul>
                {links && links.length && links.map((link: any): any => {
                  if (link.isList) {
                    return (<li className="tm-navigation-dropdown"><a href="index.html">{link.title}</a>
                      <ul>
                        {link.links && link.links.map((_link: any) =>
                          <li><a href={_link.url}>{_link.text}</a></li>
                        )
                        }
                      </ul>
                    </li>)
                  } else {
                    return <li><a href={link.link.url}>{link.link.text}</a></li>
                  }
                })}
              </ul>
            </nav>
            {/*<div className="header-icons">*/}
            {/*  <ul>*/}
            {/*    <li><a href="cart.html"><i className="zmdi zmdi-shopping-cart"></i></a></li>*/}
            {/*    <li><a href="#" className="header-searchtrigger"><i className="zmdi zmdi-search"></i></a></li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
            <div className="header-searchbox">
              <div className="header-searchinner">
                <form action="#" className="header-searchform">
                  <input type="text" placeholder="Enter search keyword.."/>
                </form>
                <button className="search-close"><i className="zmdi zmdi-close"></i></button>
              </div>
            </div>
          </div>
          <div className="header-mobilemenu clearfix">
            <div className="tm-mobilenav"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
