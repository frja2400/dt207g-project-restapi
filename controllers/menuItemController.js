const MenuItem = require('../models/MenuItem');

//Hämta alla menyobjekt (publik)
exports.get = async (req, res) => {
    try {
        const items = await MenuItem.find().populate('updatedBy', 'email');
        res.status(200).json(items);
    } catch (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

//Skapa nytt menyobjekt (endast admin)
exports.create = async (req, res) => {
    try {
        const data = { ...req.body, updatedBy: req.user.id };
        const newItem = new MenuItem(data);
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Error creating menu item:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

//Uppdatera menyobjekt (endast admin)
exports.update = async (req, res) => {
    try {
        const updates = { ...req.body, updatedBy: req.user.id };
        const updated = await MenuItem.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updated);
    } catch (err) {
        console.error('Error updating menu item:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

//Ta bort menyobjekt (endast admin)
exports.remove = async (req, res) => {
    try {
        const deleted = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Menu item deleted' });
    } catch (err) {
        console.error('Error deleting menu item:', err);
        res.status(500).json({ error: 'Server error' });
    }
};