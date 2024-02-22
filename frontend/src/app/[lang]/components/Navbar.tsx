"use client";
import Logo from "./Logo";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Dialog} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import React, {useCallback, useEffect, useState} from "react";
import {isMobile} from "react-device-detect"
import * as Accordion from '@radix-ui/react-accordion';
// import {AccordionContent} from "@radix-ui/react-accordion";
import classNames from "classnames";
import {ChevronDownIcon} from "@radix-ui/react-icons";



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

function MobileNavLink({url, text, closeMenu, isList, link, title, links}: any) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  if (!isList) {
    return (
      <span className="flex">
        <Link
          href={link.url}
          // onClick={handleClick}
          className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
            path === url && "dark:text-violet-400 dark:border-violet-400"
          }}`}
        >
          {link.text}
        </Link>
      </span>
    );
  } else {
    console.log('link', link)
    // @ts-ignore
    return (
      <Accordion.Root
        className="bg-white border-none"
        type="single"
        // defaultValue="item-1"
        collapsible
        style={{border: 'none!important;'}}
      >
        <Accordion.Item value="item-1">
          <AccordionTrigger><span className={'text-base'}>{title}</span></AccordionTrigger>
          {links.map((_link: any, key: number) => (
            <AccordionContent key={key} style={{padding: '6px'}}>
              <Link href={_link.url}>{_link.text}</Link>
            </AccordionContent>
          ))}
        </Accordion.Item>
      </Accordion.Root>
    )
  }
}

export default function Navbar({
                                 links,
                                 notificationBanner,
                                 logoUrl,
                                 logoText,
                                 companyPhone,
                                 companyEmail,
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
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback(() => {
    const { pageYOffset, scrollY } = window;
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    }
  }, []);

  return (
    <div className={`header ${scrollY > 95 ? "sticky-active" : ''}`}>
      <div className="header-toparea">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-sm-6 col-12">
              {(companyPhone || companyEmail) && <div className="header-topinfo">
                <ul>
                  {companyEmail && <li>Contactez-nous : <Link href={`mailto://${companyEmail}`}>{companyEmail}</Link></li>}
                  {companyPhone && <li><Link href={`tel://${companyPhone}}`}>{companyPhone}</Link></li>}
                </ul>
              </div>}
            </div>
            {notificationBanner && notificationBanner.link && <div className="col-md-5 col-sm-6 col-12">
              <div className="header-topbutton">
                <Link href={notificationBanner.link.url}
                   className="tm-button tm-button-white">{notificationBanner.link.text}</Link>
              </div>
            </div>}
          </div>
        </div>
      </div>

      <div className="header-bottomarea">
        <div className="container">
          <div className="header-bottominner">
            <div className="header-logo">
              <Link href="index.html">
                <Logo src={logoUrl}>
                  {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
                </Logo>
              </Link>
            </div>
            {!isMobile && <nav className="tm-navigation">
              <ul>
                {links && links.length && links.map((link: any): any => {
                  if (link.isList) {
                    return (<li className="tm-navigation-dropdown"><a href="index.html">{link.title}</a>
                      <ul>
                        {link.links && link.links.map((_link: any) =>
                          <li><Link href={_link.url}>{_link.text}</Link></li>
                        )
                        }
                      </ul>
                    </li>)
                  } else {
                    return <li><Link href={link.link.url}>{link.link.text}</Link></li>
                  }
                })}
              </ul>
            </nav>}
            {isMobile && <><Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-40 bg-white bg-opacity-75"/>
              {" "}
              {/* Overlay */}
              <Dialog.Panel
                className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    {/*<span className="sr-only">Strapi</span>*/}
                    {logoUrl && <img className="h-8 w-auto" src={logoUrl} alt=""/>}
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-700">
                    <div className="space-y-2 py-6">
                      {links.map((item) => (
                        <MobileNavLink
                          key={item.id}
                          closeMenu={closeMenu}
                          {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
              <button
                className="lg:hidden border-r-5"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-7 w-7 text-black" aria-hidden="true"/>
              </button>
            </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

// @ts-ignore
const AccordionTrigger: any = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      // className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));
// @ts-ignore
const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));