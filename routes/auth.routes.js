const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/register',[check('email', 'Uncorrect').isEmail(), check('password', 'Некорректный пароль').isLength({min: 6})] ,async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Ошибка'})
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({ email })

        if(candidate){
            res.status(400).json({message: 'This user has been registered'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save();

        res.status(201).json({message: 'Пользователь создан'})

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
});

router.post('/login', [check('email', 'Введите коректный email').normalizeEmail().isEmail(), check('password', 'Введите пароль')] ,async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Ошибка'})
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: 'Error'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Error'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );

        res.json({token, userId: user.id})

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
});

module.exports = router
