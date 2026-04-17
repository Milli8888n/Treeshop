const express = require('express');
const router = express.Router();
const Tree = require('../models/treeModel');

// @desc    Show all trees
// @route   GET /
router.get('/', async (req, res) => {
    try {
        const trees = await Tree.find().sort({ createdAt: -1 });
        res.render('index', { trees });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @desc    Show single tree details
// @route   GET /details/:id
router.get('/details/:id', async (req, res) => {
    try {
        const tree = await Tree.findById(req.params.id);
        if (!tree) {
            return res.status(404).send('Tree not found');
        }
        res.render('details', { tree });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @desc    Show add tree form
// @route   GET /add
router.get('/add', (req, res) => {
    res.render('add');
});

// @desc    Add new tree
// @route   POST /add
router.post('/add', async (req, res) => {
    try {
        const { treename, description, image } = req.body;
        
        // Handle empty image by using default
        const treeData = {
            treename,
            description
        };
        if (image && image.trim() !== '') {
            treeData.image = image;
        }

        await Tree.create(treeData);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).send('Invalid Data');
    }
});

// @desc    Show about page
// @route   GET /about
router.get('/about', (req, res) => {
    res.render('about');
});

// @desc    Reset all data
// @route   POST /reset
router.post('/reset', async (req, res) => {
    try {
        await Tree.deleteMany({});
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
