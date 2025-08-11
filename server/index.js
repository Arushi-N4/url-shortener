const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ShortUrl = require('./models/shortUrl');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/urlshortener')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err.message));

app.post('/api/shorten', async (req, res) => {
    try {
        const { original_url } = req.body;
        try {
            new URL(original_url);
        } catch {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        const shortUrl = await ShortUrl.create({ original_url });
        res.json(shortUrl);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrl = await ShortUrl.findOneAndUpdate(
            { short_url: req.params.shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );
        if (!shortUrl) return res.status(404).json({ error: 'URL not found' });
        res.redirect(shortUrl.original_url);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/urls', async (req, res) => {
    try {
        const urls = await ShortUrl.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));