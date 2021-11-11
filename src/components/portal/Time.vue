<template>
    <div class="time-main">
        <div class="timeline">
            <vue-timeline-update v-for="(item, index) in blogList" :key="index" @click="blogOverview(item.blogId)"
                :date="new Date(item.mtime)"
                :title="item.title"
                :thumbnail="sourceUrlPrefix + item.cover"
                :category="item.classifyEntity.classifyName"
                icon="code"
                theme="light"
                color="orange"
                :is-last="index === blogList.length-1"
            />
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data(){
        return {
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            blogList: [],
            total: 0,
            pageSize: 5
        }
    },
    mounted() {
        this.toPage(1)
    },
    methods: {
        blogOverview(id) {
            let param = {
                path: '/portal/view',
                query: {
                    blogId: id
                }
            }
            this.$router.push(param)
        },
        loadData(param) {
            $get("/blog/findByPage", param).then(res=>{
                if(res.code === 100) {
                    this.blogList = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadData(param)
        }
    }
}
</script>
<style lang="less" scoped>
    .time-main {
        background-color: rgba(255, 255, 255);
        border-radius: 4px;
        padding: 40px;
        margin-top: 20px;
        .timeline {
            min-height: 80vh;
            padding-bottom: 80px;
            cursor: pointer;
            /deep/.gb-vue-timeline-update__title {
                overflow:hidden;  //超出部分隐藏
                text-overflow:ellipsis;  //超出部分显示...
                white-space:nowrap;  //文本强制一行显示 
                width: 70%;
            }
            /deep/.gb-vue-timeline-update__thumbnail {
                border: none!important
            }
            /deep/.gb-vue-timeline-update__right {
                width: 20vw;
            }
        }
    }
</style>