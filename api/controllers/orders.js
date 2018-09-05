import OrdersModel from '../model/orders';
// Oder object
const Order = {

  // create orders
  createOrders(req, res) {
    if (!req.body.userId || !req.body.orderId || !req.body.orderName
      || !req.body.quantity || !req.body.price || !req.body.imgUrl) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const order = OrdersModel.createOrders(req.body);
    return res.status(201).send([{ mesage: 'Item added successfully' }, order]);
  },
  // get all available orders

  getAllOrders(req, res) {
    let orderMesage = '';
    const orders = OrdersModel.findAllOrders();
    if (orders.length === 0) {
      orderMesage = 'Order  is empty';
    } else {
      orderMesage = 'successful';
    }
    return res.status(200).send([{ mesage: orderMesage }, orders]);
  },
  // get a partcular order

  getOneOrder(req, res) {
    const order = OrdersModel.findOneOrder(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'order not found' });
    }
    return res.status(200).send([{ mesage: 'Order found successfully' }, order]);
  },

  //  update a particular order
  updateOrder(req, res) {
    const order = OrdersModel.findOneOrder(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'order not found' });
    }
    const updatedOrder = OrdersModel.updateOrders(req.params.id, req.body);
    return res.status(200).send([{ mesage: 'Order updated successfully' }, updatedOrder]);
  },

  // deleta a particular order
  deleteOrder(req, res) {
    const order = OrdersModel.findOneOrder(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'order not found' });
    }
    const ref = OrdersModel.deleteOrders(req.params.id);
    return res.status(204).send([{ mesage: 'Order deleted successfully' }, ref]);
  },
};

export default Order;
