require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Tree = require('./models/treeModel');
const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Tree.deleteMany({});
        console.log('Existing trees cleared...');

        // Hàng loạt ảnh cây cảnh chất lượng cao từ Unsplash
        const plantImages = [
            'https://images.unsplash.com/photo-1545239351-ef35f43d514b',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
            'https://images.unsplash.com/photo-1463320326301-c445347f619d',
            'https://images.unsplash.com/photo-1463936575829-25148e1db1b8',
            'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d',
            'https://images.unsplash.com/photo-1520412099551-62b6bafdf5bb',
            'https://images.unsplash.com/photo-1525498128493-380d1990a112',
            'https://images.unsplash.com/photo-1512428559087-560fa5ceab42',
            'https://images.unsplash.com/photo-1501004318641-bd308ad4c82b',
            'https://images.unsplash.com/photo-1533038590840-1cde6e668a91'
        ];

        const species = [
            'Monstera Deliciosa', 'Fiddle Leaf Fig', 'Snake Plant', 
            'Peace Lily', 'Pothos', 'Spider Plant', 'Aloe Vera', 
            'Rubber Plant', 'Calathea', 'Bird of Paradise'
        ];

        const trees = [];
        for (let i = 0; i < 10; i++) {
            trees.push({
                treename: species[i] + ' - Collection ' + faker.string.alphanumeric(4).toUpperCase(),
                description: faker.lorem.paragraphs(2),
                // Lấy ảnh từ list cố định kèm theo các thông số Unsplash để ảnh luôn nét
                image: `${plantImages[i]}?q=80&w=1000&auto=format&fit=crop`
            });
        }

        await Tree.insertMany(trees);
        console.log('Database Seeded Successfully with High-Quality Images!');
        process.exit();
    } catch (error) {
        console.error('Error with seeding data:', error);
        process.exit(1);
    }
};

seedData();
