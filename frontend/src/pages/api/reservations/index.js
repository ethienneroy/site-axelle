import {fetchAPI} from "../../../app/[lang]/utils/fetch-api";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const {date: queryDate, length} = req.query
    console.log('req', req.query)
    const date = new moment(queryDate)
    console.log('QUERYING DATE', queryDate)
    const {data: reservations} = await fetchAPI(`/reservations?filters[start][$gte]=${date.format('YYYY-MM-DD')}&filters[start][$lt]=${date.add(1, 'day').format('YYYY-MM-DD')}`)

    const dayStart = new moment(queryDate + ' 09:00')
    const dayEnd = new moment(queryDate + ' 17:00')


    let newAppointmentStart = new moment(dayStart)
    const newAppointmentEnd = new moment(newAppointmentStart).add(length, 'minutes')
    const slots = []

    while (newAppointmentEnd.isSameOrBefore(dayEnd)) {
      if (reservations.every((reservation) => {
        const existingStart = new moment(reservation.attributes.start).subtract(30, 'minutes')
        const existingEnd = new moment(reservation.attributes.end).add(30, 'minutes')

        return !newAppointmentStart.isBetween(existingStart, existingEnd) && !newAppointmentEnd.isBetween(existingStart, existingEnd)
      })) {
        slots.push(newAppointmentStart.format('HH:mm'))
      }

      newAppointmentStart.add(30, 'minutes')
      newAppointmentEnd.add(30, 'minutes')
    }

    res.send({slots})
  }

}