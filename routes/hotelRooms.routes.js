const {Router} = require('express')
const router = Router()
const Rooms = require('../models/Rooms');
const auth = require('../middleware/auth.middleware');

router.post('/generate', auth, async (req, res) => {
    try{
        const {roomNumber} = req.body;
        console.log('roomNumber', roomNumber)
        console.log('body', req.body)
        console.log('reservUserId', req.user.userId)
        // const existing = await Rooms.findOne({roomNumber});

        // if (existing){
        //     return res.json({link: existing})
        // }

        const rooms = await Rooms.find({roomNumber: roomNumber})

        await rooms.save()

        res.status(201).json({rooms})

    }catch (e) {
        res.status(500).json({ message: e});
    }
});

router.post('/reservation', auth, async (req, res) => {
    try{
        const {roomNumber, reservation} = req.body;
        const rooms = await Rooms.update({roomNumber: roomNumber}, {roomNumber: roomNumber, reservation : reservation})
        const room = await Rooms.find({})

        res.status(201).json(room)

    }catch (e) {
        res.status(500).json({ message: e});
    }
});

router.get('/', auth, async (req, res) => {
    try{
        const rooms = await Rooms.find({})
        res.json(rooms)
    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try{
        const rooms = await Rooms.findById(req.params.id)
        res.json(rooms)

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})

module.exports = router
