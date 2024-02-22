import React from 'react';
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";
import {remark} from "remark";
import html from "remark-html";
import Link from "next/link";
import Image from "next/image";

const ServicesArea = async ({data}) => {
  const mardownToRender = await remark()
    .use(html)
    .process(data.description);
  const descriptionHtml = mardownToRender.toString();

  return (
    <div className="tm-section services-area tm-padding-section bg-white text-black">
      {/*<span className="bg-shape-left"><Image src={getStrapiMedia(data.)} alt="background shape"/></span>*/}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10 col-12">
            <div className="tm-section-title text-center">
              <h2>{data.title}</h2>
              <p dangerouslySetInnerHTML={{__html: descriptionHtml}}/>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-30-reverse">

          {data.services.map((service) => (

            <div className="col-lg-4 col-md-6 col-12 mt-30">
              <div className="tm-service text-center wow fadeInUp">
                <div className="tm-service-inner">
                                    <span className="tm-service-icon">
                                        <Image src={getStrapiMedia(service.media.data.attributes.url)} width={50} height={50}/>
                                    </span>
                  <h5><Link href={service.url}>{service.text}</Link></h5>
                  <p>{service.description}</p>
                  <Link href={service.url} className="tm-readmore">Read more</Link>
                </div>
              </div>
            </div>
          ))}


          {/*<div className="col-lg-4 col-md-6 col-12 mt-30">*/}
          {/*  <div className="tm-service text-center wow fadeInUp">*/}
          {/*    <div className="tm-service-inner">*/}
          {/*                          <span className="tm-service-icon">*/}
          {/*                              <i className="flaticon-physiotherapy"></i>*/}
          {/*                          </span>*/}
          {/*      <span className="tm-service-backicon">*/}
          {/*                              <i className="flaticon-physiotherapy"></i>*/}
          {/*                          </span>*/}
          {/*      <h5><a href="service-details.html">Home Care Physiotherapy</a></h5>*/}
          {/*      <p>Physiotherapists spend years studying how the body works, how injuries impact*/}
          {/*        performance & how to recover and repair injured tissues.</p>*/}
          {/*      <a href="service-details.html" className="tm-readmore">Read more</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="col-lg-4 col-md-6 col-12 mt-30">*/}
          {/*  <div className="tm-service text-center wow fadeInUp">*/}
          {/*    <div className="tm-service-inner">*/}
          {/*                          <span className="tm-service-icon">*/}
          {/*                              <i className="flaticon-aromatherapy-spa-treatment"></i>*/}
          {/*                          </span>*/}
          {/*      <span className="tm-service-backicon">*/}
          {/*                              <i className="flaticon-aromatherapy-spa-treatment"></i>*/}
          {/*                          </span>*/}
          {/*      <h5><a href="service-details.html">Aroma Therapy</a></h5>*/}
          {/*      <p>Aromatherapy uses plant materials and arom*/}
          {/*        atic plant oils, including essential oils. It can*/}
          {/*        be offered as a complementary therapy.</p>*/}
          {/*      <a href="service-details.html" className="tm-readmore">Read more</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="col-lg-4 col-md-6 col-12 mt-30">*/}
          {/*  <div className="tm-service text-center wow fadeInUp">*/}
          {/*    <div className="tm-service-inner">*/}
          {/*                          <span className="tm-service-icon">*/}
          {/*                              <i className="flaticon-rehabilitation-1"></i>*/}
          {/*                          </span>*/}
          {/*      <span className="tm-service-backicon">*/}
          {/*                              <i className="flaticon-rehabilitation-1"></i>*/}
          {/*                          </span>*/}
          {/*      <h5><a href="service-details.html">Physiotherapy</a></h5>*/}
          {/*      <p>A personal injury from vehicle accident trauma is common many times effects of*/}
          {/*        an vehicle*/}
          {/*        injury are delayed or subtle.</p>*/}
          {/*      <a href="service-details.html" className="tm-readmore">Read more</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="col-lg-4 col-md-6 col-12 mt-30">*/}
          {/*  <div className="tm-service text-center wow fadeInUp">*/}
          {/*    <div className="tm-service-inner">*/}
          {/*                          <span className="tm-service-icon">*/}
          {/*                              <i className="flaticon-spa-1"></i>*/}
          {/*                          </span>*/}
          {/*      <span className="tm-service-backicon">*/}
          {/*                              <i className="flaticon-spa-1"></i>*/}
          {/*                          </span>*/}
          {/*      <h5><a href="service-details.html">Relaxation Massage</a></h5>*/}
          {/*      <p>This type of massage treatment is strictly for the purposes of rest and*/}
          {/*        relaxation. massage*/}
          {/*        technique is not designed for therapy.</p>*/}
          {/*      <a href="service-details.html" className="tm-readmore">Read more</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="col-lg-4 col-md-6 col-12 mt-30">*/}
          {/*  <div className="tm-service text-center wow fadeInUp">*/}
          {/*    <div className="tm-service-inner">*/}
          {/*                          <span className="tm-service-icon">*/}
          {/*                              <i className="flaticon-accident"></i>*/}
          {/*                          </span>*/}
          {/*      <span className="tm-service-backicon">*/}
          {/*                              <i className="flaticon-accident"></i>*/}
          {/*                          </span>*/}
          {/*      <h5><a href="service-details.html">Vehicle Injury Treatment</a></h5>*/}
          {/*      <p>A personal injury from vehicle accident trauma is common many times effects of*/}
          {/*        an vehicle*/}
          {/*        injury are delayed or subtle.</p>*/}
          {/*      <a href="service-details.html" className="tm-readmore">Read more</a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}


        </div>
      </div>
    </div>
  );
};

export default ServicesArea;