const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Tree = require('../src/models/treeModel');

describe('TreeShop API & Views', () => {
    
    beforeAll(async () => {
        // Wait for DB connection
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /', () => {
        it('should return 200 and render index page', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('The Collection');
        });
    });

    describe('POST /add', () => {
        it('should add a new tree and redirect to /', async () => {
            const newTree = {
                treename: 'Test Tree',
                description: 'This is a test description.',
                image: 'https://example.com/image.jpg'
            };
            const res = await request(app)
                .post('/add')
                .send(newTree);
            
            expect(res.statusCode).toEqual(302);
            expect(res.headers.location).toEqual('/');
            
            const tree = await Tree.findOne({ treename: 'Test Tree' });
            expect(tree).toBeTruthy();
            expect(tree.description).toBe(newTree.description);
        });

        // EDGE CASE: Missing required field
        it('should return 400 when treename is missing', async () => {
            const res = await request(app)
                .post('/add')
                .send({
                    description: 'No name tree'
                });
            expect(res.statusCode).toEqual(400);
        });

        // EDGE CASE: Empty name
        it('should return 400 when treename is empty string', async () => {
            const res = await request(app)
                .post('/add')
                .send({
                    treename: '',
                    description: 'Empty name tree'
                });
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('POST /reset', () => {
        it('should clear all trees and redirect', async () => {
            const res = await request(app).post('/reset');
            expect(res.statusCode).toEqual(302);
            
            const count = await Tree.countDocuments();
            expect(count).toEqual(0);
        });

        // EDGE CASE: Resetting an already empty database
        it('should still redirect if database is already empty', async () => {
            const res = await request(app).post('/reset');
            expect(res.statusCode).toEqual(302);
            expect(res.headers.location).toEqual('/');
        });
    });

    describe('GET /details/:id', () => {
        it('should return 200 and render details page for valid ID', async () => {
            const tree = await Tree.create({
                treename: 'Detail Test',
                description: 'Testing details page'
            });
            const res = await request(app).get(`/details/${tree._id}`);
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Botanical Description');
            expect(res.text).toContain('Detail Test');
        });

        it('should return 404 for non-existent ID', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/details/${fakeId}`);
            expect(res.statusCode).toEqual(404);
        });
    });

    describe('GET /about', () => {
        it('should return 200 and render about page', async () => {
            const res = await request(app).get('/about');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toContain('Our Story');
        });
    });
});
