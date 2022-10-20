const express = require('express');
const Keyword = require('../models/keyword');
const User = require('../models/user');
const Part = require('../models/part');


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


router.post('/', async (req, res, next) => {
    try {
        //로그인 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    try {
        //회원가입 요청
    } catch (err) {
        console.error(err);
        next(err);
    }
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



module.exports = router;