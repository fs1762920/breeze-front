<template>
    <div class="photo-main">
        <el-dialog
            title="图片上传"
            :visible.sync="showUpload"
            width="30%"
            :before-close="handleClose">
            <el-upload
                ref="upload"
                list-type="picture"
                accept=".jpg,.jpeg,.png,.bmp"
                :action="uploadUrl"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                multiple
                :limit=5>
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="upload" :disabled="selectedFile.length==0">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
        <el-drawer
            class="photo-detail"
            title="图片详情"
            :visible.sync="photoDetailShow"
            direction="rtl">
            <div class="photo-overview">
                <div class="photo-cover">
                    <el-image fit="cover" :src="sourceUrlPrefix + currentPhotoInfo.photoPath"></el-image>
                </div>
                <el-divider></el-divider>
                <div class="photo-info">
                    <div class="photo-info-item">图片名称:&nbsp;&nbsp;{{currentPhotoInfo.displayName}}</div>
                    <div class="photo-info-item">图片类型:&nbsp;&nbsp;{{currentPhotoInfo.mimeType}}</div>
                    <div class="photo-info-item">图片大小:&nbsp;&nbsp;{{change(currentPhotoInfo.size)}}</div>
                    <div class="photo-info-item">图片尺寸:&nbsp;&nbsp;{{currentPhotoInfo.width + '×' + currentPhotoInfo.height}}</div>
                    <div class="photo-info-item">上传日期:&nbsp;&nbsp;{{dateFormat(currentPhotoInfo.ctime)}}</div>
                    <div class="photo-info-item">图片链接:&nbsp;&nbsp;<a :href="sourceUrlPrefix + currentPhotoInfo.photoPath" target="_blank">{{currentPhotoInfo.photoPath}}</a></div>
                </div>
            </div>
        </el-drawer>
        <div class="btn-group">
            <el-button size="small" type="primary" icon="el-icon-upload2" @click="showUpload = true">上传</el-button>
            <el-button size="small" v-if="batchOperated" :disabled="photoIds.length === 0" type="danger" icon="el-icon-delete" @click="deleteBatch()">删除</el-button>
            <el-button size="small" v-if="batchOperated" icon="el-icon-upload2" @click="cancel">取消</el-button>
            <el-button size="small" v-else icon="el-icon-edit-outline" @click="batchOperated = !batchOperated">批量操作</el-button>
        </div>
        <div class="photo-list">
            <el-checkbox-group v-model="photoIds">
                <div class="photo-item" v-for="(item, index) in photoList" :key="index">
                    <el-checkbox v-if="batchOperated" :label="item.photoId"></el-checkbox>
                    <div class="photo-item-body" @click="showDetail(item)">
                        <el-image fit="cover" :src="sourceUrlPrefix + item.photoPath"></el-image>
                    </div>
                    <div class="photo-item-title">{{item.displayName}}</div>
                </div>
            </el-checkbox-group>
        </div>
        <div class="photo-page">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="toPage"
                @prev-click="toPage"
                @next-click="toPage"
                :total="total"
                :page-size="pageSize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            uploadUrl: process.env.BASE_URL + '/file/upload',
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            photoList: [],
            total: 0,
            pageSize: 8,
            currentPhotoInfo: {},
            photoIds: [],
            batchOperated: false,
            photoDetailShow: false,
            selectedFile: [],
            fileList: [],
            showUpload: false
        }
    },
    mounted() {
        this.toPage(1)
    },
    methods: {
        loadData(param) {
            $get("/photo/findByPage", param).then(res=>{
                console.log("请求结果: ", res)
                if(res.code === 100) {
                    this.photoList = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            });
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadData(param)
        },
        deleteBatch() {
            console.log(JSON.stringify(this.photoIds))
            let param = {
                photoIds: this.photoIds
            }
            $get("/photo/deleteBatch", param).then(res=>{
                if(res.code === 100) {
                    this.batchOperated = false
                    this.photoIds = []
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            });
        },
        showDetail(photoInfo) {
            this.currentPhotoInfo = photoInfo
            this.photoDetailShow = true
        },
        cancel() {
            this.batchOperated = false
            this.photoIds = []
        },
        handleClose(){
            this.selectedFile = []
            this.showUpload = false
        },
        handleChange(file, fileList) {
            this.selectedFile.push(file.raw)
        },
        handleRemove(file) {
            console.log("删除前文件数量:"+this.selectedFile.length)
            this.selectedFile.splice(this.fileList.indexOf(file), 1)
            console.log("删除后文件数量:"+this.selectedFile.length)
        },
        upload() {
            let param = new FormData()
            this.selectedFile.forEach(item => {
                param.append("files", item)
            })
            this.showUpload = false
            this.fileList = []
            this.selectedFile = []
            $post("/photo/upload", param).then(res=>{
                if(res.code === 100) {
                    this.showUpload = false
                    this.$message.success(res.msg)
                    this.fileList = []
                    this.selectedFile = []
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            });
        },
        dateFormat(date){
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
        change(limit){
            let size = "";
            if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
                size = limit.toFixed(2) + "B"
            }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
                size = (limit/1024).toFixed(2) + "KB"
            }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
                size = (limit/(1024 * 1024)).toFixed(2) + "MB"
            }else{                                            //其他转化成GB
                size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
            }

            var sizeStr = size + "";                        //转成字符串
            var index = sizeStr.indexOf(".");                    //获取小数点处的索引
            var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
            if(dou == "00"){                                //判断后两位是否为00，如果是则删除00                
                return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
            }
            return size;
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
            height: 30vw;
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
            margin-top: 20px;
            float: right;
        }
    }
</style>