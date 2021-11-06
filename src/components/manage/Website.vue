<template>
    <div class="website-main">
        <div class="website-overview">
            <div class="title">环境信息</div>
            <el-divider></el-divider>
            <div class="website-info">
                <div class="website-info-item">版本:&nbsp;&nbsp;1.0.0</div>
                <div class="website-info-item">数据库:&nbsp;&nbsp;8.0.17 MySQL Community Server (GPL)</div>
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
        height: 100vh;
        .website-overview {
            padding: 20px;
            background-color: #ffffff;
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