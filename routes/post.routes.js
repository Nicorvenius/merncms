const {Router} = require('express')
const router = Router()
const Posts = require('../models/Posts');
const auth = require('../middleware/auth.middleware');

router.post('/create', auth, async (req, res) => {
    try{
        const post = new Posts(req.body);

        await post.save()

        res.status(201).json({post})

    }catch (e) {
        res.status(400).json({ message: e.message});
    }
});

router.delete('/remove/:id', auth, async (req, res) => {
    try{

        const {user_id} = req.body;
        //Check user post
        const post = await Posts.findById(req.params.id)

        if (post.userId.toString() === req.user.userId){
            //remove
            console.log('remove');
            const remove = await Posts.findOneAndRemove(req.params.id)
            await remove.save()
        }else{
            res.status(500).json({ message: 'You are not owner this post'});
        }
    }catch (e) {
        res.status(400).json({ message: e});
    }
});

router.get('/', auth, async (req, res) => {
    try{
        const post = await Posts.find()
            .populate({path: 'catId', select:'name -_id'})
            .populate({path: 'userId', select:'email -_id'});
        res.json(post)
    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id).populate({path: 'catId'})
            .populate({path: 'userId', select:'email -_id'});
        res.json(post)

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})
router.get('/user/:id', auth, async (req, res) => {
    try{
        console.log(req.params.id)
        const post = await Posts.find({userId: req.params.id}).populate({path: 'catId'})
            .populate({path: 'userId', select:'email -_id'});
        res.json(post)

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})
router.put('/edit/:id', auth, async (req, res) => {
    try{
        const post = await Posts.findById(req.params.id)
        if (post.userId.toString() === req.user.userId){
            const update = await post.overwrite({ title: req.body.title, content: req.body.content, catId: req.body.catId, userId: req.body.userId, Date: post.Date });
            await update.save()
            res.status(201).json({success: 'success'})
        }else{
            res.status(500).json({ message: 'You are not owner this post'});
        }
    }catch (e) {
        res.status(500).json({ message: e});
    }
});

module.exports = router
