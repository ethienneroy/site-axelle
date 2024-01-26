import Link from 'next/link'
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";
import {remark} from "remark";
import html from "remark-html";
const CallToAction = async ({data}) => {

  const mardownToRender = await remark()
    .use(html)
    .process(data.text);
  const contentHtml = mardownToRender.toString();

  return (
    <div className="tm-section call-to-action-area tm-padding-section"
         style={{backgroundImage: `url(${getStrapiMedia(data.background.data.attributes.formats.large.url)})`}}
         data-overlay="8">
      <div className="container">
        <div className="tm-cta">
          <div className="tm-cta-content" dangerouslySetInnerHTML={{__html: contentHtml}}/>

          <div className="tm-cta-button">
            <Link href={data.link.url} className={"tm-button tm-button-white"}>{data.link.text}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;