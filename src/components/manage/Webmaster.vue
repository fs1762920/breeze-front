<template>
    <div class="webmaster-main">
        <div class="main-left-pack">
            <div class="main-left">
                <div class="webmaster-avatar">
                    <div class="webmaster-avatar-click">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :headers="header"
                            :show-file-list="false"
                            :on-success="uploadAvatarSuccess">
                            <img v-if="userInfo.avatar" :src="sourceUrlPrefix + userInfo.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="webmaster-nickname">{{userInfo.nickname}}</div>
                <div class="webmaster-contact">
                    <div class="webmaster-contact-item">
                        <i class="el-icon-link"></i>&nbsp;&nbsp;<el-link type="primary" href="http://localhost:8080/portal" :underline="false">http://localhost:8080/portal</el-link>
                    </div>
                    <div class="webmaster-contact-item">
                        <i class="el-icon-message"></i>&nbsp;&nbsp;{{userInfo.mail}}
                    </div>
                    <div class="webmaster-contact-item">
                        <i class="el-icon-date"></i>&nbsp;&nbsp;{{websiteInfo.buildDuration}}天
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="operate-record">
                    <div class="operate-record-item">
                        累计发表了&nbsp;{{websiteInfo.blogCount}}&nbsp;篇文章。
                    </div>
                    <div class="operate-record-item">
                        累计创建了&nbsp;{{websiteInfo.classifyCount}}&nbsp;个分类。
                    </div>
                    <div class="operate-record-item">
                        累计创建了&nbsp;{{websiteInfo.labelCount}}&nbsp;个标签。
                    </div>
                    <div class="operate-record-item">
                        累计获得了&nbsp;{{websiteInfo.commentCount}}&nbsp;条评论。
                    </div>
                    <div class="operate-record-item">
                        累计添加了&nbsp;{{websiteInfo.friendCount}}&nbsp;个友链。
                    </div>
                    <div class="operate-record-item">
                        文章总阅读&nbsp;{{websiteInfo.readingCount}}&nbsp;次。
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right-pack">
            <div class="main-right">
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-postcard"></i> 基本资料</span>
                        <div class="webmaster-info" label-width="80px">
                            <el-form ref="userForm" :model="userInfo" :rules="infoRules">
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="userInfo.username" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="昵称" prop="nickname">
                                    <el-input v-model="userInfo.nickname"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="mail">
                                    <el-input v-model="userInfo.mail"></el-input>
                                </el-form-item>
                                <el-form-item label="github" prop="github">
                                    <el-input v-model="userInfo.github"></el-input>
                                </el-form-item>
                                <el-form-item label="个人主页" prop="homePath">
                                    <el-input v-model="userInfo.homePath"></el-input>
                                </el-form-item>
                                <el-form-item label="个人描述" prop="personalSign">
                                    <el-input type="textarea" v-model="userInfo.personalSign" :rows="3" :maxlength="200" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="updateInfo('userForm')">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-lock"></i> 修改密码</span>
                        <div class="webmaster-pass" label-width="80px">
                            <el-form ref="passForm" :model="passInfo" :rules="passRules">
                                <el-form-item label="原密码" prop="oldPass">
                                    <el-input type="password" v-model="passInfo.oldPass" show-password></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="newPass">
                                    <el-input type="password" v-model="passInfo.newPass" show-password></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass">
                                    <el-input type="password" v-model="passInfo.checkPass" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="updatePass('passForm')">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
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
            uploadUrl: process.env.BASE_URL + '/file/upload',
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            header: {
                satoken: 'Bearer ' + localStorage.getItem('satoken')
            },
            userInfo: {},
            websiteInfo: {},
            infoRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur'},
                    { min: 2, max: 10, message: '长度在2~10之间', trigger: 'blur'}
                ],
                mail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur'},
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                github: [
                    { required: true, message: '请输入github地址', trigger: 'blur'}
                ],
                homePath: [
                    { required: true, message: '请输入个人主页', trigger: 'blur'}
                ]
            },
            passInfo: {},
            passRules: {
                oldPass: [
                    { required: true, message: '请输入旧密码', trigger: 'blur'},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur'},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请输入确认密码', trigger: 'blur'},
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
                    { validator: checkPass, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.loadWebmasterInfo()
        this.loadWebsiteInfo()
    },
    methods: {
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
        updateInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    $post("/user/update", this.userInfo).then(res=>{
                        if(res.code === 100) {
                            this.$message.success(res.msg)
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("无法连接到服务器!")
                    })
                } else {
                    return false
                }
                
            });
        },
        updatePass(formName) {
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
                        this.$message.error("无法连接到服务器!")
                    })
                } else {
                    return false
                }
                
            });
        },
        uploadAvatarSuccess(res) {
            let param = {
                avatar: res.data
            }
            $post("/user/update", param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.loadWebmasterInfo()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })

        }
    }
}
</script>
<style lang="less" scoped>
    .webmaster-main {
        display: flex;
        min-height: calc(100vh - 100px);
        .main-left-pack {
            width: 40%;
            padding-right: 20px;
            .main-left {
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 1px 1px 8px #c7c7c7;
                .webmaster-avatar {
                    width: 100%;
                    padding-top: 20px;
                    /deep/.webmaster-avatar-click {
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                        .el-avatar {
                            cursor: pointer;
                            display: block;
                        }
                        .avatar-uploader .el-upload {
                            border: 1px dashed #d8d8d8;
                            border-radius: 50px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        }
                        .avatar-uploader .el-upload:hover {
                            border-color: #409EFF;
                        }
                        .avatar-uploader-icon {
                            font-size: 28px;
                            color: #8c939d;
                            width: 100px;
                            height: 100px;
                            line-height: 100px;
                            text-align: center;
                        }
                        .avatar {
                            width: 100px;
                            height: 100px;
                            display: block;
                        }
                    }
                    
                }
                .webmaster-nickname {
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 1.2rem;
                }
                .webmaster-contact {
                    .webmaster-contact-item {
                        font-size: 0.8rem;
                        height: 30px;
                        line-height: 30px;
                        i {
                            font-size: 1rem;
                        }
                    }
                }
                .operate-record {
                    .operate-record-item {
                        height: 50px;
                        line-height: 50px;
                        font-size: 0.8rem;
                        &:nth-child(n+2) {
                            border-top: 1px solid rgb(228, 228, 228);
                        } 
                    }
                }
            }
        }
        .main-right-pack {
            width: 60%;
            .main-right {
                background-color: #ffffff;
                .webmaster-info {
                    padding: 20px;
                }
                .webmaster-pass {
                    padding: 20px;
                }
            }
        }
        
    }
</style>