<template>
    <el-form @submit.native.prevent="editArticle" ref="form" :model="article" label-width="80px">
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
            <el-button type="primary" native-type="submit">保存</el-button>
            <el-button @click="cancelSave">取消</el-button>
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
        fetch() {
            this.$http.get('categorys').then(res => {
                for (var item of res.data) {
                    this.categorys.push({value: item._id, label: item.category_name})
                }
                this.$http.get(`/articles/${this.$route.params.id}`).then(info => {
                    this.article = info.data;
                    this.category_value = this.article.article_category_id;
                })
            })
        },
        editArticle() {
            this.article.article_category_id = this.category_value;
            this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(() => {
                this.$message({
                    message: '编辑数据成功',
                    type: 'success'
                });
                this.$router.push('/articles/list')
            });
        },
        cancelSave() {
            this.$router.push('/articles/list')
        }
    },
    created() {
        this.fetch()
    }
  }
</script>
