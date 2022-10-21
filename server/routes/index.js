const express = require('express');
const Keyword = require('../models/keyword');
const User = require('../models/user');
const Part = require('../models/part');

const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const isAuth = require('../middleware/jwt')

const router = express.Router();

//================= 사용자 페이지

// root 페이지
// router.post('/', async (req, res, next) => {
//     try {
//         await Part.create({partNumber: req.body.partNumber, part_name:req.body.part_name});
//         res.send("ok")
//
//     } catch (err) {
//
//         console.error(err);
//         next(err);
//     }
// });


router.post('/', async (req, res, next) => {   // 로그인
    try {
        const user = await User.findOne({
            attributes: ['userId'],
            where: { userId: req.body.userId, password: req.body.password},
        });

        if(user != null) {
            const token = createJwtToken(req.body.userId);
            res.status(200).json({ token, result: "로그인 성공" });

        } else { res.send("로그인 실패!"); }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        const [user, created] = await User.findOrCreate({
            attributes: ['userId'],
            where: { userId: req.body.userId },
            defaults: { name: req.body.name, nickName: req.body.nickName,
                password: req.body.password, partNumber: req.body.partNumber}
        });

        if (created) {
            const token = createJwtToken(req.body.userId);
            res.status(201).json({ token, result: "회원가입 성공" });
        } else { res.send("회원가입 실패")};

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/me', isAuth, (req, res) => {  // 토큰 테스트
    res.status(200).json({
        token: req.token, userId: req.userId, result: "토큰 인증 성공!"
    });
});


// main/에서 get keyword 필요한지.

router.post('/main/select', async (req, res, next) => {
    try {
        //select 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/main/drop', async (req, res, next) => {
    try {
        //drop 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});







router.post('/admin/create', async (req, res, next) => {
    try {
        //keyword 생성 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/delete', async (req, res, next) => {
    try {
        //keyword 삭제 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/fix', async (req, res, next) => {
    try {
        //keyword 수정 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/reset', async (req, res, next) => {
    try {
        //keyword reset 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});

function createJwtToken(userId) {
    return jwt.sign({ userId: userId }, config.security.JWT_SECRET,
        { expiresIn: config.security.JWT_EXPIRES_SEC });
}

module.exports = router;