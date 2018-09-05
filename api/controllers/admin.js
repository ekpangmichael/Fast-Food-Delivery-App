import FoodItemsModel from '../model/admin';
// Oder object
const foodItems = {

  // Create Fast Food Items
  createFoodItems(req, res) {
    if (!req.body.foodName || !req.body.category
      || !req.body.quantity || !req.body.price || !req.body.imgUrl) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const foodItem = FoodItemsModel.createFoodItems(req.body);
    return res.status(201).send([{ mesage: 'Item added successfully' }, foodItem]);
  },
  // get all available Food items

  getAllFoodItems(req, res) {
    let itemMesage = '';
    const foodItem = FoodItemsModel.findAllItems();
    if (foodItem.length === 0) {
      itemMesage = 'No Fast Food Item Found';
    } else {
      itemMesage = 'successful';
    }
    return res.status(200).send([{ mesage: itemMesage }, foodItem]);
  },
  // get a particular food item

  getOneItem(req, res) {
    const foodItem = FoodItemsModel.findOneItem(req.params.id);
    if (!foodItem) {
      return res.status(404).send({ message: 'item not found' });
    }
    return res.status(200).send([{ mesage: 'item found successfully' }, foodItem]);
  },

  //  update a particular item
  updateItem(req, res) {
    const foodItem = FoodItemsModel.findOneItem(req.params.id);
    if (!foodItem) {
      return res.status(404).send({ message: 'item not found' });
    }
    const updatedItem = FoodItemsModel.updateItem(req.params.id, req.body);
    return res.status(200).send([{ mesage: 'item updated successfully' }, updatedItem]);
  },

  // deleta a particular item
  deleteItem(req, res) {
    const foodItem = FoodItemsModel.findOneItem(req.params.id);
    if (!foodItem) {
      return res.status(404).send({ message: 'item not found' });
    }
    const ref = FoodItemsModel.deleteItem(req.params.id);
    return res.status(204).send([{ mesage: 'Item deleted successfully' }, ref]);
  },
};

export default foodItems;
