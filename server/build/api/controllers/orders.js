'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orders = require('../model/orders');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Oder object
var Order = {

  // create orders
  createOrders: function createOrders(req, res) {
    if (!req.body.userId || !req.body.orderId || !req.body.orderName || !req.body.quantity || !req.body.price || !req.body.imgUrl) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    var order = _orders2.default.createOrders(req.body);
    return res.status(201).send([{ message: 'Item added successfully' }, { orders: order }]);
  },

  // get all available orders

  getAllOrders: function getAllOrders(req, res) {
    var orderMesage = '';
    var order = _orders2.default.findAllOrders();
    if (order.length === 0) {
      orderMesage = 'Order  is empty';
    } else {
      orderMesage = 'successful';
    }
    return res.status(200).send([{ message: orderMesage }, { orders: order }]);
  },

  // get a partcular order

  getOneOrder: function getOneOrder(req, res) {
    var order = _orders2.default.findOneOrder(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    return res.status(200).send([{ message: 'Order found successfully' }, { orders: order }]);
  },


  //  update a particular order
  updateOrder: function updateOrder(req, res) {
    var order = _orders2.default.findOneOrder(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    var updatedOrder = _orders2.default.updateOrders(req.params.id, req.body);
    return res.status(200).send([{ message: 'Order updated successfully' }, updatedOrder]);
  },


  // deleta a particular order
  deleteOrder: function deleteOrder(req, res) {
    var order = _orders2.default.findOneOrder(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    var ref = _orders2.default.deleteOrders(req.params.id);
    return res.status(204).send([{ mesage: 'Order deleted successfully' }, ref]);
  }
};

exports.default = Order;