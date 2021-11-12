<template>
    <div class="friend-main">
        <div class="header">
            <div class="title">友情链接</div>
        </div>
        <div class="friend-group">
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
            <div class="friend-item">
                <div class="avatar">
                    <el-avatar :size="60" :src="require('../../assets/avatar.jpg')"></el-avatar>
                </div>
                <div class="info">
                    <div class="nickname">
                        星河漫步-xinac.com
                    </div>
                    <div class="sign">
                        年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。
                    </div>
                </div>
            </div>
        </div>
        <div class="friend-note">
            <div class="friend-note-item">
                <div class="label">网站要求</div>
                <div class="content">
                    <div class="content-item">1. 请确认您的网站可正常访问</div>
                    <div class="content-item">2. 不接受含有黄赌毒、政治敏感、暴力的网站</div>
                    <div class="content-item">3. 需要交换友链，先把本站添加到你的网站中，同时根据下面的格式，给我发email或在留言板给我留言</div>
                </div>
            </div>
            <div class="friend-note-item">
                <div class="label">申请格式</div>
                <div class="content">
                    <div class="content-item">1. 博客标题:&nbsp;breeze</div>
                    <div class="content-item">2. 博客地址:&nbsp;http://localhost:8080</div>
                    <div class="content-item">3. 头像链接:&nbsp;http://localhost:8080/upload/file/2315dsf4rwqr.jpeg</div>
                    <div class="content-item">4. 个人介绍(不超过50字):&nbsp;年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            friendInfo: {}
        }
    }
}
</script>
<style lang="less" scoped>
    .friend-main {
        .friend-form {
            /deep/.avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
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
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
        .header {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 20px;
            margin-top: 20px;
            font-size: 1.6rem;
            padding-left: 20px;
            display: flex;
            .title {
                width: 70%;
            }
            .apply {
                width: 30%;
                .el-button {
                    float: right;
                }
            }
            
        }
        .friend-group {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 20px 10px 40px 10px;
            margin-top: 20px;
            min-height: 20vh;
            overflow: hidden;
            .friend-item {
                float: left;
                display: flex;
                width: calc(50% - 40px);
                border-radius: 4px;
                cursor: pointer;
                padding: 20px;
                &:hover {
                    background-color: rgb(226, 226, 226);
                }
                .info {
                    width: calc(100% - 80px);
                    padding: 0 10px;
                    .nickname {
                        white-space: nowrap;   //规定段落中的文本不进行换行
                        text-overflow:ellipsis;
                        overflow:hidden;
                        height: 40px;
                        line-height: 40px;
                        font-weight: 600;
                    }
                    .sign {
                        white-space: nowrap;   //规定段落中的文本不进行换行
                        text-overflow:ellipsis;
                        overflow:hidden;
                        height: 20px;
                        line-height: 20px;
                        font-size: 0.8rem;
                        color: rgb(102, 102, 102);
                    }
                }
            }
        }
        .friend-note {
            margin-top: 20px;
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 20px 20px 20px 20px;
            .friend-note-item {
                margin-top: 20px;
                .label {
                    font-size: 1.2rem;

                }
                .content {
                    font-size: 0.8rem;
                    padding: 10px 20px;
                    .content-item {
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
            
        }
    }
</style>