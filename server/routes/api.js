const express = require('express');
const router = express.Router();
const {db, Hotel, Place, Activity, Restaurant} = require('../models')

module.exports = router;

router.get('/', (req, res, next) => {
    const hotel = Hotel.findAll({ include: [{all: true}] });
    const activity = Activity.findAll({ include: [{all: true}] });
    const restaurant = Restaurant.findAll({ include: [{all: true}] });

    Promise.all([hotel, restaurant, activity])
        .then( (values) => {
            res.json(values);
        })
        .catch(next);
});

router.get('/hotel/:name', (req, res, next) => {
    Hotel.findOne({
        where: {
            name: req.params.name
        },
        include: [{all: true}]
    })
        .then( (values) => {
            res.json(values);
        })
        .catch(next);
});

router.get('/restaurant/:name', (req, res, next) => {
    Restaurant.findOne({
        where: {
            name: req.params.name
        },
        include: [{all: true}]
    })
        .then( (values) => {
            res.json(values);
        })
        .catch(next);
});

router.get('/activity/:name', (req, res, next) => {
    Activity.findOne({
        where: {
            name: req.params.name
        },
        include: [{all: true}]
    })
        .then( (values) => {
            res.json(values);
        })
        .catch(next);
});