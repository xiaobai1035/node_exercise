<template>
    <div style="overflow:auto">
        <ul>
            <li v-for="item in articleList" :key='item._id' style="list-style-type:none;">
                <el-row>
                    <el-link :underline="false" style="color: black;" @click="handleDetail(item._id)">
                        <h1><strong>
                            {{ item.title }}
                        </strong></h1>
                    </el-link>
                </el-row>
                <el-row>
                    <el-col :sm="12" :md="16">
                        作者
                    </el-col>
                    <el-col :sm="12" :md="8" style="text-align: right;">
                        <el-link :underline="false" icon="el-icon-view" v-if="item.article_view_count" type="info">
                            <span style="color: #3399ea;">
                                {{item.article_view_count}}
                            </span>
                        </el-link>
                        <el-divider direction="vertical" class="font-dicider" v-if="item.article_comment_count"></el-divider>
                        <el-link :underline="false" icon="el-icon-chat-dot-round" v-if="item.article_comment_count" type="info">
                            <span style="color: #3399ea;">
                                {{item.article_comment_count}}
                            </span>
                        </el-link>
                        <el-divider direction="vertical" v-if="item.article_like_count"></el-divider>
                        <el-link :underline="false" icon="el-icon-thumb" v-if="item.article_like_count" type="info">
                            <span style="color: #3399ea;">
                                {{item.article_like_count}}
                            </span>
                        </el-link>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
            </li>
        </ul>
    </div>
</template>

<style>
    .el-divider--horizontal{
        margin: 7px 0;
    }
</style>

<script>
    export default {
        data() {
            return {
                articleList: []
            }
        },
        methods: {
            fetch(){
                this.$http.get('articles').then(res => {
                    this.articleList = res.data;
                })
            },
            handleDetail(id) {
                this.$router.push(`/articles/${id}/detail`)
            }
        },
        created(){
            this.fetch()
        }
    };
</script>
