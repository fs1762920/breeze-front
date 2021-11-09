<template>
    <div class="init-main">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                完善博客信息
            </div>
            <el-form ref="userForm" :model="userInfo" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="userInfo.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-input v-model="userInfo.nickname" prefix-icon="el-icon-postcard" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item prop="mail">
                    <el-input v-model="userInfo.mail" prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="userInfo.password" prefix-icon="el-icon-unlock" placeholder="密码(8-16位)"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassword">
                    <el-input type="password" v-model="userInfo.checkPassword" prefix-icon="el-icon-lock" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="el-icon-upload2" @click="initWebmaster('userForm')">安装</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import {$get, $post} from '../api/RestUtils'

export default {
    data() {
        var checkPass = (rule, value, callback) => {
            if (value !== this.userInfo.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            step: 0,
            userInfo: {},
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '请输入邮件', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮件格式', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:8, max:16, message: '长度在8~16之间', trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:8, max:16, message: '长度在8~16之间', trigger: 'blur' },
                    { validator: checkPass, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        initWebmaster(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $post("/system/initWebmasterInfo", this.userInfo).then(res=>{
                        console.log("注销结果: ", res)
                        if(res.code === 100) {
                            this.$router.push("/login")
                            this.$message.success(res.msg)
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("博客初始化失败!")
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .init-main { 
        height: 100vh;
        background-image: url("../assets/init-background.png");
        background-size: 100% 100%;
        background-attachment: fixed;
        .el-card {
            width: 18vw;
            max-height: 24vw;
            background-color: white;
            border-radius: 4px;
            margin: auto;
            position: absolute;
            top: 0; 
            left: 0; 
            bottom: 0; 
            right: 0;
            box-shadow: 1px 1px 8px #c7c7c7;
            .clearfix {
                font-size: 1.2rem;
                text-align: center;
            }
            /deep/.el-card__body {
                padding: 20px 20px 0 20px;
            }
        }
    }
</style>