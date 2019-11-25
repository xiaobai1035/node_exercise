<template>
    <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
        <el-form-item label="文章分类">
          <el-select v-model="category_value" placeholder="请选择">
            <el-option v-for="item in categorys" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input type="textarea" v-model="article.body"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    data() {
      return {
        article: {

        },
        categorys: [],
        category_value: ''
      }
    },
    methods: {
      saveArticle() {
        this.article.article_category_id = this.category_value;
        this.$http.post('articles', this.article, {
          headers: {
            'content-type': 'application/json',
            "authorization": localStorage.token
          }
        }).then(() => {
          this.$message({
            message: '新建数据成功',
            type: 'success'
          });
          this.$router.push('/articles/list')
        }).catch(err => {
          if (err) {
              return false;
            }
            return false;
        });
      },
      fetch(){
        this.$http.get('categorys').then(res => {
          for (var item of res.data) {
            this.categorys.push({value: item._id, label: item.category_name})
          }
        })
      }
    },
    created(){
        this.fetch()
    }
  }
</script>
