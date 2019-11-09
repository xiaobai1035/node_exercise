<template>
    <div>
        <el-table :data="articles">
            <el-table-column prop="title" label="标题" width="140">
            </el-table-column>
            <el-table-column prop="body" label="内容" width="220">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
                    <el-button size="mini" type="danger" 
                    @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articles: [] 
            }
        },
        methods: {
            fetch(){
                this.$http.get('articles').then(res => {
                    this.articles = res.data;
                })
            },
            handleDelete(id) {
                this.$http.delete(`articles/${id}`).then(res => {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.fetch()
                })
            },
            handleEdit(id) {
                this.$router.push(`/articles/${id}/edit`)
            }
        },
        created(){
            this.fetch()
        }
    };
</script>