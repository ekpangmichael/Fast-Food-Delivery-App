'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _admin = require('../model/admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Oder object
var foodItems = {

  // Create Fast Food Items
  createFoodItems: function createFoodItems(req, res) {
    if (!req.body.foodName || !req.body.category || !req.body.quantity || !req.body.price || !req.body.imgUrl) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    var foodItem = _admin2.default.createFoodItems(req.body);
    return res.status(201).send([{ message: 'Item added successfully' }, { foodItems: foodItem }]);
  },

  // get all available Food items

  getAllFoodItems: function getAllFoodItems(req, res) {
    var itemMesage = '';
    var foodItem = _admin2.default.findAllItems();
    if (foodItem.length === 0) {
      itemMesage = 'No Fast Food Item Found';
    } else {
      itemMesage = 'successful';
    }
    return res.status(200).send([{ message: itemMesage }, { foodItems: foodItem }]);
  },

  // get a particular food item

  getOneItem: function getOneItem(req, res) {
    var foodItem = _admin2.default.findOneItem(req.params.id);
    if (!foodItem) {
      return res.status(404).send({ message: 'item not found' });
    }
    return res.status(200).send([{ message: 'item found successfully' }, foodItem]);
  },


  //  update a particular item
  updateItem: function updateItem(req, res) {
    var foodItem = _admin2.default.findOneItem(req.params.id);
    if (!foodItem) {
      return res.status(404).send({ message: 'item not found' });
    }
    var updatedItem = _admin2.default.updateItem(req.params.id, req.body);
    return res.status(200).send([{ message: 'item updated successfully' }, updatedItem]);
  },


  // deleta a particular item
  deleteItem: function deleteItem(req, res) {
    var foodItem = _admin2.default.findOneItem(req.params.id);
    if (!foodItem) {
      return res.status(404).send({ message: 'item not found' });
    }
    var ref = _admin2.default.deleteItem(req.params.id);
    return res.status(204).send([{ message: 'Item deleted successfully' }, ref]);
  }
};

exports.default = foodItems;