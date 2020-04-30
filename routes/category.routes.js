const {Router} = require('express')
const router = Router()
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');

router.post('/create', auth, async (req, res) => {
    try{
        const {name} = req.body;
        console.log('body', req.body)

        const category = new Category({name})

        await category.save()

        res.status(201).json({category})

    }catch (e) {
        res.status(500).json({ message: e});
    }
});

router.get('/', auth, async (req, res) => {
    try{
        const category = await Category.find({})
        res.json(category)
    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})

// router.post('/reservation', auth, async (req, res) => {
//     try{
//         const {roomNumber, reservation} = req.body;
//         const rooms = await Rooms.update({roomNumber: roomNumber}, {roomNumber: roomNumber, reservation : reservation})
//         const room = await Rooms.find({})
//
//         res.status(201).json(room)
//
//     }catch (e) {
//         res.status(500).json({ message: e});
//     }
// });

//
// router.get('/:id', auth, async (req, res) => {
//     try{
//         const post = await Posts.findById(req.params.id)
//         res.json(post)
//
//     }catch (e) {
//         res.status(500).json({ message: "Error"})
//     }
// })
// router.post('/edit/:id', auth, async (req, res) => {
//     try{
//         const {cat_id, content} = req.body;
//         console.log('body', req.body)
//         console.log('reservUserId', req.user.userId)
//         // const existing = await Rooms.findOne({roomNumber});
//
//         // if (existing){
//         //     return res.json({link: existing})
//         // }
//
//         const post = new Posts({cat_id, content, userId: req.user.userId)
//
//         await post.save()
//
//         res.status(201).json({post})
//
//     }catch (e) {
//         res.status(500).json({ message: e});
//     }
// });

module.exports = router
