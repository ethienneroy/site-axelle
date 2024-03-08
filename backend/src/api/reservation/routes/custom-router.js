module.exports = {
  routes: [
    {
      method: "GET",
      path: "/available-slots",
      handler: "reservation.findAvailabilities",
    },
  ],
};
