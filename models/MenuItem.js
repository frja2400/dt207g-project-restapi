const mongoose = require('mongoose');

//MenuItem schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'             //Kopplar till en användare
  }
});

//Exportera modellen
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;