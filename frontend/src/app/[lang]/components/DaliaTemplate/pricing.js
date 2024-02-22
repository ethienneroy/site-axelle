'use client';
import React from 'react';
import {getStrapiMedia} from "../../utils/api-helpers";
import {remark} from "remark";
import html from "remark-html";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PricingDalia = async ({data}) => {

  const mardownToRender = await remark()
    .use(html)
    .process(data.title);
  const contentHtml = mardownToRender.toString();

  const mardownToRenderDesc = await remark()
    .use(html)
    .process(data.description);
  const descriptionHtml = mardownToRenderDesc.toString();

  const mardownToRenderRightDesc = await remark()
    .use(html)
    .process(data.rightDescription);
  const rightDescriptionHtml = mardownToRenderRightDesc.toString();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
  };

  const addClass = (e) => {
    e.target.classList.add("active");
  }
  const removeClass = (e) => {
    e.target.classList.remove("active");
  }
  return (
    <div className="bg-white h-50">
      <div className="tm-section pricing-benifits-area bg-grey tm-padding-section text-black-50"
           style={{
             background: `url(${getStrapiMedia(data.image.data.attributes.url)})`,
             backgroundRepeat: 'no-repeat',
             backgroundSize: 'cover',
             backgroundPosition: 'calc(50vw - 15px) 50%'
           }}
           data-white-overlay="6">
        <div className="container ">
          <div className="row">
            <div className="col-lg-6">
              <div className="tm-pricing-left">
                {/*<h2><span><span className="color-theme">Benefits</span> of</span><br/>*/}
                {/*  Registered Massage Therapy</h2>*/}
                <div dangerouslySetInnerHTML={{__html: contentHtml}}/>
                <div dangerouslySetInnerHTML={{__html: descriptionHtml}}/>
                {/*<p>There are remarkable benefits to be achieved through regular massage*/}
                {/*  therapy treatments from a R*/}
                {/*  egistered Massage Therapist. Massage therapy*/}
                {/*  can be an important part of your health maintenance plan.</p>*/}

                <ul className="nav" id="bstab1" role="tablist">
                  {data.product_features.data.map((feature) => (
                    <li className="nav-item">
                      <a className="nav-link " onMouseOver={addClass} onMouseLeave={removeClass} id="bstab1-area1-tab" data-toggle="tab" href="#bstab1-area1"
                         role="tab" aria-controls="bstab1-area1" aria-selected="false">{feature.attributes.name}</a>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
            <div className="col-lg-6">
              <div className="tm-pricing-right">
                {/*<h2>Therapy <span className="color-theme">Rates</span></h2>*/}
                {/*<p>New and returning clients are encouraged to book a massage appointment*/}
                {/*  online by clicking the book an appointment button</p>*/}
                <div dangerouslySetInnerHTML={{__html: rightDescriptionHtml}}/>

                <div className="tab-content" id="bstab1-ontent">
                  <div className="tab-pane fade show active" id="bstab1-area1" role="tabpanel"
                       aria-labelledby="bstab1-area1-tab">
                    {/*<div dangerouslySetInnerHTML={{__html: rightDescriptionHtml}}/>*/}
                    {/*<div className="tm-pricing-priceboxes tm-slider-dots tm-slider-dots-vertical">*/}
                    <Slider {...settings}>
                      {data.prices.map((price) => (
                        <div className="tm-pricing-pricebox">
                          <h2>{price.name.split(' ')[0]}<span>{price.name.split(' ')[1]}</span></h2>
                          <h3>${price.price}$</h3>
                        </div>
                      ))}

                    </Slider>
                  </div>
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDalia;