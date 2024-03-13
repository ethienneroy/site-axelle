'use strict';

/**
 * reservation router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::reservation.reservation')
//   , {
//   config: {
//     create: {
//       middlewares: ["api::reservation.before-create"],
//       load: {
//         before: ["responseTime", "logger", "cors", "responses", "gzip"],
//         after: ["parser", "router", "getEmail"],
//       },
//     },
//   }
// });
