<template>
    <div class="login-main">
        <div class="login-enter">
            <div class="header">Breeze Dashboard</div>
            <el-divider></el-divider>
            <div class="login-form">
                <el-form ref="loginForm" :rules="rules" :model="loginInfo">
                    <el-form-item prop="username">
                        <el-input v-model="loginInfo.username" prefix-icon="el-icon-user" placeholder="用户名" @keyup.enter.native="login('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginInfo.password" prefix-icon="el-icon-lock" placeholder="密码" @keyup.enter.native="login('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" round @click="login('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../api/RestUtils'

export default {
    data() {
        return {
            loginInfo: {},
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: 'blur'}
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur'}
                ]
            },
            // publicKey: ''
        }
    },
    // mounted() {
    //     this.getPublicKey()
    // },
    methods: {
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // let password = this.encrypt(this.loginInfo.password)
                    // this.$set(this.loginInfo, 'password', password)
                    $post("/user/login", this.loginInfo).then(res=>{
                        if(res.code === 100) {
                            localStorage.setItem("satoken", res.data.token);
                            this.$router.push("/manage/statistics")
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("登录失败!")
                    })
                } else {
                    return false;
                }
            });
        },
        // getPublicKey() {
        //     $get("/user/getPublicKey", null).then(res=>{
        //         if(res.code === 100) {
        //             this.publicKey = res.data
        //         } else {
        //             this.$message.error(res.msg)
        //         }
        //     }).catch(error => {
        //         this.$message.error("无法连接到服务器!")
        //     })
        // },
        // encrypt(password) {
        //     var encrypt = new JSEncrypt();
        //     // encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + this.publicKey + '-----END PUBLIC KEY-----')
        //     console.log(this.publicKey)
        //     encrypt.setPublicKey(this.publicKey)
        //     return encrypt.encrypt(password)
        // }
    }
}
</script>
<style lang="less" scoped>
    .login-main { 
        height: 100vh;
        background-image: url("../assets/init-background.png");
        background-size: 100% 100%;
        background-attachment: fixed;
        .login-enter {
            background-color: white;
            border-radius: 4px;
            margin: auto;
            position: absolute;
            top: 0; 
            left: 0; 
            bottom: 0; 
            right: 0;
            width: 16vw;
            height: 18vw;
            box-shadow: 1px 1px 8px #c7c7c7;
            .header {
                height: 60px;
                line-height: 60px;
                font-size: 1.6rem;
                font-weight: 600;
                text-align: center;
                color: rgb(131, 131, 255);
            }
            /deep/.el-divider--horizontal {
                margin: 0;
            }
            .login-form {
                padding: 40px;
            }
        }
    }
</style>