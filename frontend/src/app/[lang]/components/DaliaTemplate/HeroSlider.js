"use client"
import React from 'react';
import HeroSlider, {Nav, Overlay, Slide} from 'hero-slider';
import {getStrapiMedia} from "@/app/[lang]/utils/api-helpers";
import 'hero-slider/dist/index.css';
import Link from "next/link";

const MyHeroSlider = ({data}) => {
    console.log('data is', data)
    if (data && data.Slides) {
      console.log('je passe ici')
      return (
        <div class="heroslider-slider heroslider-animated tm-slider-dots tm-slider-dots-left" data-white-overlay="7">

          <HeroSlider
            height="100vh"
            autoplay
            style={{background: 'white', color: 'black'}}
            controller={{
              initialSlide: 1,
              slidingDuration: 500,
              slidingDelay: 100,
              onSliding: (nextSlide) =>
                console.debug('onSliding(nextSlide): ', nextSlide),
              onBeforeSliding: (previousSlide, nextSlide) =>
                console.debug(
                  'onBeforeSliding(previousSlide, nextSlide): ',
                  previousSlide,
                  nextSlide
                ),
              onAfterSliding: (nextSlide) =>
                console.debug('onAfterSliding(nextSlide): ', nextSlide)
            }}
          >
            {data.Slides.map((slide) => {
              console.log('slide', slide)
              return (
                <Slide
                  background={{
                    backgroundImageSrc: getStrapiMedia(slide.background.data.attributes.url)
                  }}
                >
                  <Overlay>
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-lg-7 col-md-6 col-12 order-2 order-md-1">

                          <div className="heroslider-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.description}</p>
                            {slide.link && <Link className={'tm-button'} href={slide.link.url}>{slide.link.text}</Link>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Overlay>
                </Slide>
              )
            })}

          </HeroSlider>
        </div>
      )

    }
    // return (
    //
    // <div className="heroslider-area" data-bgimage="assets/images/bg/bg-image-1.jpg" data-black-overlay="3">
    //
    //
    // <div className="heroslider-slider heroslider-animated tm-slider-dots tm-slider-dots-left"
    //          data-white-overlay="7">
    //
    //       <div className="heroslider-singleslider d-flex align-items-center">
    //         <div className="container">
    //           <div className="row align-items-center">
    //             <div className="col-lg-7 col-md-6 col-12 order-2 order-md-1">
    //               <div className="heroslider-content">
    //                 <h1>Pain makes People change</h1>
    //                 <p>Massage has a positive effect on
    //                   every
    //                   medical condition we have looked
    //                   at massage is to work and act on the body with pressure.</p>
    //                 <a href="about-us.html" className="tm-button">About
    //                   Us</a>
    //               </div>
    //             </div>
    //             <div className="col-lg-5 col-md-6 col-sm-8 col-12 order-1 order-md-2">
    //               <div className="heroslider-image">
    //                 <svg viewBox="0 0 665 645">
    //                   <defs>
    //                     <pattern id="attachedImage1" height="100%" width="100%"
    //                              patternContentUnits="objectBoundingBox">
    //                       <image xlinkHref="assets/images/heroslider/heroslider-image-1.jpg"
    //                              preserveAspectRatio="none" width="1" height="1"/>
    //                     </pattern>
    //                   </defs>
    //                   <path fill="url(#attachedImage1)"
    //                         d="M277.030,1.101 C452.838,-10.886 534.393,78.587 579.557,198.565 C624.722,318.542 691.616,359.832 645.425,497.920 C599.233,636.008 432.396,654.275 367.205,638.129 C302.015,621.984 234.375,580.155 153.191,548.742 C32.427,502.014 2.584,440.527 0.176,379.950 C-3.230,294.260 41.806,284.689 56.287,190.747 C73.638,78.186 139.502,10.477 277.030,1.101 Z"></path>
    //                 </svg>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //
    //       <div className="heroslider-singleslider d-flex align-items-center">
    //         <div className="container">
    //           <div className="row align-items-center">
    //             <div className="col-lg-5 col-md-6 col-sm-8 col-12">
    //               <div className="heroslider-image heroslider-image-left">
    //                 <svg viewBox="0 0 665 645">
    //                   <defs>
    //                     <pattern id="attachedImage2" height="100%" width="100%"
    //                              patternContentUnits="objectBoundingBox">
    //                       <image xlinkHref="assets/images/heroslider/heroslider-image-2.jpg"
    //                              preserveAspectRatio="none" width="1" height="1"/>
    //                     </pattern>
    //                   </defs>
    //                   <path fill="url(#attachedImage2)"
    //                         d="M277.030,1.101 C452.838,-10.886 534.393,78.587 579.557,198.565 C624.722,318.542 691.616,359.832 645.425,497.920 C599.233,636.008 432.396,654.275 367.205,638.129 C302.015,621.984 234.375,580.155 153.191,548.742 C32.427,502.014 2.584,440.527 0.176,379.950 C-3.230,294.260 41.806,284.689 56.287,190.747 C73.638,78.186 139.502,10.477 277.030,1.101 Z"></path>
    //                 </svg>
    //               </div>
    //             </div>
    //             <div className="col-lg-7 col-md-6 col-12">
    //               <div className="heroslider-content">
    //                 <h1>Pain makes People change</h1>
    //                 <p>Massage has a positive effect on
    //                   every
    //                   medical condition we have looked
    //                   at massage is to work and act on the body with pressure.</p>
    //                 <a href="about-us.html" className="tm-button">About
    //                   Us</a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //
    //       <div className="heroslider-singleslider d-flex align-items-center">
    //         <div className="container">
    //           <div className="row align-items-center">
    //             <div className="col-lg-7 col-md-6 col-12 order-2 order-md-1">
    //               <div className="heroslider-content">
    //                 <h1>Pain makes People change</h1>
    //                 <p>Massage has a positive effect on
    //                   every
    //                   medical condition we have looked
    //                   at massage is to work and act on the body with pressure.</p>
    //                 <a href="about-us.html" className="tm-button">About
    //                   Us</a>
    //               </div>
    //             </div>
    //             <div className="col-lg-5 col-md-6 col-sm-8 col-12 order-1 order-md-2">
    //               <div className="heroslider-image">
    //                 <svg viewBox="0 0 665 645">
    //                   <defs>
    //                     <pattern id="attachedImage3" height="100%" width="100%"
    //                              patternContentUnits="objectBoundingBox">
    //                       <image xlinkHref="assets/images/heroslider/heroslider-image-3.jpg"
    //                              preserveAspectRatio="none" width="1" height="1"/>
    //                     </pattern>
    //                   </defs>
    //                   <path fill="url(#attachedImage3)"
    //                         d="M277.030,1.101 C452.838,-10.886 534.393,78.587 579.557,198.565 C624.722,318.542 691.616,359.832 645.425,497.920 C599.233,636.008 432.396,654.275 367.205,638.129 C302.015,621.984 234.375,580.155 153.191,548.742 C32.427,502.014 2.584,440.527 0.176,379.950 C-3.230,294.260 41.806,284.689 56.287,190.747 C73.638,78.186 139.502,10.477 277.030,1.101 Z"></path>
    //                 </svg>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //
    //     </div>
    //
    //   </div>
    // );
  }
;

export default MyHeroSlider;