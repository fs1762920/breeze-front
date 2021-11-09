<template>
    <div class="init-main">
        <div class="init-enter">
            <el-steps :active="step" finish-status="success" simple>
                <el-step title="博主信息" icon="el-icon-edit-outline"></el-step>
            </el-steps>
            <div v-if="step === 0" class="init-enter-form">
                <el-form ref="userForm" :model="userInfo">
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
                        <el-input type="checkPassword" v-model="userInfo.checkPassword" prefix-icon="el-icon-lock" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-upload2">安装</el-button>
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
            step: 0,
            userInfo: {},
            websiteInfo: {}
        }
    },
    methods: {
        nextStep() {
            if(this.step < 3) {
                this.step += 1
            }
        },
        lastStep() {
            if(this.step > 0) {
                this.step -= 1
            }
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
        .init-enter {
            width: 28vw;
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
            .init-enter-form {
                padding: 20px 40px;
                .note {
                    padding: 12px;
                    background-color: rgb(218, 233, 255);
                    line-height: 28px;
                    border-radius: 4px;
                    border: 1px solid rgb(165, 207, 255);
                }
                .upload {
                    margin-top: 20px;
                    /deep/.el-upload {
                        width: 100%;
                        .el-upload-dragger {
                            width: 100%;
                        }
                    }
                }
                .btn-group {
                    margin-top: 20px;
                }
            }
        }
    }
</style>