export default {
  orders: {
    // res.statusCode === 201
    fullDetails: {
      userId: '1',
      orders: [
        {
          name: 'Fried Rice',
          quantity: '5',
          price: '200',
        },
      ],
    },

    orderStatus: {
      status: 'completed',
    },
  },
};
