const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIONUM
const client = require('twilio')(accountSid, authToken);
const moment = require('moment')
const fr = require('moment/locale/fr')
moment.locale('fr')
var pdf = require("pdf-creator-node");
var fs = require("fs");
const path = require("path");
// Read HTML Template
const {FormData} = require('formdata-node');
const fetch = require('node-fetch');
const {Blob} = require("buffer");


module.exports = {
  // beforeCreate(params, state) {
  //   // console.log('reservation creation', params, state)
  //
  // },
  // beforeUpdate(event) {
  //
  // },
  afterUpdate(event) {
    if (event.result.finished && !event.result.receipt) {

      // const { Readable } = require("stream");

      const getServiceUpload = (name) => {
        return strapi.plugin("upload").service(name);
      };

      if (event.params.data.finished && !event.params.data.receipt) {

        // TODO generate receipt + invoice and SEND
        console.log('should send the receipt to ', event.params.data.client.email)
        // const file = fs.readFileSync(path.resolve(__dirname, "../receipt.xml"));

        const html = fs.readFileSync(path.resolve(__dirname, "./receipt.html"), "utf8");
        const data = {
          name: event.result.client.firstName + event.result.client.lastName,
          date: moment(event.result.start).format('MM/DD/YYYY'),
          price: 90,
          duration: 90,
          totalTx: 90 * 1.14975,
          receiptNumber: 123
        }

        // const uploadService = strapi.plugins.upload.services.upload;

        const document = {
          html: html,
          data,
          path: path.resolve(__dirname, `../../../../../public//uploads/receipts/${data.name}_${data.receiptNumber}.pdf`),
          type: "",
        };
        pdf
          .create(document, {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
          })
          .then(async (res) => {

            const fileStat = fs.statSync(res.filename);
            const attachment = await strapi.plugins.upload.services.upload.upload({
              data: {
                refId: res.id,
                ref: 'my-collection',
                field: 'attachments',
              },
              files: {
                path: res.filename,
                name: `${data.name}_${data.receiptNumber}.pdf`,
                type: 'application/pdf', // mime type
                size: fileStat.size,
              },
            }).then((r)=> {
              console.log('attachment is', r)
              const a = {
                ...event.result,
                updatedBy: event.result.updatedBy.id,
                receipt: r[0]
              }
              strapi.entityService.update('api::reservation.reservation', event.result.id, {data: a})
            })



            // console.log(res);
            // const formData = new FormData()
            // formData.set("file", new Blob([res]), `${data.name}_${data.receiptNumber}.pdf`);
            // const createdFiles = await strapi.plugins.upload.services.upload.upload({
            //   data: {
            //     fileInfo: {
            //       filename: "Name.pdf",
            //       caption: "Caption",
            //       alternativeText: "Alternative Text",
            //     },
            //   },
            //   files: formData.get('file'),
            // });

            // console.log('created FIles', createdFiles)




            // uploadService.upload({
            //   data: {
            //     path: `receipts/${data.name}`
            //   },
            //   files: [res.path]
            // })
            // const file = new Blob(res);


            // const uploadService = strapi.plugins.upload.services.upload;

            // Transform stream files to buffer
            // const parts = await toArray(document);
            // const buffers = parts.map((part) =>
            //   _.isBuffer(part) ? part : Buffer.from(part)
            // );

            // const buffer = Buffer.concat(buffers);

            // const _data = {
            //   fileInfo: { name: `${data.name}_${data.receiptNumber}` },
            //   // refId,
            //   // ref,
            //   // field,
            // };
            //
            // await uploadService.upload({
            //   data: _data,
            //   files: {
            //     name: `${data.name}_${data.receiptNumber}`,
            //     buffer: true,
            //     path: res,
            //     type: "application/pdf",
            //     size: document.size,
            //   },
            // });

            // const form = new FormData();
            //
            // form.append('files', file, `${data.name}_${data.receiptNumber}`);
            //
            // const response = await fetch('http://localhost:1337/api/upload', {
            //   method: 'post',
            //   body: form,
            // });
            // event.params.data.receipt = file
          })
          .catch((error) => {
            console.error(error);
          });
      }

    }
  },
  afterCreate(event) {
    client.messages
      .create({
        body: `Une demande de rendez-vous a été créée.
          ${event.result.message}
          ${event.result.start} - ${event.result.end}
        `,
        from: twilioNumber,
        to: process.env.MYNUM
      })
      .then(message => console.log(message.sid))

  }
}
