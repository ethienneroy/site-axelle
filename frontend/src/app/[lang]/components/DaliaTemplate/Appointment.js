import React from 'react';
import {format } from "date-fns";

const Appointment = ({data}) => {

  const getTimes = (hours) => {
    if(hours.closed) return data.lang.includes('fr') ? 'Fermé' : "Closed"
    return <>{format(new Date(`${format(new Date(), 'yyyy-MM-dd')} ${hours.opening}`), 'hh:mm')} - {format(new Date(`${format(new Date(), 'yyyy-MM-dd')} ${hours.close}`), 'hh:mm')}</>
  }

  return (
    <div className="tm-section appointment-information-area tm-padding-section bg-white">
      <span className="bg-shape-2"><img src="../../images/icons/bg-shape-3.png" alt="background shape"/></span>
      <div className="container">
        <div className="row mt-50-reverse">
          <div className="col-lg-6 mt-50">
            <div className="tm-information">
              <div className="tm-information-timing">
                <h5>{data.openingHoursTitle}</h5>
                <ul>
                  {data.openingHours.map((hours) => (
                    <li>{hours.day} <span>{getTimes(hours)}</span></li>
                    // const custDt = new Date(`${now} ${custTime}`);
                    // console.log(dateFns.format(custDt, 'h:mm A'));
                  ))}
                  {/*<li>Saturday <span>15:00 - 18:00</span></li>*/}
                  {/*<li>Sunday <span>Closed</span></li>*/}
                </ul>
              </div>
              <div className="tm-information-contact">
                <h5>{data.contactInfo.title}</h5>
                <ul>
                  {data.contactInfo.informations.map((info) => (
                    <li><b>{info.title} </b>{info.value}</li>

                  ))}
                  {/*<li><b>Phone </b>1-800-915-6270</li>*/}
                  {/*<li><b>Email </b>info@example.com <br/>support@dialiarmttherapy.com</li>*/}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-50">
            <div className="tm-appointment">
              <h2>Make an Appointment</h2>
              <form action="#" className="tm-form">
                <div className="tm-form-inner">
                  <div className="tm-form-field tm-form-fieldhalf">
                    <input type="text" required="required" placeholder="Name*"/>
                  </div>
                  <div className="tm-form-field tm-form-fieldhalf">
                    <input type="email" required="required" placeholder="Email*"/>
                  </div>
                  <div className="tm-form-field tm-form-fieldhalf">
                    <select name="select-services">
                      <option value="0">Select Service</option>
                      <option value="a">Reducing or eliminating pain</option>
                      <option value="b">Improving joint mobility</option>
                      <option value="c">Circulatory problems</option>
                      <option value="d">Improving lymphatic drainage</option>
                      <option value="e">Reducing muscular tension</option>
                      <option value="f">Post-surgical rehabilitation</option>
                    </select>
                  </div>
                  <div className="tm-form-field tm-form-fieldhalf">
                    <input type="text" required="required" data-toggle="datepicker" placeholder="Select Date"/>
                  </div>
                  <div className="tm-form-field">
                    <textarea name="message" cols="30" rows="5" placeholder="Message"></textarea>
                  </div>
                  <div className="tm-form-field">
                    <button type="submit" className="tm-button">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;