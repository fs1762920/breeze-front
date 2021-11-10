<template>
    <div class="page-main">
        <div class="head">
            <el-button type="primary" @click="publish">发布页面</el-button>
        </div>
        <mavon-editor  
            :toolbars="toolbars"
            style="height: calc(100vh - 150px);"
            v-model="aboutInfo.content"
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
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
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
            aboutInfo: {
                content: '',
                htmlContent: ''
            }
        }
    },
    mounted() {
        let param = {
            pageCode: 'about'
        }
        this.loadData(param)
    },
    methods: {
        loadData(param){
            $get('/page/find', param).then(res=>{
                if(res.code === 100) {
                    if (res.data) {
                        this.aboutInfo.content = res.data.markdownContent
                        this.aboutInfo.htmlContent = res.data.htmlContent
                    }
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message("无法连接到服务器")
            })
        },
        change(value, render) {
            this.aboutInfo.content = value
            this.aboutInfo.htmlContent = render
        },
        publish() {
            let param = {
                pageCode: 'about',
                markdownContent: this.aboutInfo.content,
                htmlContent: this.aboutInfo.htmlContent
            }
            $post('/page/save', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message("无法连接到服务器")
            })
        },
        //上传图片接口pos 表示第几个图片 
        handleEditorImgAdd(pos , $file){
            console.log("pos:", pos)
            let formdata = new FormData();
            formdata.append('file' , $file);
            $post('/file/upload', formdata).then(res=>{
                if(res.code === 100) {
                    let url = this.sourceUrlPrefix + res.data;
                    console.log("url:", url)
                    this.$refs.md.$img2Url(pos, url);
                } else {
                    this.$message.error("上传失败,"+res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
    }
}
</script>
<style lang="less" scoped>
    .page-main {
        .markdown-body {
            margin-top: 10px;
        }
    }
</style>