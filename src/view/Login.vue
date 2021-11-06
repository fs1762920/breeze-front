<template>
    <div class="login-main">
        <div class="login-enter">
            <div class="header">Breeze Dashboard</div>
            <el-divider></el-divider>
            <div class="login-form">
                <el-form :ref="loginForm" :rules="rules" :model="loginInfo">
                    <el-form-item prop="username">
                        <el-input v-model="loginInfo.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginInfo.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" round>登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
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
            }
        }
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