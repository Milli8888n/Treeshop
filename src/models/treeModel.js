const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    treename: {
        type: String,
        required: [true, 'Please add a tree name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=1000&auto=format&fit=crop'
    }
}, {
    timestamps: true,
    collection: 'TreeCollection'
});

module.exports = mongoose.model('Tree', treeSchema);
