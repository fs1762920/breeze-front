<template>
    <div class="photo-main">
        <el-drawer
            class="photo-detail"
            title="图片详情"
            :visible.sync="photoDetailShow"
            direction="rtl">
            <div class="photo-overview">
                <div class="photo-cover">
                    <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                </div>
                <el-divider></el-divider>
                <div class="photo-info">
                    <div class="photo-info-item">图片名称:&nbsp;&nbsp;4d3ea53c084bad6931a56d5158a48</div>
                    <div class="photo-info-item">图片类型:&nbsp;&nbsp;image/png</div>
                    <div class="photo-info-item">图片大小:&nbsp;&nbsp;61.00 KB</div>
                    <div class="photo-info-item">图片尺寸:&nbsp;&nbsp;2362x2362</div>
                    <div class="photo-info-item">上传日期:&nbsp;&nbsp;2021-02-21</div>
                    <div class="photo-info-item">图片链接:&nbsp;&nbsp;<a href="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg</a></div>
                </div>
            </div>
        </el-drawer>
        <div class="btn-group">
            <el-button size="small" type="primary" icon="el-icon-upload2">上传</el-button>
            <el-button size="small" v-if="batchOperated" :disabled="photoIds.length === 0" type="danger" icon="el-icon-delete" @click="deleteBatch()">删除</el-button>
            <el-button size="small" v-if="batchOperated" icon="el-icon-upload2" @click="cancel">取消</el-button>
            <el-button size="small" v-else icon="el-icon-edit-outline" @click="batchOperated = !batchOperated">批量操作</el-button>
        </div>
        <div class="photo-list">
            <el-checkbox-group v-model="photoIds">
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="1"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="2"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="3"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" :src="require('../../assets/wallhaven-3z9lp6.jpg')"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="4"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="5"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="6"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="7"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
                <div class="photo-item">
                    <el-checkbox v-if="batchOperated" :label="8"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail">
                        <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
                    </div>
                    <div class="photo-item-title">《毛选》（卷一） 001中国社会各阶级的分析《毛选》（卷一） 001中国社会各阶级的分析</div>
                </div>
            </el-checkbox-group>
            
        </div>
        <div class="photo-page">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            photoIds: [],
            batchOperated: false,
            photoDetailShow: false
        }
    },
    methods: {
        deleteBatch() {
            console.log(JSON.stringify(this.photoIds))
            this.batchOperated = false
            this.photoIds = []
        },
        showDetail() {
            this.photoDetailShow = true
        },
        cancel() {
            this.batchOperated = false
            this.photoIds = []
        }
    }
}
</script>
<style lang="less" scoped>
    .photo-main {
        min-height: calc(100vh - 100px);
        .photo-detail {
            /deep/.el-drawer__header {
                padding: 0 20px 0 20px;
                height: 48px;
                line-height: 48px;
                margin: 0;
                border-bottom: 1px solid rgb(216, 216, 216);
            }
            .photo-overview {
                padding: 20px;
                .photo-cover {
                    width: 100%;
                }
                .photo-info {
                    .photo-info-item {
                        height: 40px;
                        line-height: 40px;
                        font-size: 0.8rem;
                        // display: flex;
                        word-wrap: break-word;
                        word-break: break-all;
                        overflow: hidden;
                        &:nth-child(n+2) {
                            border-top: 1px solid rgb(228, 228, 228);
                        }
                    }
                }
            }
        }
        .btn-group {
            padding: 20px;
            background-color: #ffffff;
        }
        .photo-list {
            min-height: 64vh;
            .photo-item {
                width: 24%;
                float: left;
                padding: 0.5%;
                height: 13.5vw;
                margin-bottom: 10px;
                cursor: pointer;
                .el-checkbox {
                    position: absolute;
                    margin-left: 4px;
                }
                .photo-item-body {
                    height: 90%;
                    box-shadow: 1px 1px 8px #c7c7c7;
                    .el-image {
                        width: 100%;
                        height: 100%;
                        border-radius: 4px 4px 0 0;
                    }
                }
                .photo-item-title {
                    box-shadow: 1px 1px 8px #c7c7c7;
                    border-radius: 0 0 4px 4px;
                    background-color: #ffffff;
                    height: 40px;
                    line-height: 40px;
                    font-size: 0.8rem;
                    padding: 0 10px;
                    text-align: center;
                    white-space: nowrap;   //规定段落中的文本不进行换行
                    text-overflow:ellipsis;
                    overflow:hidden;
                }
            }
        }
        .photo-page {
            float: right;
        }
    }
</style>