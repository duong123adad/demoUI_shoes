const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Shoe = require('./models/shoe');

const app = express();
const PORT = 3000;

const MONGODB_URI = 'mongodb://127.0.0.1:27017/rn_shoe_store_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB local successfully!'))
    .catch(err => {
        console.error('❌ Could not connect to MongoDB:', err);
        process.exit(1);
    });


app.use(cors());

app.use(express.json());


/**
 * 
 * @param {object} doc - Document từ Mongoose
 */
const formatShoeResponse = (doc) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
};

app.get('/api/shoes', async (req, res) => {
    try {
        const shoes = await Shoe.find({});
        const formattedShoes = shoes.map(formatShoeResponse);
        res.status(200).json(formattedShoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/shoes', async (req, res) => {
    try {
        const newShoe = new Shoe(req.body);
        const savedShoe = await newShoe.save();
        res.status(201).json(formatShoeResponse(savedShoe));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/shoes/:id', async (req, res) => {
    try {
        const updatedShoe = await Shoe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true });

        if (!updatedShoe) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.status(200).json(formatShoeResponse(updatedShoe));

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/shoes/:id', async (req, res) => {
    try {
        const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);

        if (!deletedShoe) {

            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.status(200).json(formatShoeResponse(deletedShoe));

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
    console.log('💡 Remember: Use your computer IP (e.g., 192.168.x.x) in the React Native App to connect.');
});