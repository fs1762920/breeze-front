<template>
    <div class="music-main">
        <el-dialog
            title="歌词"
            class="lyric-dialog"
            :visible.sync="lyricShow"
            width="30%">
            <div class="lyric-content">
                <template v-if="currentLyric">
                    {{currentLyric}}
                </template>
                <template v-else>
                    <el-empty description="暂无歌词"></el-empty>
                </template>
            </div>
        </el-dialog>
        <el-dialog
            title="上传音乐"
            :visible.sync="uploadShow"
            width="30%"
            @close="resetForm('musicForm')">
            <el-form class="music-form" :model="musicInfo" status-icon :rules="rules" ref="musicForm" label-width="40px">
                <el-form-item label="歌词" prop="lyric">
                    <el-input type="textarea" v-model="musicInfo.lyric" maxlength="4000" rows="4" autocomplete="off" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="音乐" prop="file">
                    <el-upload
                        :limit="1"
                        drag
                        name="file"
                        action=""
                        :data="musicInfo"
                        accept=".mp3,.flac"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        ref="uploadFile"
                        :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传mp3文件，且不超过50mb</div>
                    </el-upload>
                    <el-input v-show="false" v-model="musicInfo.file" type="file" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save('musicForm')" :loading="uploading">{{uploading? "上传中" : "提交"}}</el-button>
                    <el-button @click="resetForm('musicForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="music-body">
            <div class="music-operate">
                <el-button size="small" type="success" @click="showUploadDialog">上传音乐</el-button>
            </div>
            <div class="music-table">
                <el-table
                    :data="musicList"
                    style="width: 100%">
                    <el-table-column
                        label="标题"
                        align="center"
                        show-overflow-tooltip
                        prop="title"
                        width="320">
                    </el-table-column>
                    <el-table-column
                        label="作者"
                        align="center"
                        show-overflow-tooltip
                        prop="artist"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        label="专辑"
                        align="center"
                        show-overflow-tooltip
                        prop="album"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="时长"
                        align="center"
                        :formatter="durationFormat"
                        prop="duration"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="大小"
                        :formatter="sizeFormat"
                        align="center"
                        prop="size"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="添加时间"
                        :formatter="dateFormat"
                        align="center"
                        prop="ctime"
                        width="240">
                    </el-table-column>
                    <el-table-column
                        label="修改时间"
                        :formatter="dateFormat"
                        align="center"
                        prop="mtime"
                        width="240">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="viewLyric(scope.row)">预览歌词</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteMusic(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="music-page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="toPage"
                    @prev-click="toPage"
                    @next-click="toPage"
                    :total="total"
                    :current-page="currentPage"
                    :page-size="pageSize">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        var checkFile = (rule, value, callback) => {
            if(this.selectedFile){
                callback();
            } else {
                return callback(new Error("请选择音乐文件"));
            }
        };
        return {
            musicInfo: {},
            rules: {
                lyric: [
                    { max: 4000, message: "长度不能超过4000", trigger: "blur" }
                ],
                file: [
                    { validator: checkFile, trigger: 'blur'}
                ]
            },
            musicList: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            uploadShow: false,
            selectedFile: null,
            fileList: [],
            lyricShow: false,
            currentLyric: '',
            uploading: false
        }
    },
    mounted() {
        this.toPage(1)
    },
    methods: {
        loadMusicList(param) {
            $get('/music/findByPage', param).then(res=>{
                if(res.code === 100) {
                    this.musicList = res.data.list
                    this.total = res.data.total
                    this.currentPage = res.data.pageNum
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadMusicList(param)
        },
        showUploadDialog() {
            this.uploadShow = true
        },
        handleChange(file, fileList) {
            this.selectedFile = file.raw
        },
        handleRemove(file) {
            this.fileList.splice(this.fileList.indexOf(file), 1)
        },
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    this.uploading = true
                    let param = new FormData()
                    if (this.musicInfo.lyric) {
                        param.append("lyric", this.musicInfo.lyric)
                    }
                    param.append("file", this.selectedFile)
                    $post('/music/save', param).then(res=>{
                        if(res.code === 100) {
                            this.$message.success(res.msg)
                            this.uploadShow = false
                            this.toPage(1)
                        } else {
                            this.$message.error(res.msg)
                        }
                        this.uploading = false
                    }).catch(error => {
                        this.uploading = false
                        this.$message.error("无法连接到服务器")
                    })
                } else {
                    return false
                }
            })
        },
        deleteMusic(row) {
            let musicId = row.musicId;
            this.$confirm('是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $get("/music/delete?musicId="+musicId, null).then(res=>{
                    if(res.code === 100) {
                        this.$message.success(res.msg)
                        this.toPage(1)
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(error => {
                    this.$message.error("无法连接到服务器")
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        viewLyric(row) {
            this.currentLyric = row.lyric
            this.lyricShow = true
        },
        resetForm() {
            this.selectedFile = null
            this.fileList = []
            this.musicInfo = {}
        },
        dateFormat(row, column){
            let date = row[column.property];
            return this.$moment(date).format("YYYY-MM-DD HH:mm:ss")
        },
        durationFormat(row, column){
            let duration = row[column.property];
            return (duration/60).toFixed(0)+":"+((duration%60).toString().length===1?("0"+(duration%60)):(duration%60))
        },
        sizeFormat(row, column){
            let duration = row[column.property];
            return (duration/1024/1024).toFixed(1)+"MB"
        }
    }
}
</script>
<style lang="less" scoped>
    .music-main {
        min-height: calc(100vh - 100px);
        background-color: white;
        box-shadow: 1px 1px 8px #c7c7c7;
        border-radius: 4px;
        /deep/.lyric-dialog {
            .el-dialog__body {
                padding: 30px 0;
                .lyric-content {
                    padding: 0 30px;
                    line-height: 30px;
                    white-space: pre-line;
                    height: 36vh;
                    overflow:auto;
                    &::-webkit-scrollbar {/*滚动条整体样式*/
                        width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 1px;
                    }
                    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        border-radius: 3px;
                        background-color: rgb(184, 184, 184);
                    }
                    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        background: #ffffff;
                    }
                }
            }
        }
        
        .music-form {
            padding: 0 20px;
            /deep/.el-upload {
                width: 100%;
                .el-upload-dragger {
                    width: 100%;
                }
            }
        }
        .music-body {
            padding: 20px;
        }
        .music-page {
            padding: 20px;
            float: right;
        }
    }
</style>