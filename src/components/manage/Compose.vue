<template>
    <div class="compose-main">
        <el-drawer
            class="essay-setting"
            title="文章设置"
            :visible.sync="essaySettingShow"
            direction="rtl">
            <el-form ref="blogForm" :model="blogInfo" label-width="80px">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="blogInfo.title"></el-input>
                </el-form-item>
                <el-form-item label="开启评论" prop="commented">
                    <el-radio-group v-model="blogInfo.commented">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="0">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否置顶" prop="topped">
                    <el-radio-group v-model="blogInfo.topped">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="标签" prop="labelIds">
                    <el-select v-model="blogInfo.labelIds" multiple :multiple-limit="3" style="width: 100%" placeholder="请选择">
                        <el-option
                            v-for="item in labelList"
                            :key="item.labelId"
                            :label="item.labelName"
                            :value="item.labelId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章分类" prop="classifyId">
                    <el-select v-model="blogInfo.classifyId" style="width: 100%" placeholder="请选择">
                        <el-option
                            v-for="item in classifyList"
                            :key="item.classifyId"
                            :label="item.classifyName"
                            :value="item.classifyId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="摘要" prop="summary">
                    <el-input type="textarea" :rows="5" v-model="blogInfo.summary"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="header"
                        :show-file-list="false"
                        :on-success="uploadCoverSuccess">
                        <img v-if="blogInfo.cover" :src="sourceUrlPrefix + blogInfo.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="float: right; margin-left: 10px" @click="publish">发 布</el-button>
                    <el-button type="danger" style="float: right" :disabled="this.$route.params && this.$route.params.blogId >= -1" @click="save">保存草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <div class="head">
            <el-input v-model="blogInfo.title" style="width: 100%" placeholder="文章标题"></el-input>
            <el-button type="primary" @click="showEssaySetting()">发布文章</el-button>
        </div>
        <mavon-editor  
            :toolbars="toolbars"
            style="height: calc(100vh - 150px);"
            v-model="blogInfo.markdownContent"
            @change="change"
            @imgAdd="handleEditorImgAdd"
            ref='md'>
        </mavon-editor>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            uploadUrl: process.env.BASE_URL + '/file/upload',
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            header: {
                satoken: "Bearer " + localStorage.getItem('satoken')
            },
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            blogInfo: {
                labelIds: [],
                commented: 1,
                topped: 0,
                cover: null
            },
            essaySettingShow: false,
            labelList: [],
            classifyList: []
        }
    },
    mounted() {
        console.log("param: ", JSON.stringify(this.$route.params))
        if(this.$route.params && this.$route.params.blogId) {
            this.loadBlogInfo(this.$route.params.blogId)
        }
        this.loadClassifyList()
        this.loadLabelList()
    },
    methods: {
        loadBlogInfo(blogId) {
            let param = {
                blogId: blogId
            }
            $get('/blog/findOne', param).then(res=>{
                if(res.code === 100) {
                    this.blogInfo = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        loadClassifyList() {
            $get('/classify/find', null).then(res=>{
                if(res.code === 100) {
                    this.classifyList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        loadLabelList() {
            $get('/label/find', null).then(res=>{
                if(res.code === 100) {
                    this.labelList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        showEssaySetting() {
            this.essaySettingShow = true
        },
        change(value, render) {
            this.blogInfo.markdownContent = value
            this.blogInfo.htmlContent = render
        },
        //上传图片接口pos 表示第几个图片 
        handleEditorImgAdd(pos , $file){
            let formdata = new FormData();
            formdata.append('file' , $file);
            $post('/file/upload', formdata).then(res=>{
                if(res.code === 100) {
                    let url = this.sourceUrlPrefix + res.data;
                    this.$refs.md.$img2Url(pos, url);
                } else {
                    this.$message.error("上传失败,"+res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        uploadCoverSuccess(res) {
            this.blogInfo.cover = res.data
        },
        save() {
            this.blogInfo.status = 0
            $post('/blog/save', this.blogInfo).then(res=>{
                if(res.code === 100) {
                    this.$message.success("暂存成功")
                    this.essaySettingShow = false
                } else {
                    this.$message.error("暂存失败")
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        publish() {
            this.blogInfo.status = 1
            $post('/blog/save', this.blogInfo).then(res=>{
                if(res.code === 100) {
                    this.$message.success("发布成功")
                    this.essaySettingShow = false
                } else {
                    this.$message.error("发布失败")
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .compose-main {
        .essay-setting {
            /deep/.el-drawer__header {
                padding: 0 20px 0 20px;
                height: 48px;
                line-height: 48px;
                margin: 0;
                border-bottom: 1px solid rgb(216, 216, 216);
            }
            /deep/.el-drawer__body {
                padding: 20px;
                .avatar-uploader .el-upload {
                    border: 1px dashed #c0c0c0;
                    border-radius: 6px;
                    width: 100%;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .avatar-uploader .el-upload:hover {
                    border-color: #409EFF;
                    width: 100%;
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 100%;
                    height: 240px;
                    line-height: 240px;
                    text-align: center;
                }
                .avatar {
                    width: 100%;
                    height: 240px;
                    display: block;
                }
            }
            
        }
        .head {
            display: flex;
            .el-button {
                margin-left: 10px;
            }
        }
        .markdown-body {
            margin-top: 10px;
        }
    }
</style>