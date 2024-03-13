'use strict';
const moment = require('moment')
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const {Blob} = require("buffer");

/**
 * reservation controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reservation.reservation', ({strapi}) => ({
  async create(ctx) {
    const {email} = ctx.request.body.data
    const client = await strapi.db.query('api::client.client').findOne({
      where: {email}
    });

    console.log('found client', client)
    if (!!client) {
      // ctx.request.body.data.client = client
      ctx.request.body = {
        data: {
          ...ctx.request.body.data,
          client: client.id
        },
      };
      const reservation = await strapi.entityService.create('api::reservation.reservation', ctx.request.body)
      console.log('je passe par icittteeeee',ctx.request.body)
      return reservation
    }
  },
  async findAvailabilities(ctx) {
    // your custom logic for modifying the input
    // ctx.query = {...ctx.query, locale: "en"}; // force ctx.query.locale to 'en' regardless of what was requested
    const {start, end} = ctx.query
    // Call the default parent controller action
    // const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const startDate = new moment(start).utcOffset(0);
    const endDate = new moment(end).add(1, 'day').utcOffset(0);
    const {results} = await strapi
      .service("api::reservation.reservation")
      .find({start: {$gte: startDate}, end: {$lt: endDate}, pagination: { limit: 1 }});


    console.log('date requested', results)
    // your custom logic for modifying the output
    // result.meta.date = Date.now(); // change the date that is returned

    return results;
  },
  // async update(ctx) {
  //   const event = {}
  //   console.log('je passe par ici', ctx)
  //   if (event.params.data.finished && !event.params.data.receipt) {
  //
  //     // TODO generate receipt + invoice and SEND
  //     console.log('should send the receipt to ', event.params.data.client.email)
  //     // const file = fs.readFileSync(path.resolve(__dirname, "../receipt.xml"));
  //
  //     const html = fs.readFileSync(path.resolve(__dirname, "./receipt.html"), "utf8");
  //     const data = {
  //       name: event.params.data.client.firstName + event.params.data.client.lastName,
  //       date: moment(event.params.data.start).format('MM/DD/YYYY'),
  //       price: 90,
  //       duration: 90,
  //       totalTx: 90 * 1.14975,
  //       receiptNumber: 123
  //     }
  //
  //     // const uploadService = strapi.plugins.upload.services.upload;
  //
  //     const document = {
  //       html: html,
  //       data,
  //       path: path.resolve(__dirname, `../../../../../public//uploads/receipts/${data.name}_${data.receiptNumber}.pdf`),
  //       type: "buffer",
  //     };
  //     pdf
  //       .create(document, {
  //         format: "A3",
  //         orientation: "portrait",
  //         border: "10mm"
  //       })
  //       .then(async (res) => {
  //         console.log(res);
  //         // uploadService.upload({
  //         //   data: {
  //         //     path: `receipts/${data.name}`
  //         //   },
  //         //   files: [res.path]
  //         // })
  //         const file = new Blob(res);
  //         // const form = new FormData();
  //         //
  //         // form.append('files', file, `${data.name}_${data.receiptNumber}`);
  //         //
  //         // const response = await fetch('http://localhost:1337/api/upload', {
  //         //   method: 'post',
  //         //   body: form,
  //         // });
  //         event.params.data.receipt = file
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  //   await super.update(ctx)
  // }
}));
