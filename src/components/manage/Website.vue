<template>
    <div class="website-main">
        <div class="website-overview">
            <div class="title">环境信息</div>
            <el-divider></el-divider>
            <div class="website-info">
                <div class="website-info-item">版本:&nbsp;&nbsp;1.0.0</div>
                <div class="website-info-item">数据库:&nbsp;&nbsp;5.7.22 MySQL Community Server (GPL)</div>
                <div class="website-info-item">运行模式:&nbsp;&nbsp;production</div>
                <div class="website-info-item">启动时间:&nbsp;&nbsp;2021-08-19 16:10:21</div>
            </div>
            <el-divider></el-divider>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .website-main {
        min-height: calc(100vh - 100px);
        .website-overview {
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 1px 1px 8px #c7c7c7;
            border-radius: 4px;
            .title {
                padding-left: 20px;
                padding-top: 20px;
            }
            .website-info {
                padding-left: 20px;
                .website-info-item {
                    height: 30px;
                    line-height: 30px;
                    font-size: 0.8rem;
                }
            }
        }
    }
</style>