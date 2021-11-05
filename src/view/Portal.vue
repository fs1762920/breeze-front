<template>
    <el-container>
        <el-header>
            <div class="head">
                <div class="nav">
                    <el-menu default-active="1" mode="horizontal">
                        <el-menu-item index="1" @click="toDispatch('/portal/home')">首页</el-menu-item>
                        <el-menu-item index="2" @click="toDispatch('/portal/friend')">友情链接</el-menu-item>
                        <el-menu-item index="3" @click="toDispatch('/portal/time')">文章归档</el-menu-item>
                        <el-menu-item index="4" @click="toDispatch('/portal/about')">关于</el-menu-item>
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
                        <el-avatar :size="120" :src="require('../assets/avatar.jpg')"></el-avatar>
                    </div>
                    <div class="content">
                        <div class="nickname">又见炊烟</div>
                        <div class="hometown">
                            <i class="el-icon-location"></i>
                            陕西 西安
                        </div>
                    </div>
                    <div class="overview">
                        <div class="overview-item">
                            <div class="label">文章</div>
                            <div class="content">10</div>
                        </div>
                        <div class="overview-item">
                            <div class="label">分类</div>
                            <div class="content">10</div>
                        </div>
                        <div class="overview-item">
                            <div class="label">标签</div>
                            <div class="content">10</div>
                        </div>
                    </div>
                    <div class="focus">
                        <el-button type="primary" round>关注我</el-button>
                    </div>
                    <div class="contact-group">
                        <div class="contact-item">
                            <i class="iconfont icon-github"></i>
                        </div>
                        <div class="contact-item">
                            <i class="iconfont icon-qq"></i>
                        </div>
                        <div class="contact-item">
                            <i class="iconfont icon-mail"></i>
                        </div>
                        <div class="contact-item">
                            <i class="iconfont icon-charulianjie"></i>
                        </div>
                    </div>
                </div>
                <div class="classify-essay">
                    <div class="title">分类</div>
                    <div class="classify-group">
                        <div class="classify-item">推荐<div class="count">0</div></div>
                        <div class="classify-item">技术<div class="count">0</div></div>
                        <div class="classify-item">阅读<div class="count">110</div></div>
                        <div class="classify-item">杂文<div class="count">0</div></div>
                    </div>
                </div>
            </div>
            <div class="main-center">
                <router-view></router-view>
            </div>
            <div class="main-right">
                <div class="lastest-essay">
                    <div class="title">最新文章</div>
                    <div class="essay-group">
                        <div class="essay-item">
                            <div class="cover">
                                <el-image fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
                            </div>
                            <div class="info">
                                <span>2021-08-21</span>
                                <p>《毛选》（卷一） 001中国社会各阶级的分析</p>
                            </div>
                        </div>
                        <div class="essay-item">
                            <div class="cover">
                                <el-image fit="cover" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
                            </div>
                            <div class="info">
                                <span>2021-08-21</span>
                                <p>《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="label-content">
                    <div class="title">标签</div>
                    <div class="label-group">
                        <div class="label-item">
                            <el-tag size="small">社科</el-tag>
                            <el-tag size="small">React</el-tag>
                            <el-tag size="small">Docker</el-tag>
                            <el-tag size="small">服务器</el-tag>
                            <el-tag size="small">CentOS</el-tag>
                            <el-tag size="small">Linux</el-tag>
                            <el-tag size="small">Vue</el-tag>
                            <el-tag size="small">spring boot</el-tag>
                            <el-tag size="small">Java</el-tag>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {

    },
    mounted() {
        this.$router.replace('/portal/home')
    },
    methods: {
        toDispatch(url) {
            this.$router.push(url)
            window.scrollTo(0, 0)
        }
    }
}

</script>
<style lang="less" scoped>
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
        padding: 0 14vw 0 14vw;
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
            width: 36vw;
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
                    .label-item {
                        .el-tag {
                            margin-top: 10px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
    
</style>