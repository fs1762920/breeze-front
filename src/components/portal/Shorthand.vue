<template>
    <div class="shorthand-main">
        <div class="shorthand-list">
            <div class="shorthand-item" v-for="(item, index) in shorthandList" :key="index">
                <el-row>
                    <el-col :offset="item.leftOffset" :span="4">
                        <el-avatar :size="50" :src="sourceUrlPrefix + item.userEntity.avatar"></el-avatar>
                    </el-col>
                    <el-col :span="item.contentWidth">
                        <el-popover
                            :disabled="!token"
                            placement="right"
                            trigger="hover">
                            <div style="padding: 0 12px">
                                <el-button v-if="item.hidden === 1" size="small" type="text" style="color: #e79b29" @click="switchHidden(2, item.shorthandId, index)">设为私有</el-button>
                                <el-button v-else size="small" type="text" @click="switchHidden(1, item.shorthandId, index)">设为公开</el-button>
                                <el-button size="small" type="danger" @click="deleteById(item.shorthandId)">删除</el-button>
                            </div>
                            <div class="content-body" slot="reference">
                                <div class="content" v-if="item.hidden === 1">
                                    <p>
                                        {{item.content}}
                                    </p>
                                </div>
                                <div class="divider" v-else>
                                    <el-divider>
                                        <i class="el-icon-lock">
                                            <span style="font-size: 0.8rem;font-weight: 600">&nbsp;未公开</span>
                                        </i>
                                    </el-divider>
                                </div>
                            </div>
                            
                        </el-popover>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class=load-more>
            <el-button class="load" v-if="hasNextPage" type="primary" @click="loadMore">点击加载更多</el-button>
            <div class="nomore" v-else>没有更多了...</div>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            shorthandList: [],
            token: localStorage.getItem('satoken'),
            showIndex: -1,
            pageSize: 8,
            currentPage: 1,
            hasNextPage: false,
        }
    },
    mounted() {
        this.toPage(this.currentPage)
    },
    methods: {
        loadData(param) {
            $get("/shorthand/findByPage", param).then(res=>{
                if (res.code === 100) {
                    if (param.pageNum === 1) {
                        this.shorthandList = res.data.list
                    } else {
                        this.shorthandList = this.shorthandList.concat(res.data.list)
                    }
                    this.hasNextPage = res.data.hasNextPage
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadMore() {
            if (this.hasNextPage) {
                this.currentPage += 1
                this.toPage(this.currentPage)
            }
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadData(param)
        },
        deleteById(shorthandId) {
            let param = {
                shorthandId: shorthandId
            }
            $get("/shorthand/delete", param).then(res=>{
                if(res.code === 100) {
                    this.toPage(1)
                    this.$message.success(res.msg)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        switchHidden(hidden, shorthandId, index) {
            let param = {
                shorthandId: shorthandId,
                hidden: hidden
            }
            $post("/shorthand/update", param).then(res=>{
                if(res.code === 100) {
                    this.toPage(1)
                    this.$message.success(res.msg)
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
    .shorthand-main {
        padding: 20px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 4px;
        margin-top: 20px;
        box-shadow: 1px 1px 8px #c7c7c7;
        min-height: 60vh;
        .shorthand-list {
            padding: 40px;
            height: 100%;
            .shorthand-item {
                padding: 20px;
                // display: flex;
                .el-avatar {
                    float: right;
                }
                .content-body {
                    cursor: pointer;
                    margin-left: 20px;
                    width: 100%;
                    font-size: 0.8rem;
                    .content {
                        background-color: #ffefda;
                        color: #e79b29;
                        border-radius: 8px;
                        padding: 9px 20px;
                        line-height: 32px;
                        p {
                            letter-spacing: 1px
                        }
                    }
                    .divider {
                        border-radius: 8px;
                        padding: 0.5px 20px;
                        background-color: #ffefda;
                        .el-divider--horizontal {
                            .el-divider__text {
                                background-color: #ffefda;
                                color: #3ec2ff;
                            }
                            .el-icon-lock {
                                font-size: 0.8rem;
                            }
                        }
                        .operate-group {
                            padding: 20px;
                        }
                    }
                }
                
                
            }
        }
        .load-more {
            width: 60%;
            margin-left: 40%;
            margin-top: 20px;
            .el-button {
                border-radius: 20px;
                border: none;
                width: 40%;
                box-shadow: 1px 1px 4px 1px #dddddd;
                margin: 0 auto
            }
            .el-button--primary {
                border-color: white;
                background-image: linear-gradient(to right, rgb(87, 146, 255) , rgb(188, 208, 252));
                color: #FFF;
            }
            .load:hover {
                background-image: linear-gradient(to right, rgb(154, 154, 255) , rgb(209, 209, 255));
                color: #FFF;
            }
            .nomore {
                color: #cccccc
            }
        }
    }
</style>