<template>
    <div class="comment-main">
        <el-dialog
            title="回复列表"
            :visible.sync="replyListDialogShow"
            style="padding-bottom: 20px"
            @close="replyList = []"
            width="80%">
            <div class="reply-dialog">
                <div class="reply-table">
                    <el-table
                        :data="replyList"
                        style="width: 100%;margin-bottom: 20px;">
                        <el-table-column
                            prop="srcNickname"
                            label="回复者昵称"
                            sortable
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="srcMail"
                            label="回复者邮箱">
                        </el-table-column>
                        <el-table-column
                            prop="targetNickname"
                            label="被回复者昵称"
                            sortable
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="targetMail"
                            label="被回复者邮箱">
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
                                <div v-if="currentReplyId !== scope.row.replyId">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        @click="showReplyInnerInput(scope.row)">回复</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="deleteReply(scope.row)">删除</el-button>
                                </div>
                                <div v-else>
                                    <el-input size="small" style="width: 60%" v-model="content" @keyup.enter.native="reply(scope.row)"></el-input>
                                    <el-button size="mini" type="text" @click="cancelReply">取消</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="reply-page">
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
        </el-dialog>


        <el-tabs type="border-card" @tab-click="switchTab">
            <el-tab-pane label="文章">
                <div class="essay-body">
                    <div class="comment-table">
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
                                            @click="showReplyInput(scope.row)">回复</el-button>
                                        <el-button
                                            size="mini"
                                            @click="showReplyList(scope.row)">回复列表</el-button>
                                        <el-button
                                            size="mini"
                                            type="danger"
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
                                            @click="showReplyInput(scope.row)">回复</el-button>
                                        <el-button
                                            size="mini"
                                            @click="showReplyList(scope.row)">回复列表</el-button>
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
            currentReplyId: null,
            content: '',
            replyList: [],
            replyListDialogShow: false,
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
        showReplyInput(row) {
            this.currentCommentId = row.commentId
        },
        showReplyInnerInput(row) {
            this.currentReplyId = row.replyId
        },
        cancelReply() {
            this.content = ''
            this.currentCommentId = null
            this.currentReplyId = null
        },
        reply(row) {
            let param = {
                targetId: row.srcId,
                content: this.content,
                commentId: row.commentId,
                blogId: row.blogId
            }
            $post('/reply/save', param).then(res=>{
                if(res.code === 100) {
                    // 加载评论列表
                    this.$message.success(res.msg)
                    this.cancelReply()
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("发表失败!")
            })
        },
        showReplyList(row) {
            this.replyList = row.replyEntityList
            this.replyListDialogShow = true
        },
        deleteComment(row) {
            let param = {
                commentId: row.commentId
            }
            $get('/comment/delete', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("发表失败!")
            })
        },
        deleteReply(row) {
            let param = {
                replyId: row.replyId
            }
            $get('/reply/delete', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.replyListDialogShow = false
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
        .reply-dialog {
            padding-bottom: 40px;
            .reply-page {
                float: right;
            }
        }   
    }
</style>