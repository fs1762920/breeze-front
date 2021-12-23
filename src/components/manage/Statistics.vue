<template>
    <div class="statistics-main">
        <el-drawer
            title="操作记录"
            :visible.sync="showOperationDrawer"
            direction="rtl">
            <div class="operation-list">
                <div class="operation-item" v-for="(item, index) in operationList" :key="index">
                    <div class="info">
                        <div class="title">{{item.action}}</div>
                        <div class="subject">{{item.relevance}}</div>
                    </div>
                    <div class="date">{{dateFormat(item.ctime)}}</div>
                </div>
            </div>
            <div class="operation-page">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="toPage"
                    @prev-click="toPage"
                    @next-click="toPage"
                    :total="total"
                    :page-size="pageSize">
                </el-pagination>
            </div>
        </el-drawer>
        <el-row class="website-info" :gutter="20">
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">文章
                            <i class="el-icon-plus" @click="toDispatch('/manage/compose')"></i></div>
                        </div>
                    <div class="content">
                        {{websiteInfo.blogCount}}
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">评论
                            <i class="el-icon-bangzhu" @click="toDispatch('/manage/comment')"></i>
                        </div>
                    </div>
                    <div class="content">
                        {{websiteInfo.commentCount}}
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">阅读量
                            <el-tooltip :content="`文章共被阅读 ${websiteInfo.readingCount} 次`" placement="top">
                                <i class="el-icon-view"></i>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="content">
                        {{websiteInfo.readingCount}}
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">建立天数
                            <el-tooltip :content="`网站建立于 ${websiteInfo.buildTime} `" placement="top">
                                <i class="el-icon-warning-outline"></i>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="content">
                        {{websiteInfo.buildDuration}}
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="website-operate" :gutter="20">
            <el-col :span="8">
                <div class="website-item">
                    <el-tabs type="border-card">
                        <el-tab-pane label="最近文章">
                            <div class="essay-group">
                                <div class="essay-item" v-for="(item, index) in blogList" :key="index" @click="blogOverview(item.blogId)">
                                    <el-tooltip effect="dark" :content="item.title" placement="right">
                                        <div class="title">{{item.title}}</div>
                                    </el-tooltip>
                                    <div class="date">{{dateFormat(item.mtime)}}</div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="最新评论">最新评论</el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="website-item">
                    <el-form :model="shorthandInfo" :rules="rules" ref="shorthandForm">
                        <div class="head">
                            随笔
                            <i class="el-icon-warning-outline"></i>
                        </div>
                        <div class="body">
                            <el-form-item prop="">
                                <el-input v-model="shorthandInfo.content" id="content" type="textarea" :rows="5" show-word-limit></el-input>
                            </el-form-item>
                        </div>
                        <div class="foot">
                            <el-row>
                                <el-col :span="18">
                                    <el-form-item style="width: 100%">
                                        <el-switch
                                            v-model="shorthandInfo.hidden"
                                            active-color="yellowgreen"
                                            inactive-color="red"
                                            :active-value="1"
                                            :inactive-value="2"
                                            active-text="公开"
                                            inactive-text="私密">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="text" size="mini" @click="showEmoji = !showEmoji"><i class="iconfont icon-tianjiabiaoqing_fjxjv7"></i></el-button>
                                    <div class="emoji-group">
                                        <VEmojiPicker v-show="showEmoji" @select="selectEmoji"/>
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <el-button size="small" type="primary" @click="publishShorthand('shorthandForm')">发表随笔</el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2" :offset="8">
                                    
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="website-item">
                    <el-card class="box-card">
                        <div slot="header">
                            <span>操作记录</span>
                            <el-button style="float: right;" @click="operationShow()" type="text">更多</el-button>
                        </div>
                        <div class="operate-group">
                            <div class="operate-item" v-for="(item, index) in latestOperationList" :key="index">
                                <div class="info">
                                    <div class="title">{{item.action}}</div>
                                    <div class="subject">{{item.relevance}}</div>
                                </div>
                                <div class="date">{{dateFormat(item.ctime)}}</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            showOperationDrawer: false,
            websiteInfo: {},
            blogList: [],
            total: 0,
            pageSize: 12,
            operationList: [],
            latestOperationList: [],
            showEmoji: false,
            shorthandInfo: {
                hidden: 1
            },
            rules: {
                content: [
                    { required: true, message: "请输入内容", trigger: 'blur'}
                ],
                hidden: [
                    { required: true, message: "请选择是否公开", trigger: 'blur'}
                ]
            }
        }
    },
    mounted() {
        this.loadWebsiteInfo()
        this.loadBlogList()
        this.loadLatestOperationList()
    },
    methods: {
        loadWebsiteInfo() {
            $get("/system/websiteInfo", null).then(res=>{
                if(res.code === 100) {
                    this.websiteInfo = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadBlogList() {
            $get("/blog/findLatest", null).then(res=>{
                if(res.code === 100) {
                    this.blogList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadLatestOperationList() {
            $get("/operation/findLatest", null).then(res=>{
                if(res.code === 100) {
                    this.latestOperationList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadOperationList(param) {
            $get("/operation/findByPage", param).then(res=>{
                if(res.code === 100) {
                    this.operationList = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        blogOverview(blogId) {
            let routeUrl = this.$router.resolve({
                path: '/portal/view',
                query: {
                    blogId: blogId
                }
            });
            window.open(routeUrl.href, '_blank');
        },
        selectEmoji(emoji) {// 选择emoji后调用的函数
            let input = document.getElementById("content")
            let startPos = input.selectionStart
            let endPos = input.selectionEnd
            let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
            input.value = resultText
            input.focus()
            input.selectionStart = startPos + emoji.data.length
            input.selectionEnd = startPos + emoji.data.length
            this.$set(this.shorthandInfo, 'content', resultText)
        },
        publishShorthand(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    $post('/shorthand/save', this.shorthandInfo).then(res=>{
                        if(res.code === 100) {
                            this.$message.success(res.msg)
                            this.resetForm(formName)
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("无法连接到服务器")
                    })
                } else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.shorthandInfo = {
                hidden: 1
            }
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadOperationList(param)
        },
        operationShow() {
            this.toPage(1)
            this.showOperationDrawer = true
        },
        toDispatch(path) {
            this.$router.push(path)
        },
        dateFormat(date){
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
        }
    }
    
}
</script>
<style lang="less" scoped>
    .statistics-main {
        min-height: calc(100vh - 100px);
        /deep/.el-drawer__header {
            padding: 0 20px 0 20px;
            height: 48px;
            line-height: 48px;
            margin: 0;
            border-bottom: 1px solid rgb(216, 216, 216);
        }
        .operation-list {
            padding: 20px;
            .operation-item {
                height: 70px;
                &:nth-child(n+2){
                    border-top: 1px solid rgb(228, 228, 228);
                }
                .info {
                    height: 40px;
                    line-height: 40px;
                    display: flex;
                    .title {
                        width: 40%;
                    }
                    .subject {
                        text-align: right;
                        width: 60%;
                        color: rgb(131, 131, 131);
                        padding-left: 40px;
                        white-space: nowrap;   //规定段落中的文本不进行换行
                        text-overflow:ellipsis;
                        overflow:hidden;
                    }
                }
                .date {
                    font-size: 0.8rem;
                    color: rgb(131, 131, 131);
                    height: 20px;
                    line-height: 20px;
                }
            }
        }
        .operation-page {
            float: right;
        }
        .website-info {
            height: 140px;
            .el-col {
                height: 100%;
                .website-item {
                    height: 100px;
                    background-color: white;
                    padding: 20px;
                    box-shadow: 1px 1px 8px #c7c7c7;
                    .head {
                        height: 36px;
                        .title {
                            line-height: 36px;
                        }
                        i {
                            vertical-align:middle; 
                            float: right;
                            color: rgb(151, 151, 255);
                            cursor: pointer;
                        }
                    }
                    .content {
                        padding-top: 20px;
                        font-size: 2rem;
                        font-weight: 500;
                    }
                }
            }
        }
        .website-operate {
            margin-top: 20px;
            min-height: 180px;
            .el-col {
                height: 100%;
                .website-item {
                    height: 100%;
                    background-color: white;
                    box-shadow: 1px 1px 8px #c7c7c7;
                    /deep/.el-tabs__item {
                        height: 48px;
                        line-height: 48px;
                    }
                    .head {
                        padding-left: 20px;
                        height: 48px;
                        line-height: 48px;
                        border-bottom: 1px solid rgb(216, 216, 216);
                    }
                    .body {
                        padding: 20px 20px 0 20px;
                    }
                    .foot {
                        padding: 0 20px 0 20px;
                        .el-button {
                            float: right;
                            margin-top: 5px;
                            .icon-tianjiabiaoqing_fjxjv7 {
                                color: #fdbd1b;
                                font-size: 1.8rem;
                                line-height: 20px;
                            }
                        }
                        .emoji-group {
                            margin-top: 40px;
                            position: absolute;
                            right: 80px;
                            z-index: 2048;
                            .emoji-picker {
                                background-color: rgb(250, 250, 250);
                            }
                        }
                    }
                    /deep/.el-card__header {
                        padding: 0 20px 0 20px;
                        height: 48px;
                        line-height: 48px;
                    }
                    /deep/.el-card__body {
                        padding: 10px 20px 20px 20px;
                    }
                    .essay-group {
                        .essay-item {
                            cursor: pointer;
                            color: rgb(102, 102, 102);
                            padding: 0 10px 0 10px;
                            display: flex;
                            height: 48px;
                            line-height: 48px;
                            &:nth-child(n+2){
                                border-top: 1px solid rgb(228, 228, 228);
                            }
                            .title {
                                width: 60%;
                                white-space: nowrap;   //规定段落中的文本不进行换行
                                text-overflow:ellipsis;
                                overflow:hidden;
                                &:hover {
                                    color: rgb(151, 151, 255);
                                }
                            }
                            .date {
                                width: 40%;
                                font-size: 0.8rem;
                                text-align: right;
                            }
                        }
                    }
                    .operate-group {
                       .operate-item {
                            height: 70px;
                            &:nth-child(n+2){
                                border-top: 1px solid rgb(228, 228, 228);
                            }
                            .info {
                                height: 40px;
                                line-height: 40px;
                                display: flex;
                                .title {
                                    width: 40%;
                                }
                                .subject {
                                    text-align: right;
                                    width: 60%;
                                    color: rgb(131, 131, 131);
                                    padding-left: 40px;
                                    white-space: nowrap;   //规定段落中的文本不进行换行
                                    text-overflow:ellipsis;
                                    overflow:hidden;
                                }
                            }
                            .date {
                                font-size: 0.8rem;
                                color: rgb(131, 131, 131);
                                height: 30px;
                                line-height: 30px;
                            }
                       } 
                    }
                }
            }
        }
    }
</style>