import Link from "next/link";
import Image from 'next/image'
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media: any;
}

function Feature({title, description, showLink, newTab, url, text, media}: Feature) {

  return (
    <div className={'w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white'}>
      <div className="tm-feature text-center wow fadeInUp ">
        <span className={"tm-feature-icon"}>
          <Image src={getStrapiMedia(media.data.attributes.url)}
                 width={50}
                 height={50}
                 alt={media.data.attributes.alternativeText}
          />
        </span>
        <h5 className={"text-black"}>{title}</h5>
        <p className={"text-gray-600"}>{description}</p>
      </div>
    </div>

  );
}


export default function Features({data}: FeaturesProps) {
  return (

    <div className={'bg-white'}>
      <div className={'sm:flex flex-wrap justify-center text-center gap-8 pt-24 pb-40 items-stretch'}>
        {data.feature.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
