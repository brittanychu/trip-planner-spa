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

router.get('/:type/:name', (req, res, next) => {
    let Model;
    if (req.params.type === 'hotels') Model = Hotel;
    else if (req.params.type === 'restaurants') Model = Restaurant;
    else Model = Activity;

    Model.findOne({
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

// router.get('/restaurants/:name', (req, res, next) => {
//     Restaurant.findOne({
//         where: {
//             name: req.params.name
//         },
//         include: [{all: true}]
//     })
//         .then( (values) => {
//             res.json(values);
//         })
//         .catch(next);
// });

// router.get('/activities/:name', (req, res, next) => {
//     Activity.findOne({
//         where: {
//             name: req.params.name
//         },
//         include: [{all: true}]
//     })
//         .then( (values) => {
//             res.json(values);
//         })
//         .catch(next);
// });