const mongoose = require('mongoose');

//Order schema
const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  items: [{         //Listar beställda maträtter från MenuItem och anger antal.
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['bekräftad', 'förbereds', 'levererad', 'avbeställd'],
    default: 'bekräftad'
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Exportera modellen
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;