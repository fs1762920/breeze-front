<template>
    <div class="about-main">
        <div class="title">关于我</div>
        <div class="about-view">
            <div class="markdown-body" v-html="pageInfo.htmlContent"/>
        </div>
        <div class="comment-group">
            <div class="comment-avatar">
                <el-avatar v-if="customInfo.avatarPath" shape="square" :size="120" :src="customInfo.customType === 1?(sourceUrlPrefix + customInfo.avatarPath):customInfo.avatarPath"></el-avatar>
            </div>
            <div class="comment-form">
                <el-form ref="commentForm" :rules="rules" :model="commentForm" label-width="60px">
                    <el-form-item v-show="false" label="文章id" prop="blogId">
                        <el-input type="text" v-model="commentForm.blogId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item v-show="false" label="评论者id" prop="srcId">
                        <el-input type="text" v-model="commentForm.srcId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="昵称" prop="nickname">
                                <el-input v-model="commentForm.nickname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="邮箱" prop="mail">
                                <el-input v-model="commentForm.mail"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="主页" prop="homePage">
                                <el-input v-model="commentForm.homePage"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="评论" prop="content">
                                <el-input type="textarea" maxlength="200" show-word-limit v-model="commentForm.content" placeholder="说点什么..."></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" :offset="16">
                            <div class="btn-group"  style="float: right">
                                <el-button type="text" size="small" round @click="resetCommentForm('commentForm')">重置</el-button>
                                <el-button type="primary" size="small" round @click="submitComment('commentForm')">发表评论</el-button>
                            </div>
                            
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="comment-area">
            <div class="title">评论区</div>
            <div v-if="commentList.length > 0">
                <div class="comment-list">
                    <div class="comment-item" v-for="(commentItem, commentIndex) in commentList" :key="commentIndex">
                        <div class="comment-item-inner">
                            <div class="comment-item-avatar">
                                <el-avatar size="medium" :src="commentItem.srcAvatarPath.startsWith('http')?commentItem.srcAvatarPath : sourceUrlPrefix + commentItem.srcAvatarPath"></el-avatar>
                            </div>
                            <div class="comment-item-body">
                                <span>
                                    <span class="comment-item-user">{{commentItem.srcNickname}}</span>
                                    :&nbsp;
                                    <span class="comment-item-content">{{commentItem.content}}</span>
                                    <span class="comment-item-date">{{dateFormat(commentItem.ctime)}}</span>
                                    <span class="comment-item-reply">
                                        <el-button type="text" @click="backComment(commentIndex, commentItem.commentId, commentItem.srcId)">回复</el-button>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="reply-group" v-if="currentCommentIndex === commentIndex" :key="commentIndex">
                            <div class="reply-avatar">
                                <el-avatar v-if="customInfo.avatarPath" shape="square" :size="120" :src="customInfo.customType === 1?(sourceUrlPrefix + customInfo.avatarPath):customInfo.avatarPath"></el-avatar>
                            </div>
                            <div class="reply-form">
                                <el-form ref="replyForm" :rules="rules" :model="replyForm" label-width="60px">
                                    <el-form-item v-show="false" label="文章id" prop="blogId">
                                        <el-input type="text" v-model="replyForm.blogId" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-show="false" label="被回复者id" prop="targetId">
                                        <el-input type="text" v-model="replyForm.targetId" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item v-show="false" label="评论者id" prop="srcId">
                                        <el-input type="text" v-model="replyForm.srcId" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="昵称" prop="nickname">
                                                <el-input v-model="replyForm.nickname"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="邮箱" prop="mail">
                                                <el-input v-model="replyForm.mail"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="主页" prop="homePage">
                                                <el-input v-model="replyForm.homePage"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="评论" prop="content">
                                                <el-input type="textarea" maxlength="200" show-word-limit v-model="replyForm.content" placeholder="说点什么..."></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8" :offset="16">
                                            <div class="btn-group"  style="float: right">
                                                <el-button type="text" size="small" round @click="resetReplyForm('replyForm')">取消</el-button>
                                                <el-button type="primary" size="small" round @click="submitReply('replyForm')">发表评论</el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                        </div>
                        <div class="reply-list">
                            <div v-for="(replyItem, replyIndex) in commentItem.replyEntityList" :key="replyIndex">
                                <div class="reply-item">
                                    <div class="reply-item-avatar">
                                        <el-avatar size="medium" :src="replyItem.srcAvatarPath.startsWith('http')?replyItem.srcAvatarPath : sourceUrlPrefix + replyItem.srcAvatarPath"></el-avatar>
                                    </div>
                                    <div class="reply-item-body">
                                        <span>
                                            <span class="reply-item-user-src">
                                                {{replyItem.srcNickname}}
                                            </span>
                                            <span class="reply-item-keyword">
                                                回复
                                            </span>
                                            <span class="reply-item-user-to">
                                                {{replyItem.targetNickname}}
                                            </span>
                                            :&nbsp;
                                            <span class="reply-item-content">{{replyItem.content}}</span>
                                            <span class="reply-item-date">{{dateFormat(replyItem.ctime)}}</span>
                                            <span class="reply-item-reply">
                                                <el-button type="text" @click="backComment(commentIndex + '' + replyIndex, commentItem.commentId, replyItem.srcId)">回复</el-button>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div class="reply-group" v-if="currentCommentIndex === commentIndex + '' + replyIndex" :key="commentIndex + '' + replyIndex">
                                    <div class="reply-avatar">
                                        <el-avatar v-if="customInfo.avatarPath" shape="square" :size="120" :src="customInfo.customType === 1?(sourceUrlPrefix + customInfo.avatarPath):customInfo.avatarPath"></el-avatar>
                                    </div>
                                    <div class="reply-form">
                                        <el-form ref="replyForm" :rules="rules" :model="replyForm" label-width="60px">
                                            <el-form-item v-show="false" label="文章id" prop="blogId">
                                                <el-input type="text" v-model="replyForm.blogId" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item v-show="false" label="被回复者id" prop="targetId">
                                                <el-input type="text" v-model="replyForm.targetId" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item v-show="false" label="评论者id" prop="srcId">
                                                <el-input type="text" v-model="replyForm.srcId" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item label="昵称" prop="nickname">
                                                        <el-input v-model="replyForm.nickname"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-form-item label="邮箱" prop="mail">
                                                        <el-input v-model="replyForm.mail"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-form-item label="主页" prop="homePage">
                                                        <el-input v-model="replyForm.homePage"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="24">
                                                    <el-form-item label="评论" prop="content">
                                                        <el-input type="textarea" maxlength="200" show-word-limit v-model="replyForm.content" placeholder="说点什么..."></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="8" :offset="16">
                                                    <div class="btn-group"  style="float: right">
                                                        <el-button type="text" size="small" round @click="resetReplyForm('replyForm')">取消</el-button>
                                                        <el-button type="primary" size="small" round @click="submitReply('replyForm')">发表评论</el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-page">
                    <el-pagination
                        small
                        layout="prev, pager, next"
                        @current-change="toPage"
                        @prev-click="toPage"
                        @next-click="toPage"
                        :total="total"
                        :page-size="pageSize">
                    </el-pagination>
                </div>
            </div>
            <el-empty v-else description="暂无评论"></el-empty>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            pageInfo: {},
            customInfo: {},
            currentCommentIndex: -1,
            commentForm: {},
            replyForm: {},
            rules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { max: 16, min: 2, message: '长度在2~16之间', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入评论内容', trigger: 'blur' }
                ]
            },
            commentList: [],
            total: 0,
            pageSize: 10
        }
    },
    mounted() {
        this.loadPageInfo()
        this.loadCustomInfo()
        this.toPage(1)
    },
    methods: {
        loadCustomInfo() {
            $get("/custom/info", null).then(res=>{
                if(res.code === 100) {
                    this.customInfo = res.data
                    if (res.data) {
                        this.commentForm = {
                            nickname: res.data.nickname,
                            mail: res.data.mail,
                            homePage: res.data.homePage,
                            srcId: res.data.customId
                            
                        }
                        this.replyForm = {
                            nickname: res.data.nickname,
                            mail: res.data.mail,
                            homePage: res.data.homePage,
                            srcId: res.data.customId
                        }
                    }
                    
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadPageInfo() {
            let param = {
                pageCode: 'about'
            }
            $get("/page/find", param).then(res=>{
                if(res.code === 100) {
                    this.pageInfo = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadCommentList(param) {
            $get("/comment/findByPage", param).then(res=>{
                if(res.code === 100) {
                    this.commentList = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum, 
                pageSize: this.pageSize,
                blogId: -1
            }
            this.loadCommentList(param)
        },
        backComment(index, commentId, targetId) {
            console.log("index:" + index + "commentId: " + commentId + "targetId: " + targetId)
            this.$set(this.replyForm, 'commentId', commentId)
            this.$set(this.replyForm, 'targetId', targetId)
            this.currentCommentIndex = index
        },
        submitComment(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    this.$set(this.commentForm, "blogId", -1)
                    $post('/comment/save', this.commentForm).then(res=>{
                        if(res.code === 100) {
                            this.resetCommentForm(formName)
                            this.loadCustomInfo()
                            // 加载评论列表
                            this.toPage(1)
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("发表失败!")
                    })
                } else {
                    return false
                }
            });
        },
        submitReply(formName) {
            console.log("formName:", formName)
            this.$refs[formName][0].validate((valid) => {
                if(valid) {
                    this.$set(this.replyForm, "blogId", -1)
                    $post('/comment/save', this.replyForm).then(res=>{
                        if(res.code === 100) {
                            this.resetReplyForm(formName)
                            this.loadCustomInfo()
                            // 加载评论列表
                            this.toPage(1)
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("发表失败!")
                    })
                } else {
                    return false
                }
            });
        },
        resetCommentForm(formName) {
            this.$delete(this.commentForm, 'content')
            console.log("commentForm: ", JSON.stringify(this.commentForm))
        },
        resetReplyForm(formName) {
            this.currentCommentIndex = -1
            this.$delete(this.replyForm, 'content')
            this.$delete(this.replyForm, 'targetId')
            this.$delete(this.replyForm, 'commentId')
            console.log("replyForm: ", JSON.stringify(this.replyForm))
        },
        dateFormat(date) {
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}
</script>
<style lang="less" scoped>
    .about-main{
        .title {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 20px;
            margin-top: 20px;
            font-size: 1.6rem;
            padding-left: 20px;
        }
        .about-view {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 40px;
            margin-top: 20px;
        }
        .comment-group {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 40px 40px 20px 40px;
            margin-top: 20px;
            display: flex;
            .comment-avatar {
                width: 120px;
                .el-avatar {
                    border: 1px dashed rgb(112, 112, 112);
                    cursor: pointer;
                }
            }
            .comment-form {
                margin-left: 10px;
            }
        }
        .comment-area {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 0 20px 40px 20px;
            margin-top: 20px;
            .title {
                font-size: 1.6rem;
                padding-left: 20px;
            }
            .comment-list {
                margin-top: 20px;
                padding: 0 20px 40px 20px;
                .comment-item {
                    margin-bottom: 10px;
                    .comment-item-inner {
                        display: flex;
                        .comment-item-body {
                            display: flex;
                            margin-left: 10px;
                            .comment-item-user {
                                font-size: 0.8rem;
                                color: rgb(87, 146, 255);
                                line-height: 36px;
                                font-weight: 600;
                                min-height: 36px;
                            }
                            .comment-item-content {
                                color: rgb(97, 97, 97);
                                line-height: 36px;
                                font-size: 0.8rem;
                                font-weight: 500;
                                height: 36px;
                            }
                            .comment-item-date {
                                margin-left: 10px;
                                font-size: 0.6rem;
                                color: rgb(182, 182, 182);
                                line-height: 36px;
                                height: 36px;
                            }
                            .comment-item-reply {
                                margin-left: 10px;
                                .el-button {
                                    font-size: .8rem;
                                }
                                height: 36px;
                            }
                        }
                        
                    }
                    .reply-list {
                        margin-left: 40px;
                        margin-top: 6px;
                        .reply-item {
                            display: flex;
                            .reply-item-body {
                                display: flex;
                                margin-left: 10px;
                                .reply-item-user-src {
                                    font-size: 0.8rem;
                                    color: rgb(87, 146, 255);
                                    line-height: 36px;
                                    font-weight: 600;
                                    height: 36px;
                                }
                                .reply-item-keyword {
                                    font-size: 0.8rem;
                                    margin-left: 10px;
                                    color: rgb(122, 122, 122);
                                    line-height: 36px;
                                    height: 36px;
                                }
                                .reply-item-user-to {
                                    font-size: 0.8rem;
                                    margin-left: 10px;
                                    color: rgb(87, 146, 255);
                                    line-height: 36px;
                                    font-weight: 600;
                                    height: 36px;
                                }
                                .reply-item-content {
                                    color: rgb(97, 97, 97);
                                    line-height: 36px;
                                    font-size: 0.8rem;
                                    height: 36px;
                                }
                                .reply-item-date {
                                    margin-left: 10px;
                                    font-size: 0.6rem;
                                    color: rgb(182, 182, 182);
                                    line-height: 36px;
                                    height: 36px;
                                }
                                .reply-item-reply {
                                    margin-left: 10px;
                                    .el-button {
                                        // height: 30px;
                                        font-size: .8rem;
                                    }
                                    height: 36px;
                                }
                            }
                        }
                    }
                }
                .reply-group {
                    // border: 1px dashed rgb(190, 190, 190);
                    background-color: rgba(255, 255, 255);
                    border-radius: 4px;
                    padding: 20px 40px;
                    display: flex;
                    .reply-avatar {
                        width: 120px;
                        .el-avatar {
                            border: 1px dashed rgb(112, 112, 112);
                            cursor: pointer;
                        }
                    }
                    .reply-form {
                        margin-left: 10px;
                    }
                }
            }
            .comment-page {
                float: right;
            }
        }
        
    }
</style>