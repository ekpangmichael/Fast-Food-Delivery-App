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

    this.foodItems = [];
  }

  //  returns orders object

  _createClass(FoodItems, [{
    key: 'createFoodItems',
    value: function createFoodItems(data) {
      var newFoodItems = {
        id: _uuid2.default.v4(),
        foodName: data.foodName || '',
        imgUrl: data.imgUrl || '',
        category: data.category || '',
        quantity: data.quantity || '',
        price: data.price || '',
        OrderDate: _moment2.default.now(),
        modifiedDate: _moment2.default.now()
      };
      this.foodItems.push(newFoodItems);
      return newFoodItems;
    }

    //  returns a particular item

  }, {
    key: 'findOneItem',
    value: function findOneItem(id) {
      return this.foodItems.find(function (item) {
        return item.id === id;
      });
    }

    //  returns all item


  }, {
    key: 'findAllItems',
    value: function findAllItems() {
      return this.foodItems;
    }
    //  Update item

  }, {
    key: 'updateItem',
    value: function updateItem(id, data) {
      var item = this.findOneItem(id);
      var index = this.foodItems.indexOf(item);
      this.foodItems[index].foodName = data.foodName || item.foodName;
      this.foodItems[index].imgUrl = data.imgUrl || item.imgUrl;
      this.foodItems[index].category = data.category || item.category;
      this.foodItems[index].quantity = data.quantity || item.quantity;
      this.foodItems[index].price = data.price || item.price;
      this.foodItems[index].modifiedDate = _moment2.default.now();
      return this.foodItems[index];
    }

    // Delete a particular order

  }, {
    key: 'deleteItem',
    value: function deleteItem(id) {
      var item = this.findOneItem(id);
      var index = this.foodItems.indexOf(item);
      this.foodItems.splice(index, 1);
      return {};
    }
  }]);

  return FoodItems;
}();

exports.default = new FoodItems();