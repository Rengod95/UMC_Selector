const express = require('express');
const Keyword = require('../models/keyword');

const router = express.Router();


//================= 사용자 페이지

// root 페이지
router.get('/', async (req, res, next) => {
    try {
        const keywords = await Keyword.findAll();
        res.render('main', { keywords, title: "UMC 키워드 선택"});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/*
    사용자가 키워드를 선택할 때의 동작
 */

// 각 키워드를 선택하는 페이지
router.get('/select/:id', async (req, res, next) => {
    try {
        const keywords = await Keyword.findAll();
        res.render('select', { keywords, title: "선택중"});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// select 페이지에서 이름, pwd 입력 후 최종 선택
router.post('/select/:id', async (req, res, next) => {
    // 동시처리 구현중...
    // 중복 선택 방지 구현중..

    try {
        const { headers: { referer } } = req;
        const keywordTitle = referer
            .split('/')[referer.split('/').length - 1];
        const check = await Keyword.findAll({raw: true, attributes:['selector'], where: { title: keywordTitle }})
            .then((result)=>{
                return JSON.stringify(result);
                // console.log(typeof(result));
                // console.log(result);
            })
            .then((result)=>{
                return result.split(',')[0].split(':')[1].split('}')[0]
            });

        // if(check) {

            await Keyword.update({
                selector: req.body.name,
                password: req.body.password
            }, {where: {title: keywordTitle}});

            return res.redirect('/');
        // }else{
        //     res.send("<script>alert('already select'); window.location.replace('/'); </script>");
        // }

    } catch (err) {
        console.error(err);
        next(err);
    }
});


/*
    사용자가 다른 키워드를 선택하기 위해
    기존에 선택했던 키워드를 포기할 때의 동작
 */

// 각 키워드 drop 페이지
router.get('/drop/:id', async (req, res, next) => {
    try {
        const keywords = await Keyword.findAll();
        res.render('drop', { keywords, title: "dropping"});
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// pwd 확인 후 드랍.
router.post('/drop/:id', async (req, res, next) => {
    try {
        const { headers: { referer } } = req;
        const keywordTitle = referer
            .split('/')[referer.split('/').length - 1];

        const pass = await Keyword.findAll({raw: true, attributes:['password'], where: { title: keywordTitle }})
            .then((result)=>{
                return JSON.stringify(result);
            })
            .then((result)=>{
                return result.split(',')[0].split(':')[1].split('}')[0]
            });

        if(req.body.password == pass){
            await Keyword.update({selector: null, password: null}, {where: { title: keywordTitle }});
            return res.redirect('/');
        }else{
            res.send("<script>alert('does not mach'); window.location.replace('/'); </script>");

        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//================= 관리자 페이지


// 관리자 root 페이지: 키워드 생성, 삭제, 리셋 가능.
router.get('/dev', async (req, res, next) => {
    try {
        const keywords = await Keyword.findAll();
        res.render('dev', { keywords, title: "dev Keyword"});
    } catch (err) {
        console.error(err);
        next(err);
    }
});


// create(키워더 생성) 페이지
router.get('/create', async (req, res, next) => {
    try {
        res.render('create');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 키워드 입력 후 생성시 DB 등록
router.post('/create', async (req, res, next) => {
    try {
        await Keyword.create({title: req.body.title});
        return res.redirect('/dev');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 현재 등록된 모든 키워드 삭제
router.post('/reset', async (req, res, next) => {
    try {
        await Keyword.destroy({where:{}});
        return res.redirect('/dev');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 특정 키워드만 삭제
router.post('/delete', async (req, res, next) => {
    try {
        const del_title =  JSON.stringify(req.body).split(':')[0]
                                                .split('\"')[1]
                                                .split('\"')[0];

        await Keyword.destroy({where:{title: del_title}});
        return res.redirect('/dev');
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;