const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();

app.use(require('cors')())

app.use(express.json())

const { Article, User } = require('./model.js')

const SECRET = 'qwe8iahsfasdhasidasdh'

app.get('/', async(req, res) => {
    res.send('index');
})

// 新增文章
app.post('/api/articles', async(req, res) => {
    const article = await Article.create(req.body);
    res.send(article)
})

// 获取列表
app.get('/api/articles', async(req, res) => {
    const articles = await Article.find()
    res.send(articles)
})

// 删除文章
app.delete('/api/articles/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({msg: 'delete complete'})
})

// 文章详情
app.get('/api/articles/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    res.send(article)
})

// 保存文章
app.put('/api/articles/:id', async(req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(article)
})

// 注册用户
app.post('/api/register', async(req, res) => {
    const user = await User.create(req.body)
    res.send(user)
})

// 用户登录
app.post('/api/login', async(req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            msg: '用户不存在'
        })
    }
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
        return res.status(422).send({
            msg: '密码无效'
        })
    }
    // 生成token
    const token = jwt.sign({
        id: String(user._id)
    }, SECRET)
    res.send({
        user,
        token: token
    })
})

// 查询用户
app.get('/api/users', async(req, res) => {
    const users = await User.find()
    res.send(users)
})

// 查询个人信息
app.get('/api/profile', async(req, res) => {
    const raw = String(req.headers.authorization)
    const {id} = jwt.verify(raw, SECRET)
    const user = await User.findById(id)
    res.send(user)
})

app.listen(3001, () => {
    console.log("http://localhost:3001")
})