const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/element-admin', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Article = mongoose.model('Article', new mongoose.Schema({
    title: {type: String},
    body: {type: String}
}))

const User = mongoose.model('User', new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
    phone: {type: String},  // 电话号验证
    mail: {type: String}    // mail验证
}))


module.exports = {Article, User}