const express = require('express');
const Keyword = require('../models/keyword');
const User = require('../models/user');
const Part = require('../models/part');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../config/swagger-output.json');

const isAuth = require('../middleware/jwt');
const config = require('../config/config.json');

const router = express.Router();

const options = {
    origin: "http://localhost:3000",
    credentials: true,
};



router.use(cors(options));

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));

router.get("/", async (req, res) => {
    res.send("server is running!");
});

router.post('/login', async (req, res, next) => {   // 로그인
    try {
        const user = await User.findOne({
            attributes: ['userId'],
            where: { userId: req.body.userId, password: req.body.password},
        });

        if(user != null) {
            const token = createJwtToken(req.body.userId);
            res.status(200).json({ token, result: "로그인 성공" });

        } else { res.status(400).json("로그인 실패!")}

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/register/reg', async (req, res, next) => {
    try {
        const [user, created] = await User.findOrCreate({
            attributes: ['userId'],
            where: { userId: req.body.userId },
            defaults: { name: req.body.name, nickname: req.body.nickname,
                password: req.body.password, partNumber: req.body.partNumber}
        });

        if (created) {
            const token = createJwtToken(req.body.userId);
            res.status(201).json({ token, result: "회원가입 성공" });
        } else { res.status(400).json("회원가입 실패")}

    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post("/register/check", async (req, res) => {
    // nickname, userId 둘중에 하나가 온다. 두 경우로 나눠서 중복검사해서 existence: true or false

    if (req.body.nickname != null) {
        const nickname = await User.findOne({
            attributes: ['nickname'],
            where: { nickname: req.body.nickname }
        });

        if (nickname != null) {
            res.status(200).json({ existence: true });
        } else res.status(200).json({ existence: false });
    }

    if (req.body.userId != null) {
        const userId = await User.findOne({
            attributes: ['userId'],
            where: { userId: req.body.userId }
        });

        if (userId != null) {
            res.status(200).json({ existence: true });
        } else res.status(200).json({ existence: false });
    }
});


// 토큰 테스트용
router.get('/me', isAuth, (req, res) => {
    res.status(200).json({
        token: req.body.token, userId: req.body.userId, result: "토큰 인증 성공!"
    });
});


// main/에서 get keyword 필요한지
router.get('/main', isAuth, async (req, res, next) => {
    try {
        console.log(`nickname: ${req.nickname}, userId: ${req.userId}, partNumber: ${req.partNumber}`);
        const allKeywords = await Keyword.findAll({where:{partNumber:req.partNumber}})

        res.status(200).json({allKeywords, result:"Keyword load success."});

    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post('/main/select', isAuth, async (req, res, next) => {
    try {
        // -> 이 부분 유저 nickName만 넣을지 id->누가 선택했는지 구분할라고...

        const allKeywords = await Keyword.findOne({where:{keywordNumber: req.body.keywordNumber}})

        // 선택된 keyword의 selector가 비어있다면 현재 user로 채우기
        if(allKeywords.selector === null) {
            await Keyword.update({selector: req.nickname}, {where: {keywordNumber: req.body.keywordNumber}});

            res.status(200).json("Select success.");

        }else{ // 비어있지 않다면 error 발생
            res.status(400).json("Keyword already selected.");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});



router.put('/main/drop', isAuth, async (req, res, next) => {
    try {

        const allKeywords = await Keyword.findOne({where:{keywordNumber: req.body.keywordNumber}})

        //선택된
        if(allKeywords.selector !== null) {
            await Keyword.update( {selector: null},{where: { keywordNumber: req.body.keywordNumber}});

            res.status(200).json({result:"Drop success."});

        }else{
            res.status(400).json("Keyword does not select.");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});



router.post('/main/random', isAuth, async (req, res, next) => {
    try {
        //선택한 keyword의 selector와 현재 유저 비교후 드랍

        const allKeywords = await Keyword.findAll({where: {selector: null}});
        const len = Object.values(allKeywords).length;
        const target = Math.floor(Math.random() * len)

        if(Object.keys(allKeywords).length !== 0) { //selector=null인 값이 있으면.
            const targetId = Object.values(allKeywords)[target].keywordNumber;

            await Keyword.update( {selector: req.nickname},{where: { keywordNumber: targetId }});

            res.status(200).json("Random select success.");
        }else{
            res.status(400).json("All keyword already selected.");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});












//delay admin

router.get('/admin', async (req, res, next) => {
    try {
        //admin 페이지 접속 시 현재 모든 keyword 목록 검색
        const allKeywords = await Keyword.findAll({})

        const token = createJwtToken(req.keywordId)
        res.status(200).json({token, result: "키워드 드랍 성공"})

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


function createJwtToken(userId) {
    return jwt.sign({ userId: userId }, config.security.JWT_SECRET,
        { expiresIn: config.security.JWT_EXPIRES_SEC });
}




module.exports = router;