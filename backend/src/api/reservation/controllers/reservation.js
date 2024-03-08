'use strict';
const moment = require('moment')

/**
 * reservation controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::reservation.reservation', ({strapi}) => ({
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
}));
