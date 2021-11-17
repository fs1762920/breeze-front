<template>
    <div class="comment-main">
        <el-tabs type="border-card" @tab-click="switchTab">
            <el-tab-pane label="文章">
                <div class="essay-body">
                    <div class="coment-table">
                        <el-table
                            :data="commentList"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="commentId"
                            :tree-props="{children: 'replyList', hasChildren: 'hasChildren'}">
                            <el-table-column
                                prop="srcNickname"
                                label="昵称"
                                sortable
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="srcMail"
                                label="邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                show-overflow-tooltip
                                label="内容">
                            </el-table-column>
                            <el-table-column
                                prop="ctime"
                                :formatter="dateFormat"
                                label="评论日期">
                            </el-table-column>
                            <el-table-column
                                prop="srcIp"
                                label="IP">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center">
                                <template slot-scope="scope">
                                    <div v-if="currentCommentId !== scope.row.commentId">
                                        <el-button
                                            size="mini"
                                            type="text"
                                            @click="showReply(scope.row)">回复</el-button>
                                        <el-button
                                            size="mini"
                                            type="text"
                                            @click="deleteComment(scope.row)">删除</el-button>
                                    </div>
                                    <div v-else>
                                        <el-input size="small" style="width: 60%" v-model="content" @keyup.enter.native="reply(scope.row)"></el-input>
                                        <el-button size="mini" type="text" @click="cancelReply">取消</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="comment-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="toPage"
                            @prev-click="toPage"
                            @next-click="toPage"
                            :page-size="pageSize"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关于页面">
                <div class="essay-body">
                    <div class="coment-table">
                        <el-table
                            :data="commentList"
                            style="width: 100%;margin-bottom: 20px;">
                            <el-table-column
                                prop="srcNickname"
                                label="昵称"
                                sortable
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="srcMail"
                                label="邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                show-overflow-tooltip
                                label="内容">
                            </el-table-column>
                            <el-table-column
                                prop="ctime"
                                :formatter="dateFormat"
                                label="评论日期">
                            </el-table-column>
                            <el-table-column
                                prop="srcIp"
                                label="IP">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center">
                                <template slot-scope="scope">
                                    <div v-if="currentCommentId !== scope.row.commentId">
                                        <el-button
                                            size="mini"
                                            type="text"
                                            @click="showReply(scope.row)">回复</el-button>
                                        <el-button
                                            size="mini"
                                            type="text"
                                            @click="deleteComment(scope.row)">删除</el-button>
                                    </div>
                                    <div v-else>
                                        <el-input size="small" style="width: 60%" v-model="content" @keyup.enter.native="reply(scope.row)"></el-input>
                                        <el-button size="mini" type="text" @click="cancelReply">取消</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="comment-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="toPage"
                            @prev-click="toPage"
                            @next-click="toPage"
                            :page-size="pageSize"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            commentList: [],
            type: 0,
            pageSize: 10,
            total: 0,
            currentCommentId: null,
            content: ''
        }
    },
    mounted() {
        this.toPage(1)
    },
    methods: {
        loadCommentList(param) {
            $get('/comment/findByPageBackend', param).then(res=>{
                if(res.code === 100) {
                    this.commentList = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        toPage(pageNum) {
            console.log("type :", this.type)
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize,
                type: this.type
            }
            this.loadCommentList(param)
        },
        switchTab(tab, event) {
            this.type = tab.index
            this.toPage(1)
        },
        showReply(row) {
            this.currentCommentId = row.commentId
        },
        cancelReply() {
            this.content = ''
            this.currentCommentId = null
        },
        reply(row) {
            let param = {
                targetId: row.srcId,
                content: this.content,
                commentId: row.commentId,
                blogId: row.blogId
            }
            console.log("回复参数:", JSON.stringify(param))
            $post('/reply/save', param).then(res=>{
                if(res.code === 100) {
                    // 加载评论列表
                    this.cancelReply()
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("发表失败!")
            })
        },
        dateFormat(row, column, cellValue){
            return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}
</script>
<style lang="less" scoped>
    .comment-main {
        min-height: calc(100vh - 100px);
        .comment-page {
            float: right;
        }
    }
</style>