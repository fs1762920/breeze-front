<template>
    <el-container>
        <el-backtop></el-backtop>
        <div class="music-group">
            <aplayer
                v-if="musicLoaded"
                ref="player"
                :fixed="true"
                :volume="0.3"
                :audio="musicList"
                :lrcType="1"
                :listFolded="true"
                />
        </div>
        <el-dialog
            title="友链信息"
            :visible.sync="linkInfoShow"
            width="30%">
            <div class="link-info">
                <div class="link-info-item">
                    <div class="label">博客名称:</div>
                    <div class="content">Breeze&nbsp;<i class="copy-icon el-icon-document" data-clipboard-text="Breeze" @click="copy"></i></div>
                </div>
                <div class="link-info-item">
                    <div class="label">头像链接:</div>
                    <div class="content">{{sourceUrlPrefix + userInfo.avatar}}&nbsp;<i class="copy-icon el-icon-document" :data-clipboard-text="sourceUrlPrefix + userInfo.avatar" @click="copy"></i></div>
                </div>
                <div class="link-info-item">
                    <div class="label">博客主页:</div>
                    <div class="content">{{userInfo.homePath}}&nbsp;<i class="copy-icon el-icon-document" :data-clipboard-text="userInfo.homePath" @click="copy"></i></div>
                </div>
                <div class="link-info-item">
                    <div class="label">个性签名:</div>
                    <div class="content">{{userInfo.personalSign}}&nbsp;<i class="copy-icon el-icon-document" :data-clipboard-text="userInfo.personalSign" @click="copy"></i></div>
                </div>
            </div>
        </el-dialog>
        <el-header>
            <div class="head">
                <div class="nav">
                    <el-menu :default-active="this.$route.path" mode="horizontal">
                        <el-menu-item index="/portal/home" @click="toDispatch('/portal/home')">首页</el-menu-item>
                        <el-menu-item index="/portal/friend" @click="toDispatch('/portal/friend')">友情链接</el-menu-item>
                        <el-menu-item index="/portal/time" @click="toDispatch('/portal/time')">文章归档</el-menu-item>
                        <el-menu-item index="/portal/shorthand" @click="toDispatch('/portal/shorthand')">随笔</el-menu-item>
                        <el-menu-item index="/portal/picture" @click="toDispatch('/portal/picture')">照片墙</el-menu-item>
                        <el-menu-item index="/portal/about" @click="toDispatch('/portal/about')">关于</el-menu-item>
                    </el-menu>
                </div>
                <div class="operate-group">
                    <i class="el-icon-share"></i>
                    &nbsp;&nbsp;
                    <i class="el-icon-search"></i>
                </div>
            </div>
        </el-header>
        <el-main class="main">
            <div class="main-left">
                <div class="master-info">
                    <div class="avatar">
                        <el-avatar v-if="userInfo.avatar" :size="120" :src="sourceUrlPrefix + userInfo.avatar"></el-avatar>
                    </div>
                    <div class="content">
                        <div class="nickname">{{userInfo.nickname}}</div>
                        <div class="hometown">
                            <i class="el-icon-location"></i>
                            陕西 西安
                        </div>
                    </div>
                    <div class="overview">
                        <div class="overview-item">
                            <div class="label">文章</div>
                            <div class="content">{{websiteInfo.blogCount}}</div>
                        </div>
                        <div class="overview-item">
                            <div class="label">分类</div>
                            <div class="content">{{websiteInfo.classifyCount}}</div>
                        </div>
                        <div class="overview-item">
                            <div class="label">标签</div>
                            <div class="content">{{websiteInfo.labelCount}}</div>
                        </div>
                    </div>
                    <div class="focus">
                        <el-button type="primary" round @click="followMe()">关注我</el-button>
                    </div>
                    <div class="contact-group">
                        <div class="contact-item">
                            <i class="iconfont icon-github" @click="toOuterLink(userInfo.github)"></i>
                        </div>
                        <div class="contact-item">
                            <i class="iconfont icon-qq"></i>
                        </div>
                        <div class="contact-item">
                            <el-tooltip class="item" effect="dark" :content="userInfo.mail" placement="bottom-end">
                                <i class="iconfont icon-mail"></i>
                            </el-tooltip>
                        </div>
                        <div class="contact-item">
                            <i class="iconfont icon-charulianjie" @click="toOuterLink(userInfo.homePath)"></i>
                        </div>
                    </div>
                </div>
                <div class="classify-essay">
                    <div class="title">分类</div>
                    <div class="classify-group">
                        <div class="classify-item" v-for="(item, index) in classifyList" :key="index" @click="loadClassifyBlogList(item.classifyId)">{{item.classifyName}}<div class="count">{{item.blogCount}}</div></div>
                    </div>
                </div>
            </div>
            <div class="main-center">
                <router-view :key="JSON.stringify(this.$route.query)"></router-view>
            </div>
            <div class="main-right">
                <div class="lastest-essay">
                    <div class="title">最新文章</div>
                    <div class="essay-group">
                        <div class="essay-item" v-for="(item, index) in latestBlogList" :key="index">
                            <div class="cover">
                                <el-image fit="cover" :src="sourceUrlPrefix + item.cover"></el-image>
                            </div>
                            <div class="info" @click="blogOverview(item.blogId)">
                                <span>{{dateFormat(item.mtime)}}</span>
                                <p>{{item.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="label-content">
                    <div class="title">标签</div>
                    <div class="label-group">
                        <el-tag v-for="(item, index) in labelList" :key="index" size="small" @click="loadLabelBlogList(item.labelId)">{{item.labelName}}</el-tag>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import {$get, $post} from '../api/RestUtils'

export default {
    data() {
        return {
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            userInfo: {},
            websiteInfo: {},
            labelList: [],
            classifyList: [],
            latestBlogList: [],
            musicList: [],
            musicLoaded: false,
            linkInfoShow: false
        }
    },
    mounted() {
        this.loadWebmasterInfo()
        this.loadWebsiteInfo()
        this.loadLabelList()
        this.loadClassifyList()
        this.loadLatestBlogList()
        if(this.$route.query.blogId) {
            this.blogOverview(this.$route.query.blogId)
        } else {
            this.$router.replace('/portal/home')
        }
        this.loadMusicList()
        this.saveCustomInfo()
    },
    methods: {
        saveCustomInfo() {
            $post("/custom/save", null).then(res=>{
                if(res.code != 100) {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        blogOverview(blogId) {
            this.$router.push({
                path: '/portal/view',
                query: {
                    blogId: blogId
                }
            })
        },
        loadClassifyBlogList(classifyId) {
            this.$router.push({
                path: '/portal/home',
                query: {
                    classifyId: classifyId
                }
            })
        },
        loadLabelBlogList(labelId) {
            this.$router.push({
                path: '/portal/home',
                query: {
                    labelId: labelId
                }
            })
        },
        loadWebmasterInfo() {
            $get("/system/webmasterInfo", null).then(res=>{
                if(res.code === 100) {
                    this.userInfo = {
                        username: res.data.username,
                        nickname: res.data.nickname,
                        mail: res.data.mail,
                        github: res.data.github,
                        homePath: res.data.homePath,
                        personalSign: res.data.personalSign,
                        avatar: res.data.avatar
                    }
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
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
        loadLabelList() {
            $get("/label/find", null).then(res=>{
                if(res.code === 100) {
                    this.labelList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadClassifyList() {
            $get("/classify/find", null).then(res=>{
                if(res.code === 100) {
                    this.classifyList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadLatestBlogList() {
            $get("/blog/findLatest", null).then(res=>{
                if(res.code === 100) {
                    this.latestBlogList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadMusicList(){
            $get("/music/find", null).then(res=>{
                if(res.code === 100) {
                    res.data.forEach(item => {
                        this.$set(item, 'cover', this.sourceUrlPrefix + item.albumPicture)
                        this.$set(item, 'url', this.sourceUrlPrefix + item.src)
                        this.$set(item, 'lrc', item.lyric)
                        this.$set(item, 'name', item.title)
                    })
                    this.musicList = res.data
                    this.musicLoaded = true
                } else {
                    this.$message(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            });
        },
        followMe() {
            this.linkInfoShow = true
        },
        copy() {
            // let clipboard = new Clipboard(".copy-icon"); //单页面引用
            let clipboard = new ClipboardJS(".copy-icon"); //在main.js中引用
            clipboard.on("success", e => {
                this.$message.success("复制成功")
                // 释放内存
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                // 不支持复制
                this.$message.error("该浏览器不支持自动复制")
                // 释放内存
                clipboard.destroy();
            });
        }, 　　
        toDispatch(url) {
            this.$router.push(url)
            window.scrollTo(0, 0)
        },
        toOuterLink(url) {
            window.open(url)
        },
        dateFormat(date){
            return this.$moment(date).format("YYYY-MM-DD")
        }
    }
}

</script>
<style lang="less" scoped>
    .music-group {
        position: fixed;
        bottom: 2vh;
        width: 16vw;
        z-index: 2048;
        left: 2vw;
        /deep/.aplayer-lrc-contents {
            .aplayer-lrc-current {
                color: rgb(126, 126, 255);
            }
        }
    }
    .link-info {
        padding: 20px;
        .link-info-item {
            line-height: 40px;
            display: flex;
            .label {
                width: 80px;
                font-weight: 600;
            }
            .content {
                width: calc(100% - 60px);
                padding-left: 20px;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                i {
                    cursor: pointer;
                }
            }
        }
    }
    .head{
        padding: 0 20vw 0 20vw;
        display: flex;
        .nav {
            width: 60%;
            .el-menu.el-menu--horizontal {
                border: none
            }
        }
        .operate-group {
            text-align: right;
            line-height: 60px;
            width: 40%;
            i {
                cursor: pointer;
            }
        }
    }
    .main {
        padding: 0 12vw 0 12vw;
        min-height: 100vh;
        padding-bottom: 80px;
        background-color: rgb(238, 238, 238);
        display: flex;
        .main-left {
            width: 16vw;
            .master-info {
                margin-top: 20px;
                background-color: #ffffff;
                border-radius: 4px;
                box-shadow: 1px 1px 8px #c7c7c7;
                .avatar {
                    padding-top: 20px;
                    .el-avatar {
                        display: block;
                        margin: 10px auto;
                    }
                }
                .content {
                    margin-top: 8px;
                    .nickname {
                        text-align: center;
                        font-size: 1.2rem;
                        height: 36px;
                        line-height: 36px;
                        color: rgb(90, 90, 90);
                    }
                    .hometown {
                        text-align: center;
                        font-size: 0.9rem;
                        height: 24px;
                        line-height: 24px;
                        color: rgb(109, 109, 109);
                    }
                }
                .overview {
                    display: flex;
                    padding: 0 12% 0 12%;
                    height: 60px;
                    margin-top: 10px;
                    .overview-item {
                        width: 33%;
                        text-align: center;
                        .label {
                            font-size: 0.8rem;
                        }
                        .content {
                            font-size: 1.6rem;
                        }
                    }
                }
                .focus {
                    margin-top: 24px;
                    margin-left: 10%;
                    width: 80%;
                    .el-button {
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        padding: 0
                    }
                }
                .contact-group {
                    padding: 0 10% 20px 10%;
                    display: flex;
                    .contact-item {
                        width: 25%;
                        text-align: center;
                        margin-top: 10px;
                        font-size: 1.6rem;
                        color: rgb(95, 95, 95);
                        i {
                            cursor: pointer;
                        }
                    }
                }
            }
            .classify-essay {
                padding: 20px;
                margin-top: 20px;
                background-color: #ffffff;
                border-radius: 4px;
                box-shadow: 1px 1px 8px #c7c7c7;
                .title {
                    height: 20px;
                    font-size: 0.8rem;
                    line-height: 20px;
                    color: cadetblue;
                }
                .classify-group {
                    margin: 10px 5px 0 5px;
                    .classify-item {
                        padding-left: 5px;
                        height: 36px;
                        cursor: pointer;
                        line-height: 36px;
                        color: rgb(95, 95, 95);
                        .count {
                            margin: 5px 5px 0 0;
                            padding: 0 4px 0 4px;
                            height: 20px;
                            min-width: 20px;
                            text-align: center;
                            font-size: 0.8rem;
                            line-height: 20px;
                            border-radius: 2px;
                            float: right;
                            background-color: rgb(241, 240, 240);
                            color: #868686;
                        }
                        &:hover {
                            background-color: rgb(241, 240, 240);
                            border-radius: 2px;
                        }
                    }
                }
            }
        }
        .main-center {
            width: 40vw;
            margin-left: 2vw;
        }
        .main-right {
            margin-left: 2vw;
            width: 16vw;
            .lastest-essay {
                padding: 20px;
                margin-top: 20px;
                background-color: #ffffff;
                border-radius: 4px;
                box-shadow: 1px 1px 8px #c7c7c7;
                .title {
                    height: 20px;
                    font-size: 0.8rem;
                    line-height: 20px;
                    color: cadetblue;
                }
                .essay-item {
                    display: flex;
                    margin-top: 16px;
                    cursor: pointer;
                    .cover {
                        width: 60px;
                        height: 60px;
                        .el-image {
                            width: 60px;
                            height: 60px;
                        }
                    }
                    .info {
                        margin-left: 12px;
                        span {
                            display: block;
                            margin-top: 4px;
                            font-size: 0.6rem;
                            color: rgb(133, 133, 133);
                        }
                        p {
                            margin-top: 4px;
                            font-size: 0.8rem;
                            text-overflow: -o-ellipsis-lastline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            line-clamp: 2;
                            -webkit-box-orient: vertical;
                            &:hover {
                                color: rgb(151, 151, 255);
                            }
                        }
                    }
                }
            }
            .label-content {
                padding: 20px;
                margin-top: 20px;
                background-color: #ffffff;
                border-radius: 4px;
                box-shadow: 1px 1px 8px #c7c7c7;
                .title {
                    height: 20px;
                    font-size: 0.8rem;
                    line-height: 20px;
                    color: cadetblue;
                }
                .label-group {
                    .el-tag {
                        margin-top: 10px;
                        margin-right: 4px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    
</style>