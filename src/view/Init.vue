<template>
    <div class="init-main">
        <div class="init-enter">
            <el-steps :active="step" finish-status="success" simple>
                <el-step title="博主信息" icon="el-icon-edit-outline"></el-step>
                <el-step title="网站信息" icon="el-icon-monitor"></el-step>
                <el-step title="数据导入" icon="el-icon-orange"></el-step>
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
                        <el-button type="primary" @click="nextStep">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="step === 1" class="init-enter-form">
                <el-form ref="websiteForm" :model="websiteInfo">
                    <el-form-item prop="address">
                        <el-input v-model="websiteInfo.address" prefix-icon="el-icon-link" placeholder="访问地址"></el-input>
                    </el-form-item>
                    <el-form-item prop="logoName">
                        <el-input v-model="websiteInfo.logoName" prefix-icon="el-icon-document" placeholder="网站名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="lastStep">上一步</el-button>
                        <el-button type="primary" @click="nextStep">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="step === 2" class="init-enter-form">
                <div class="note">
                    如果有数据导入需求，请点击并选择之前导出的文件。需要注意的是，并不是所有数据都会导入，该初始化表单的数据会覆盖你导入的数据。
                </div>
                <div class="upload">
                    <el-upload
                        drag
                        disabled
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将导入文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </div>
                <div class="btn-group">
                    <el-button @click="lastStep">上一步</el-button>
                    <el-button type="primary" icon="el-icon-upload2">安装</el-button>
                </div>
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