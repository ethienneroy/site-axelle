import React from 'react';
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";
import { remark } from 'remark';
import html from 'remark-html';
const AboutUs = async ({data}) => {
  const mardownToRender = await remark()
    .use(html)
    .process(data.title);
  const contentHtml = mardownToRender.toString();

  const mardownToRenderDesc = await remark()
    .use(html)
    .process(data.description);
  const descriptionHtml = mardownToRenderDesc.toString();
  return (
    <div className="tm-section about-us-area bg-grey">
      <div className="about-image" style={{backgroundImage: `url(${getStrapiMedia(data.image.data.attributes.formats.medium.url)})` }} data-bgimage={getStrapiMedia(data.image.data.attributes.formats.medium.url)} data-overlay="1">
        <div className="tm-videobutton">
          {/*<a data-fancybox href="https://www.youtube.com/watch?v=Sv511KEiIJQ">*/}
          {/*  <span><i className="flaticon-play-button"></i></span>*/}
          {/*</a>*/}
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-6">
            <div className="about-content tm-padding-section">
              {/*<h2 className={'text-black'}><span className={'text-black'}><span className="color-theme">Positive Effects</span> of</span><br/>*/}
              {/*  Dialia Registered Massage Therapy</h2>*/}
              <div className={"text-black"} dangerouslySetInnerHTML={{__html: contentHtml}}/>

              <div className={"text-black"} dangerouslySetInnerHTML={{__html: descriptionHtml}}/>
              <div className="about-contentbottom">
                <a href={data.link.url} className="tm-button">{data.link.text}</a>
                <a href={`tel:+${data.phone}`} className="tm-callbutton">
                  <span className="tm-callbutton-icon"><i className="zmdi zmdi-phone-in-talk"></i></span>
                  <h3>{data.phone}</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;