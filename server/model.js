const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/element-admin', {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// 分类
const categorySchema = new mongoose.Schema({
    category_name: {type: String}
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

// 评论
const commentSchema = new mongoose.Schema({
    user_id: {type: String},
    article_id: {type: String},
    comment_like_count: {type: Number},
    comment_content: {type: String},
    comment_time: {type: String}
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

// 博文
const articleSchema = new mongoose.Schema({
    user_id: {type: String},
    title: {type: String},
    body: {type: String},
    article_category_id: {type: String},
    article_view_count: {type: Number},
    article_comment_count: {type: Number},
    article_like_count: {type: Number}
}, {timestamps: {createdAt: 'article_created_time', updatedAt: 'article_update_time'}})

// 用户
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
    phone: {type: String},  // 电话号验证
    mail: {type: String}    // mail验证
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

const Comment = mongoose.model('Comment', commentSchema)
const Category = mongoose.model('Category', categorySchema)
const Article = mongoose.model('Article', articleSchema)
const User = mongoose.model('User', userSchema)


module.exports = {Article, User, Comment, Category}
