<template>
    <div class="friend-main">
        <div class="title">友情链接</div>
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
        <div class="footer">
            <div class="label">申请须知</div>
            <div class="content">
                <div class="content-item">1. 请确认您的网站可正常访问</div>
                <div class="content-item">2. 不接受含有黄赌毒、政治敏感、暴力的网站</div>
                <div class="content-item">3. 添加本站链接</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .friend-main {
        .title {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 20px;
            margin-top: 20px;
            font-size: 1.6rem;
            padding-left: 20px;
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
        .footer {
            background-color: rgba(255, 255, 255);
            border-radius: 4px;
            padding: 20px 20px 20px 20px;
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
</style>