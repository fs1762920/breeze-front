<template>
    <div class="webmaster-main">
        <div class="main-left-pack">
            <div class="main-left">
                <div class="webmaster-avatar">
                    <el-avatar :size="100" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="webmaster-nickname">又见炊烟</div>
                <div class="webmaster-contact">
                    <div class="webmaster-contact-item">
                        <i class="iconfont icon-charulianjie"></i>&nbsp;&nbsp;<el-link type="primary" href="http://localhost:8080/portal" :underline="false">http://localhost:8080/portal</el-link>
                    </div>
                    <div class="webmaster-contact-item">
                        <i class="iconfont icon-mail"></i>&nbsp;&nbsp;fs1762920@163.com
                    </div>
                    <div class="webmaster-contact-item">
                        <i class="iconfont icon-mail"></i>&nbsp;&nbsp;870天
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="operate-record">
                    <div class="operate-record-item">
                        累计发表了&nbsp;2&nbsp;篇文章。
                    </div>
                    <div class="operate-record-item">
                        累计创建了&nbsp;4&nbsp;个分类。
                    </div>
                    <div class="operate-record-item">
                        累计创建了&nbsp;10&nbsp;个标签。
                    </div>
                    <div class="operate-record-item">
                        累计获得了&nbsp;12&nbsp;条评论。
                    </div>
                    <div class="operate-record-item">
                        累计添加了&nbsp;0&nbsp;个友链。
                    </div>
                    <div class="operate-record-item">
                        文章总阅读&nbsp;65&nbsp;次。
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
                            <el-form :ref="userForm" :model="userInfo" :rules="infoRules">
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="userInfo.username" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="昵称" prop="nickname">
                                    <el-input v-model="userInfo.nickname"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="mail">
                                    <el-input v-model="userInfo.mail"></el-input>
                                </el-form-item>
                                <el-form-item label="个人描述" prop="personDescribe">
                                    <el-input type="textarea" v-model="userInfo.personDescribe" :rows="3" :maxlength="200" show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><i class="el-icon-lock"></i> 修改密码</span>
                        <div class="webmaster-pass" label-width="80px">
                            <el-form :ref="passForm" :model="passInfo" :rules="passRules">
                                <el-form-item label="原密码" prop="oldPassword">
                                    <el-input type="password" v-model="passInfo.oldPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="newPassword">
                                    <el-input type="password" v-model="passInfo.newPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPassword">
                                    <el-input type="password" v-model="passInfo.checkPassword"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary">保存</el-button>
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
export default {
    data() {
        return {
            userInfo: {},
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
                ]
            },
            passInfo: {},
            passRules: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur'}
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur'}
                ],
                checkPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur'}
                ]
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .webmaster-main {
        display: flex;
        min-height: 100vh;
        .main-left-pack {
            width: 40%;
            padding-right: 20px;
            .main-left {
                padding: 20px;
                background-color: #ffffff;
                .webmaster-avatar {
                    width: 100%;
                    padding-top: 20px;
                    .el-avatar {
                        display: block;
                        margin: 0 auto;
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