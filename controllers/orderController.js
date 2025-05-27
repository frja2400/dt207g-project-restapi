const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

//Skapa en ny order (detta gör besökare)
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    //Hämta menyobjektens pris från databasen
    const menuItemIds = items.map(i => i.menuItem);
    const menuItemsFromDB = await MenuItem.find({ _id: { $in: menuItemIds } });

    //Räkna ut totalpris
    let totalPrice = 0;
    items.forEach(orderItem => {
      const menuItem = menuItemsFromDB.find(m => m._id.equals(orderItem.menuItem));
      if (menuItem) {
        totalPrice += menuItem.price * orderItem.quantity;
      }
    });

    //Skapa order med automatiskt beräknat totalpris
    const newOrder = new Order({
      ...req.body,
      totalPrice
    });

    await newOrder.save();
    res.status(201).json({ message: 'Beställning skapad', order: newOrder });

  } catch (err) {
    console.error('Fel vid skapande av beställning:', err);
    res.status(400).json({ error: 'Felaktiga uppgifter, kontrollera formuläret' });
  }
};

//Hämta alla ordrar (admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.menuItem', 'name price');
        res.status(200).json(orders);
    } catch (err) {
        console.error('Fel vid hämtning av ordrar:', err);
        res.status(500).json({ error: 'Serverfel' });
    }
};

//Hämta en specifik order (admin)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.menuItem', 'name price');
        if (!order) return res.status(404).json({ error: 'Beställning hittades inte' });
        res.status(200).json(order);
    } catch (err) {
        console.error('Fel vid hämtning av order:', err);
        res.status(500).json({ error: 'Serverfel' });
    }
};

//Uppdatera en order (admin)
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOrder) return res.status(404).json({ error: 'Beställning hittades inte' });
        res.status(200).json({ message: 'Order uppdaterad', order: updatedOrder });
    } catch (err) {
        console.error('Fel vid uppdatering av order:', err);
        res.status(400).json({ error: 'Felaktiga uppgifter' });
    }
};

//Radera en order (admin)
exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Order hittades inte' });
        res.status(200).json({ message: 'Order raderad' });
    } catch (err) {
        console.error('Fel vid radering av order:', err);
        res.status(500).json({ error: 'Serverfel' });
    }
};