<template>
    <el-container>
        <el-dialog 
            title="修改密码" 
            width="24%"
            @close="resetForm('passForm')"
            :visible.sync="show">
            <el-form ref="passForm" :model="passInfo" status-icon :rules="rules">
                <el-form-item label="旧密码" prop="oldPass" label-width="80px">
                    <el-input type="password" v-model="passInfo.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass" label-width="80px">
                    <el-input type="password" v-model="passInfo.newPass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" label-width="80px">
                    <el-input type="password" v-model="passInfo.checkPass"></el-input>
                </el-form-item>
                <el-form-item label-width="10vw">
                    <el-button @click="cancelChange('passForm')">取 消</el-button>
                    <el-button type="primary" @click="changePass('passForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-aside width="240px">
            <div class="logo">
                <i class="iconfont icon-1"></i>
                Breeze DashBoard
            </div>
            <el-menu
                default-active="1"
                background-color="#2f3449"
                active-text-color="#fff"
                text-color="#fff">
                <el-menu-item index="1" @click="toDispatch('/manage/statistics')">
                    <i class="iconfont icon-gongyezujian-yibiaopan"></i>
                    <span slot="title">&nbsp;仪表盘</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="iconfont icon-bianjiwenzhang_huaban"></i>
                        <span>&nbsp;文章</span>
                    </template>
                    <el-menu-item index="2-1" @click="toDispatch('/manage/essay')">
                        <span slot="title">&nbsp;所有文章</span>
                    </el-menu-item>
                    <el-menu-item index="2-2" @click="toDispatch('/manage/compose')">
                        <span slot="title">&nbsp;撰写文章</span>
                    </el-menu-item>
                    <el-menu-item index="2-3" @click="toDispatch('/manage/classify')">
                        <span slot="title">&nbsp;分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="2-4" @click="toDispatch('/manage/label')">
                        <span slot="title">&nbsp;标签管理</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="iconfont icon-yemian"></i>
                        <span>&nbsp;页面</span>
                    </template>
                    <el-menu-item index="3-1" @click="toDispatch('/manage/page')">
                        <span slot="title">&nbsp;关于我</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="4" @click="toDispatch('/manage/photo')">
                    <i class="iconfont icon-icon"></i>
                    <span slot="title">&nbsp;相册</span>
                </el-menu-item>
                <el-menu-item index="5" @click="toDispatch('/manage/comment')">
                    <i class="iconfont icon-pinglun"></i>
                    <span slot="title">&nbsp;评论</span>
                </el-menu-item>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="iconfont icon-yonghu"></i>
                        <span>&nbsp;用户</span>
                    </template>
                    <el-menu-item index="6-1" @click="toDispatch('/manage/webmaster')">
                        <span slot="title">&nbsp;个人资料</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="iconfont icon-icon_shezhi"></i>
                        <span>&nbsp;系统</span>
                    </template>
                    <el-menu-item index="7-1" @click="toDispatch('/manage/tool')">
                        <span slot="title">&nbsp;工具</span>
                    </el-menu-item>
                    <el-menu-item index="7-2" @click="toDispatch('/manage/website')">
                        <span slot="title">&nbsp;关于本站</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-dropdown class="user-tab" trigger="click" @command="handleCommand">
                    <div class="user">
                        <el-avatar :src="require('../assets/avatar.jpg')"></el-avatar>
                    </div>
                    <el-dropdown-menu :split-button="true" slot="dropdown">
                        <el-dropdown-item command='changePass'>修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>
<script>
import {$get, $post} from '../api/RestUtils'

export default {
    data(){
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passInfo.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            passInfo: {},
            show: false,
            rules: {
                oldPass: [
                    { required: true, message: "请输入旧密码", trigger: "blur"},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: "请输入新密码", trigger: "blur"},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: "请输入确认密码", trigger: "blur"},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
                    { validator: checkPass, trigger: 'blur' }
                ]
            }
            
        }
    },
    mounted() {
        this.toDispatch('/manage/statistics')
    },
    methods: {
        toDispatch(url){
            this.$router.push(url);
        },
        handleCommand(command) {
            if (command === "logout") { //注销
                $get("/user/logout", null).then(res=>{
                    if(res.code === 100) {
                        localStorage.removeItem("satoken");
                        this.$message.success(res.msg)
                        this.$router.push("/login")
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(error => {
                    this.$message.error("注销失败!")
                })
            } else if (command === 'changePass') { //修改密码
                this.show = true
            }
        },
        changePass(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    $post("/user/changePass", this.passInfo).then(res=>{
                        if(res.code === 100) {
                            localStorage.removeItem("satoken");
                            this.$message.success(res.msg)
                            this.$router.push("/login")
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("修改失败!")
                    })
                } else {
                    return false
                }
                
            });
        },
        cancelChange(formName) {
            this.show = false
            this.resetForm(formName)
        },
        resetForm(formName) {
            this.refs[formName].resetFields()
        }
    }
}
</script>
<style lang="less" scoped>
    /deep/.el-aside {
        height: 100vh;
        width: 240px;
        position: fixed;
        overflow-y: scroll;
        left: 0;
        scrollbar-width:none;
        &::-webkit-scrollbar {
            width : 0px;
        }
        .logo {
            border: none;
            background-color: #2f3449;
            color: white;
            text-align: center;
            height: 80px;
            line-height: 80px;
            font-size: 1.5rem;
            font-weight: 500;
            i {
                line-height: 60px;
                font-size: 1.6rem;
            }
        }
        .el-menu {
            border-color: #2f3449;
            height: 100%;
            .el-submenu__title {
                i {
                    color: white;
                } 
            }
            .el-menu-item {
                i {
                    color: white;
                }
            }
            .is-active {
                background-color: #3370ff !important;
            }
        }
    }

    .el-header {
        height: 40px;
        
        .user-tab {
            cursor: pointer;
            float: right;
            margin-top: 10px;
            margin-left: 30px;
            margin-right: 20px;
            .user {
                display: flex;
                .el-avatar {
                    margin-left: 8px;
                }
            }
        }
        .message-tab {
            cursor: pointer;
            float: right;
            margin-left: 30px;
            .tip {
                margin-top: 20px;
                cursor: pointer;
                i {
                    font-size: 1rem;
                    color: rgb(71, 71, 71);
                }
            }
        }
        
    }

    .popover-body {
        
        // padding: 0!important;
        .title {
            height: 36px;
            line-height: 36px;
            font-size: 1rem;
            text-align: center;
        }
        .el-divider {
            margin-top: 0px!important;
            margin-bottom: 0px!important;
        }
        .message-list {
            overflow-y: scroll;
            height: 240px;
            &:hover {
                &::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
                    height: 1px;
                }
                &::-webkit-scrollbar-thumb {
                    /*滚动条里面小方块*/
                    border-radius: 6px;
                    background   : #dddddd;
                }
                &::-webkit-scrollbar-track {
                    /*滚动条里面轨道*/
                    border-radius: 6px;
                    background   : #ffffff;
                }
            }
            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
                height: 1px;
            }
            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                border-radius: 6px;
                background   : #fff;
            }
            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                border-radius: 6px;
                background   : #ffffff;
            }
            .message-item {
                cursor: pointer;
                padding: 4px 12px;
                height: 50px;
                display: flex;
                &:hover {
                    background-color: rgb(204, 202, 202);
                }
                .avatar {
                    margin-top: 5px;
                }
                .info {
                    margin-left: 8px;
                    .name {
                        margin-top: 8px;
                        color: rgb(71, 71, 71);
                    }
                    .content {
                        margin-top: 2px;
                        width: 240px;
                        height: 20px;
                        font-size: 0.8rem;
                        color: rgb(119, 119, 119);
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                
            }
        }
        .read-all {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            font-size: 0.8rem;
            text-align: center;
            color: rgb(135, 162, 248);
            &:hover {
                text-decoration: underline
            }
        }
        

        .el-tabs{

            /deep/.el-tabs__nav-wrap {
                .el-tabs__item {
                    .is-active {
                        color: #409EFF!important;
                    }
                }
                &::after {
                    display: none;
                }
            }
            /deep/.el-tabs__header {
                width: 80%;
                margin: 0 auto;
            }
            /deep/.el-tabs__content {
                width: 100%;
                margin: 0 auto;
                .comment-list, .apply-list, .accusation-list {
                    overflow-y: scroll;
                    height: 240px;
                    &:hover {
                        &::-webkit-scrollbar {
                            /*滚动条整体样式*/
                            width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
                            height: 1px;
                        }
                        &::-webkit-scrollbar-thumb {
                            /*滚动条里面小方块*/
                            border-radius: 6px;
                            background   : #dddddd;
                        }
                        &::-webkit-scrollbar-track {
                            /*滚动条里面轨道*/
                            border-radius: 6px;
                            background   : #ffffff;
                        }
                    }
                    &::-webkit-scrollbar {
                        /*滚动条整体样式*/
                        width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    &::-webkit-scrollbar-thumb {
                        /*滚动条里面小方块*/
                        border-radius: 6px;
                        background   : #fff;
                    }
                    &::-webkit-scrollbar-track {
                        /*滚动条里面轨道*/
                        border-radius: 6px;
                        background   : #ffffff;
                    }
                    .comment-item {
                        padding-left: 5%;
                        padding-right: 5%;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        line-height: 25px;
                        font-size: 0.8rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        cursor: pointer;
                        span {
                            color: #409EFF;
                        }
                        &:hover {
                            background-color: rgb(231, 231, 231);
                        }
                    }
                    .apply-item {
                        padding-left: 5%;
                        padding-right: 5%;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        line-height: 25px;
                        font-size: 0.8rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                        >div {
                            float: left;
                            >span {
                                color: #409EFF;
                            }
                        }
                        .el-button {
                            float: right;
                            margin-left: 20px;
                        }
                        &:hover {
                            background-color: rgb(231, 231, 231);
                        }
                    }
                    .accusation-item {
                        padding-left: 5%;
                        padding-right: 5%;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        line-height: 20px;
                        font-size: 0.8rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                        span {
                            color: #409EFF;
                        }
                        &:hover {
                            background-color: rgb(231, 231, 231);
                        }
                    }
                    
                }
            }
            
        }
    }

    .el-main {
        margin-left: 240px;
        overflow: hidden;
        background-color:  rgb(241, 241, 241);
    }
    
</style>