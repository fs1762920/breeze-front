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
        <div class=load-more>
            <el-button class="load" v-if="hasNextPage" type="primary" @click="loadMore">点击加载更多</el-button>
            <div class="nomore" v-else>没有更多了...</div>
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
            currentPage: 1,
            total: 0,
            pageSize: 5,
            hasNextPage: false
        }
    },
    mounted() {
        this.toPage(this.currentPage)
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
                    this.blogList = this.blogList.concat(res.data.list)
                    this.total = res.data.total
                    this.hasNextPage = res.data.hasNextPage
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadMore() {
            if (this.hasNextPage) {
                this.currentPage += 1
                this.toPage(this.currentPage)
            }
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
            // min-height: 80vh;
            padding-bottom: 20px;
            cursor: pointer;
            /deep/.gb-vue-timeline-update__title {
                overflow:hidden;  //超出部分隐藏
                text-overflow:ellipsis;  //超出部分显示...
                white-space:nowrap;  //文本强制一行显示 
                width: 70%;
            }
            /deep/.gb-vue-timeline-update__thumbnail {
                border: none!important;
                width: 100%;
                height: calc(20vw * 0.75);
                object-fit: cover;
            }
            /deep/.gb-vue-timeline-update__right {
                width: 20vw;
            }
        }
        .load-more {
            width: 60%;
            margin-left: 40%;
            margin-top: 40px;
            .el-button {
                border-radius: 20px;
                border: none;
                width: 40%;
                
                box-shadow: 1px 1px 4px 1px #dddddd;
                margin: 0 auto
            }
            .el-button--primary {
                border-color: white;
                background-image: linear-gradient(to right, rgb(87, 146, 255) , rgb(188, 208, 252));
                color: #FFF;
            }
            .load:hover {
                background-image: linear-gradient(to right, rgb(154, 154, 255) , rgb(209, 209, 255));
                color: #FFF;
            }
            .nomore {
                color: #cccccc
            }
        }
    }
</style>