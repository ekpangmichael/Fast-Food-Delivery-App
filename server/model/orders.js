const date = new Date();

function uid() {
  return Math.random().toString(13).replace('0.', '');
}

class FoodItems {
  //  class constructor
  constructor() {
  //  this.foodItems = [];
    this.orders = [];
  }

  //  returns orders object

  createOrders(data) {
    const newOrders = {
      id: uid(),
      userId: data.userId || '',
      orderId: data.orderId || '',
      orderName: data.orderName || '',
      imgUrl: data.imgUrl || '',
      orderStatus: data.orderStatus || 'pending',
      quantity: data.quantity || '',
      price: data.price || '',
      OrderDate: date,
      modifiedDate: date,
    };
    this.orders.push(newOrders);
    return newOrders;
  }

  //  returns a particular oder

  findOneOrder(id) {
    return this.orders.find(order => order.id === id);
  }

  //  returns all orders


  findAllOrders() {
    return this.orders;
  }
  //  Update order

  updateOrders(id, data) {
    const order = this.findOneOrder(id);
    const index = this.orders.indexOf(order);
    this.orders[index].userId = data.userId || order.userId;
    this.orders[index].orderId = data.orderId || order.orderId;
    this.orders[index].orderName = data.orderName || order.orderName;
    this.orders[index].quantity = data.quantity || order.quantity;
    this.orders[index].price = data.price || order.price;
    this.orders[index].modifiedDate = date;
    return this.orders[index];
  }

  // Delete a particular order

  deleteOrders(id) {
    const order = this.findOneOrder(id);
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
    return {};
  }
}

export default new FoodItems();
