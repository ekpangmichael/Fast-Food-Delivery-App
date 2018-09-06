'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoodItems = function () {
  //  class constructor
  function FoodItems() {
    _classCallCheck(this, FoodItems);

    //  this.foodItems = [];
    this.orders = [];
  }

  //  returns orders object

  _createClass(FoodItems, [{
    key: 'createOrders',
    value: function createOrders(data) {
      var newOrders = {
        id: _uuid2.default.v4(),
        userId: data.userId || '',
        orderId: data.orderId || '',
        orderName: data.orderName || '',
        imgUrl: data.imgUrl || '',
        orderStatus: data.orderStatus || 'pending',
        quantity: data.quantity || '',
        price: data.price || '',
        OrderDate: _moment2.default.now(),
        modifiedDate: _moment2.default.now()
      };
      this.orders.push(newOrders);
      return newOrders;
    }

    //  returns a particular oder

  }, {
    key: 'findOneOrder',
    value: function findOneOrder(id) {
      return this.orders.find(function (order) {
        return order.id === id;
      });
    }

    //  returns all orders


  }, {
    key: 'findAllOrders',
    value: function findAllOrders() {
      return this.orders;
    }
    //  Update order

  }, {
    key: 'updateOrders',
    value: function updateOrders(id, data) {
      var order = this.findOneOrder(id);
      var index = this.orders.indexOf(order);
      this.orders[index].userId = data.userId || order.userId;
      this.orders[index].orderId = data.orderId || order.orderId;
      this.orders[index].orderName = data.orderName || order.orderName;
      this.orders[index].quantity = data.quantity || order.quantity;
      this.orders[index].price = data.price || order.price;
      this.orders[index].modifiedDate = _moment2.default.now();
      return this.orders[index];
    }

    // Delete a particular order

  }, {
    key: 'deleteOrders',
    value: function deleteOrders(id) {
      var order = this.findOneOrder(id);
      var index = this.orders.indexOf(order);
      this.orders.splice(index, 1);
      return {};
    }
  }]);

  return FoodItems;
}();

exports.default = new FoodItems();