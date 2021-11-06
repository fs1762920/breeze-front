<template>
    <div class="tool-main">
        <el-drawer
            class="tool-detail"
            title="数据导出"
            :visible.sync="exportShow"
            direction="rtl">
            <div class="essay-overview">
                <div class="essay-body"></div>
                <el-divider></el-divider>
                <div class="footer">
                    <el-button type="primary" size="small" icon="el-icon-download">备份</el-button>
                </div>
            </div>
        </el-drawer>
        <div class="tool-item">
            <el-card class="box-card" shadow="always">
                <div slot="header" class="title">
                    <span>博客备份</span>
                </div>
                <div class="content">
                    支持备份全站数据和数据导出，支持下载到本地
                </div>
                <div class="footer">
                    <el-button size="small" @click="exportShow = true">备份</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            exportShow: false
        }
    }
}
</script>
<style lang="less" scoped>
    .tool-main {
        min-height: calc(100vh - 100px);
        .tool-detail {
            /deep/.el-drawer__header {
                padding: 0 20px 0 20px;
                height: 48px;
                line-height: 48px;
                margin: 0;
                border-bottom: 1px solid rgb(216, 216, 216);
            }
            .essay-overview{
                height: 100%;
                .essay-body {
                    height: calc(92vh - 50px);
                }
                .footer {
                    margin-top: calc(8vh - 85px);
                    margin-left: calc(100% - 100px);
                }
            }
        }
        .tool-item{
            width: 25%;
            /deep/.el-card__header {
                padding: 0 20px;
                .title {
                    height: 50px;
                    line-height: 50px;
                }
            }
            .content {
                font-size: 0.8rem;
                height: 48px;
            }
            .footer {
                float: right;
                padding-bottom: 20px;
            }
        }
    }
</style>