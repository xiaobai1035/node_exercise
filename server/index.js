const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();

app.use(require('cors')())

app.use(express.json())

const { Article, User, Comment, Category } = require('./model.js')

const SECRET = 'qwe8iahsfasdhasidasdh'

// app.get('/', async(req, res) => {
//     res.send('index');
// })
// 新增分类
app.post('/api/createCategory', async (req, res) => {
    const category = await Category.create(req.body);
    res.send(category)
})

// 获取分类列表
app.get('/api/categorys', async (req, res) => {
    const categorys = await Category.find()
    res.send(categorys)
})

// 删除分类
app.delete('/api/categorys/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({msg: 'delete complete'})
})

// 新增文章
app.post('/api/articles', async(req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({
            msg: '无权限访问'
        })
    }
    const raw = String(req.headers.authorization)
    const {id} = jwt.verify(raw, SECRET)
    const user = await User.findById(id)
    if (!user) {
        return res.status(422).send({
            msg: '认证不通过'
        })
    }

    var articleContent = req.body;
    articleContent.user_id = user._id;
    const article = await Article.create(articleContent);
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

// 更新文章
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
        return res.status(423).send({
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
    if (!user) {
        return res.status(422).send({
            msg: '用户不存在'
        })
    }
    res.send(user)
})

app.listen(3001, () => {
    console.log("http://localhost:3001")
})
