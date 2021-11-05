<template>
    <div class="statistics-main">
        <el-drawer
            title="操作记录"
            :visible.sync="showOperationDrawer"
            direction="rtl">
            <div class="operation-list"></div>
            <div class="operation-page">
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </el-drawer>
        <el-row class="website-info" :gutter="20">
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">文章
                            <i class="el-icon-plus"></i></div>
                        </div>
                    <div class="content">
                        32
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">评论
                            <i class="el-icon-bangzhu"></i>
                        </div>
                    </div>
                    <div class="content">
                        165
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">阅读量
                            <el-tooltip content="文章共被阅读67次" placement="top">
                                <i class="el-icon-view"></i>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="content">
                        4089
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="website-item">
                    <div class="head">
                        <div class="title">建立天数
                            <el-tooltip content="网站建立于 2021-11-04 12:08:12" placement="top">
                                <i class="el-icon-warning-outline"></i>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="content">
                        82
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="website-operate" :gutter="20">
            <el-col :span="8">
                <div class="website-item">
                    <el-tabs type="border-card">
                        <el-tab-pane label="最近文章">最近文章</el-tab-pane>
                        <el-tab-pane label="最新评论">最新评论</el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="website-item">
                    <div class="head">
                        速记
                        <i class="el-icon-warning-outline"></i>
                    </div>
                    <div class="body">
                        <el-input type="textarea" :maxlength="50" :rows="5" show-word-limit></el-input>
                    </div>
                    <div class="foot">
                        <el-button size="small" type="primary">发表速记</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="website-item">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>操作记录</span>
                            <el-button style="float: right;" @click="loadOperationList()" type="text">更多</el-button>
                        </div>
                        <div>
                            列表内容
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showOperationDrawer: false
        }
    },
    methods: {
        loadOperationList() {
            this.showOperationDrawer = true
        }    
    }
    
}
</script>
<style lang="less" scoped>
    .statistics-main {
        min-height: 100vh;
        .operation-list {
            .operation-item {

            }
        }
        .operation-page {
            float: right;
        }
        .website-info {
            height: 140px;
            .el-col {
                height: 100%;
                .website-item {
                    height: 100px;
                    background-color: white;
                    padding: 20px;
                    .head {
                        height: 36px;
                        .title {
                            line-height: 36px;
                        }
                        i {
                            vertical-align:middle; 
                            float: right;
                            color: rgb(151, 151, 255);
                            cursor: pointer;
                        }
                    }
                    .content {
                        padding-top: 20px;
                        font-size: 2rem;
                        font-weight: 500;
                    }
                }
            }
        }
        .website-operate {
            margin-top: 20px;
            min-height: 180px;
            .el-col {
                height: 100%;
                .website-item {
                    height: 100%;
                    background-color: white;
                    /deep/.el-tabs__item {
                        height: 48px;
                        line-height: 48px;
                    }
                    .head {
                        padding-left: 20px;
                        height: 48px;
                        line-height: 48px;
                        border-bottom: 1px solid rgb(216, 216, 216);
                    }
                    .body {
                        padding: 20px;
                    }
                    .foot {
                        padding: 0 20px 50px 20px;
                        .el-button {
                            float: right;
                        }
                    }
                    /deep/.el-card__header {
                        padding: 0 20px 0 20px;
                        height: 48px;
                        line-height: 48px;
                    }
                }
            }
        }
    }
</style>