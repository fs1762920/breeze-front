<template>
    <div class="picture-main">
        <div class="picture-list infinite-list">
            <div class="picture-item" v-for="(item, index) in photoList" :key="index" @mouseover="photoInfoShowIndex = index" @mouseout="photoInfoShowIndex = null">
                <el-image fit="cover" :src="sourceUrlPrefix + item.photoPath" :preview-src-list="previewList"></el-image>
                <div v-show="photoInfoShowIndex === index" class="info">{{item.width + '×' + item.height}}</div>
            </div>
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
    data() {
        return {
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            photoList: [],
            previewList: [],
            pageSize: 8,
            currentPage: 1,
            hasNextPage: true,
            photoInfoShowIndex: null
        }
    },
    mounted() {
        this.toPage(this.currentPage)
    },
    methods: {
        loadData(param) {
            $get("/photo/findByPage", param).then(res=>{
                if(res.code === 100) {
                    this.photoList = this.photoList.concat(res.data.list)
                    this.hasNextPage = res.data.hasNextPage
                    this.loadPreviewList(res.data.list)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器!")
            })
        },
        loadPreviewList(photoList){
            for(var i=0;i<photoList.length;i++) {
                this.previewList.push(this.sourceUrlPrefix + photoList[i].photoPath)
            }
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
    .picture-main {
        padding: 20px;
        background-color: #ffffff;
        border-radius: 4px;
        margin-top: 20px;
        box-shadow: 1px 1px 8px #c7c7c7;
        min-height: 60vh;
        .picture-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .picture-item {
                width: 48%;
                height: 10vw;
                margin: 1%;
                /deep/.el-image { 
                    border-radius: 4px;
                    height: 100%;
                    width: 100%;
                    padding: 0;
                }
                .info {
                    position: relative;
                    font-size: 0.8rem;
                    text-align: center;
                    color: #ffffff;
                    height: 26px;
                    line-height: 26px;
                    margin-top: -30px;
                    background-color: rgba(44, 44, 44, 0.6);
                    border-radius: 0 0 4px 4px;
                    
                }
            }
        }
        .load-more {
            width: 60%;
            margin-left: 40%;
            margin-top: 20px;
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