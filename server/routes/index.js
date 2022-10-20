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






router.get('/admin', async (req, res, next) => {
    try {
        //admin 페이지 접속 시 현재 모든 keyword 목록 검색
        const allKeywords = await Keyword.findAll({})

        //success log
        res.send(`findAll Success.`)
        console.log(`findAll Success.`)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/create', async (req, res, next) => {
    try {
        //keyword 생성 요청
        //DB에 Keyword push
        await Keyword.create({keywordName: req.body.keywordName, partNumber:req.body.partNumber});

        //success log
        res.send(`(${req.body.keywordName}, ${req.body.partNumber}) creat Success.`)
        console.log(`(${req.body.keywordName}, ${req.body.partNumber}) created`)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/delete', async (req, res, next) => {
    try {
        //keyword 삭제 요청
        //DB에서 해당 keyword만 삭제
        await Keyword.destroy( {where: { id: req.body.id }});

        //success log
        res.send(`${req.body.id} delete Success.`)
        console.log(`${req.body.id} deleted`)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/fix', async (req, res, next) => {
    try {
        //keyword 수정 요청
        // 해당 keywordName 수정
        await Keyword.update( {keywordName: req.body.content},{where: { id: req.body.id }});

        //success log
        res.send(`${req.body.content} fix success.`)
        console.log(`${req.body.content} fix success`)

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/admin/reset', async (req, res, next) => {
    try {
        //keyword reset 요청
        //DB에서 해당 파트의 모든 keyword 삭제
        await Keyword.destroy({where:{partNumber:req.body.partNumber}});

        //success log
        res.send(`${req.body.content} fix Success.`)
        console.log(`${req.body.content} fix Success`)

    } catch (err) {
        console.error(err);
        next(err);
    }
});



module.exports = router;