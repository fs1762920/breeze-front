<template>
    <div class="home-main">
        <div v-if="blogList.length === 0">
            <el-empty description="暂无相关文章"></el-empty>
        </div>
        <div v-else class="essay-item" v-for="(item, index) in blogList" :key="index">
            <div class="cover">
                <el-image fit="cover" :src="sourceUrlPrefix + item.cover">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
            <div class="info">
                <div class="date">
                    <span>{{dateFormat(item.mtime)}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span><el-tag size="mini">{{item.classifyEntity.classifyName}}</el-tag></span>
                </div>
                <div class="title">
                    {{item.title}}
                </div>
                <div class="description">
                    {{item.summary}}
                </div>
                <div class="read">
                    <el-button type="info" size="small" plain @click="blogOverview(item.blogId)">阅读更多</el-button>
                </div>
            </div>
        </div>
        <div class="page-group">
            <el-pagination
                background
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
            sourceUrlPrefix: process.env.SOURCE_BASE_URL,
            blogList: [],
            queryParam: {},
            total: 0,
            pageSize: 5
         }
    },
    mounted() {
        this.$set(this.queryParam, 'pageNum', 1)
        this.$set(this.queryParam, 'pageSize', 5)
        if (this.$route.query.classifyId) {
            this.$set(this.queryParam, 'classifyId', this.$route.query.classifyId)
        }
        if (this.$route.query.labelId) {
            this.$set(this.queryParam, 'labelId', this.$route.query.labelId)
        }
        this.loadData(this.queryParam)
    },
    methods: {
        blogOverview(blogId) {
            this.$router.push({
                path: '/portal/view',
                query: {
                    blogId: blogId
                }
            })
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
        },
        dateFormat(date){
            return this.$moment(date).format("YYYY-MM-DD")
        }
    }
}
</script>
<style lang="less" scoped>
    .home-main {
        .essay-item {
            margin-top: 20px;
            background-color: #ffffff;
            border-radius: 4px;
            box-shadow: 1px 1px 8px #c7c7c7;
            .cover {
                height: 18vw;
                cursor: pointer;
                .el-image {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px 4px 0 0;
                }
            }
            .info {
                padding: 20px 30px 20px 30px;
                .date {
                    font-size: 0.8rem;
                    color: #868686;
                }
                .title {
                    font-size: 1.8rem;
                    text-align: center;
                    height: 48px;
                    line-height: 48px;
                    color: #505050;
                    white-space: nowrap;   //规定段落中的文本不进行换行
                    text-overflow:ellipsis;
                    overflow:hidden;
                    &:hover {
                        color: rgb(151, 151, 255);
                        cursor: pointer;
                    }
                }
                .description {
                    height: 84px;
                    margin-top: 8px;
                    line-height: 28px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                .read {
                    margin-top: 20px;
                    .el-button {
                        border: none;
                    }
                }
            }
        }
        .page-group {
            margin-top: 20px;
        }
    }
</style>