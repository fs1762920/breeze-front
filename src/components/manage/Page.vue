<template>
    <div class="page-main">
        <div class="head">
            <el-button type="primary">发布页面</el-button>
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
export default {
    data() {
        return {
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
            aboutInfo: {}
        }
    },
    methods: {
        change(value, render) {
            this.blogInfo.content = value
            this.blogInfo.htmlContent = render
        },
        //上传图片接口pos 表示第几个图片 
        handleEditorImgAdd(pos , $file){
            // let formdata = new FormData();
            // formdata.append('files' , $file);
            // $post('/file/uploadImg', formdata).then(res=>{
            //     if(res.code === 100) {
            //         let url = res.data[0].filePath;
            //         this.$refs.md.$img2Url(pos, url);
            //     } else {
            //         this.$message("上传失败,"+res.msg)
            //     }
            // }).catch(error => {
            //     this.$message("无法连接到服务器")
            // })
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