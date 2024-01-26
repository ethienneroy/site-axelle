import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import HeroSlider from "../components/DaliaTemplate/HeroSlider";
import ServicesArea from "@/app/[lang]/components/DaliaTemplate/ServicesArea";
import CallToAction from "@/app/[lang]/components/DaliaTemplate/CallToAction";
import AboutUs from "@/app/[lang]/components/DaliaTemplate/AboutUs";

export function sectionRenderer(section: any, index: number) {
  console.log('section is', section.__component, section)
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.hero-slide":
      return <HeroSlider key={index} data={section} />
    case "sections.services-area":
      return <ServicesArea key={index} data={section} />
    case "sections.call-to-action":
      return <CallToAction key={index} data={section} />
    case "sections.about-us":
      return <AboutUs key={index} data={section} />
    default:
      return null;
  }
}
