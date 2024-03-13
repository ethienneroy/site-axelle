'use client'
import React, {useState} from 'react';
import {format} from "date-fns";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import Show from "@/app/[lang]/components/Show";
import moment from "moment";
import {Checkmark} from 'react-checkmark'
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import Select from "react-select";
import {MuiTelInput} from 'mui-tel-input'


const Appointment = ({data}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    control,
    reset
  } = useForm()
  const watchAllFields = watch()

  const getTimes = (hours) => {
    if (hours.closed) return data.lang.includes('fr') ? 'Fermé' : "Closed"
    return <>{format(new Date(`${format(new Date(), 'yyyy-MM-dd')} ${hours.opening}`), 'hh:mm')} - {format(new Date(`${format(new Date(), 'yyyy-MM-dd')} ${hours.close}`), 'hh:mm')}</>
  }

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [timesAvailable, setTimesAvailable] = useState(null)

  const fetchTimes = async (date, duration) => {
    console.log('fetching', `/api/reservations?date=${moment(selectedDate).format('L')}&length=${duration}`)
    const {slots} = await fetch(`/api/reservations?date=${moment(selectedDate).format('L')}&length=${duration}`).then((res) => res.json())
    console.log('got data for times', slots)
    setTimesAvailable(slots)
  }

  React.useEffect(() => {
    const subscription = watch((value, {name, type}) => {
        console.log(value, value.selectedDate, value.service)
        if (value.selectedDate && value.service) {

          fetchTimes(value.selectedDate, value.service.value.duration)
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const submitForm = (data) => {
    const date = new moment(`${data.selectedDate.format('L')} ${data.time.value}`)
    const end = new moment(date).add('minutes', data.service.value.duration)
    console.log('service is', data.service)
    const payload = {
      "data": {
        start: date,
        end,
        email: data.email,
        name: data.name,
        phone: data.phone,
        message: data.name + ' | ' + data.message,
        service: data.service.label
      }
    }
    fetch('http://localhost:1337/api/reservations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      setFormSubmitted(true)
      reset()
    })
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
                  ))}
                </ul>
              </div>
              <div className="tm-information-contact">
                <h5>{data.contactInfo.title}</h5>
                <ul>
                  {data.contactInfo.informations.map((info) => (
                    <li><b>{info.title} </b>{info.value}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-50">
            <div className="tm-appointment">
              <Show.When isTrue={!formSubmitted}>
                <h2>Make an Appointment</h2>
                <form className="tm-form" onSubmit={handleSubmit(submitForm)}>
                  <div className="tm-form-inner">
                    <div className="tm-form-field tm-form-fieldhalf">
                      <input type="text" {...register('name')} required="required"
                             placeholder="Name*"/>
                    </div>
                    <div className="tm-form-field tm-form-fieldhalf">
                      <input type="email" {...register('email')} required="required"
                             placeholder="Email*"/>
                    </div>
                    <div className="tm-form-field tm-form-fieldhalf">
                      <Controller
                        name="phone"
                        control={control}
                        render={({field}) => <MuiTelInput
                          {...field}
                          forceCallingCode defaultCountry="CA"
                          placeholder="Enter phone number"
                        />
                        }
                      />
                    </div>

                    <div className="tm-form-field tm-form-fieldhalf">
                      <Controller
                        name="service"
                        control={control}
                        render={({field}) => <Select
                          {...field}
                          options={data.services.map((service) => (
                            {value: service, label: `${service.name} - ${service.duration} minutes`}
                          ))
                          }
                        />}
                      />
                    </div>
                    <div className="tm-form-field tm-form-fieldhalf">
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Controller
                          control={control}
                          name='selectedDate'
                          render={({field}) => (
                            <DatePicker
                              onChange={(date) => field.onChange(date)}
                              label={"Choisir une date"}/>
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <Show.When isTrue={!!selectedDate && !!timesAvailable}>
                      <div className="tm-form-field tm-form-fieldhalf">
                        <Controller
                          name="time"
                          control={control}
                          render={({field}) => <Select
                            {...field}
                            options={timesAvailable.map((time) => (
                              {value: time, label: time}
                            ))
                            }
                          />}
                        />

                        {/*<select {...register('time')} name="select-services">*/}
                        {/*  {timesAvailable && timesAvailable.map((time) => (*/}
                        {/*    <option value={time}>{time}</option>*/}
                        {/*  ))}*/}
                        {/*</select>*/}
                      </div>
                    </Show.When>
                    <div className="tm-form-field">
                      <textarea name="message" {...register('message')} cols="30" rows="5"
                                placeholder="Message"></textarea>
                    </div>
                    <div className="tm-form-field">
                      <button type={"submit"} className="tm-button">Submit</button>
                    </div>
                  </div>
                </form>
              </Show.When>
              <Show.When isTrue={formSubmitted}>
                <Checkmark size='128px' style={{marginTop: '25px'}}/>
                <div style={{marginTop: 15}}>
                  <p>Votre demande de rendez-vous a été envoyée, vous recevrez un message de confirmation une fois
                    approuvé.</p>
                </div>
              </Show.When>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};

export default Appointment;