<template>
    <div class="essay-main">
        <div class="search-group">
            <el-form ref="blogForm" :model="blogInfo" label-width="80px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="文章标题" prop="title">
                            <el-input v-model="blogInfo.title" style="width: 80%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="文章状态" prop="status">
                            <el-select v-model="blogInfo.status" style="width: 80%" placeholder="请选择">
                                <el-option label="草稿" :value="0"></el-option>
                                <el-option label="已发布" :value="1"></el-option>
                                <el-option label="回收站" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="文章分类" prop="classifyId">
                            <el-select v-model="blogInfo.classifyId" style="width: 80%" placeholder="请选择">
                                <el-option
                                    v-for="item in classifyList"
                                    :key="item.classifyId"
                                    :label="item.classifyName"
                                    :value="item.classifyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                            <el-button style="margin-left: 10px;">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="essay-body">
            <div class="essay-table">
                <el-table
                    :data="blogList"
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        prop="title"
                        align="center"
                        show-overflow-tooltip
                        label="标题"
                        min-width="300">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        align="center"
                        label="状态"
                        width="180">
                        <template slot-scope="scope">
                            <div v-if="scope.row.status === 0">
                                <div class="circle" style="background-color: orange"></div><span>草稿</span>
                            </div>
                            <div v-else-if="scope.row.status === 1">
                                <div class="circle" style="background-color: yellowgreen"></div><span>已发布</span>
                            </div>
                            <div v-else>
                                <div class="circle" style="background-color: red"></div><span>回收站</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="classifyEntity.classifyName"
                        align="center"
                        label="分类"
                        width="180">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="labelName"
                        align="center"
                        label="标签"
                        min-width="240">
                    </el-table-column> -->
                    <el-table-column
                        prop="readingCount"
                        align="center"
                        label="阅读量"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="commentCount"
                        align="center"
                        label="评论量"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="mtime"
                        :formatter="dateFormat"
                        align="center"
                        label="发布时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        align="center">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="text"
                                @click="toEdit(scope.row)">编辑</el-button>
                            <el-button v-if="scope.row.status === 1"
                                size="mini"
                                type="text"
                                @click="moveBlog(scope.row)">回收站</el-button>
                            <el-button v-else
                                size="mini"
                                type="text"
                                @click="deleteBlog(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="essay-page">
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
        return {
            blogInfo: {},
            classifyList: [],
            blogList: [],
            total: 0,
            currentPage: 1,
            pageSize: 10
        }
    },
    mounted() {
        this.loadClassifyList()
        this.toPage(1)
    },
    methods: {
        loadData(param) {
            $get('/blog/findByPageBackend', param).then(res=>{
                if(res.code === 100) {
                    this.blogList = res.data.list
                    this.total = res.data.total
                    this.currentPage = res.data.pageNum
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
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadData(param)
        },
        toEdit(blogInfo) {
            this.$router.push({ name: 'compose', params: { blogId: blogInfo.blogId }});
        },
        moveBlog(blogInfo) {
            let param = {
                blogId: blogInfo.blogId
            }
            $get('/blog/move', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        deleteBlog(blogInfo) {
            let param = {
                blogId: blogInfo.blogId
            }
            $get('/blog/delete', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        dateFormat(row, column, cellValue){
            return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}
</script>
<style lang="less" scoped>
    .essay-main {
        min-height: calc(100vh - 100px);
        background-color: white;
        box-shadow: 1px 1px 8px #c7c7c7;
        border-radius: 4px;
        .search-group {
            padding: 20px
        }
        .essay-body {
            padding: 20px;
            .circle {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
            }
        }
        .essay-page {
            padding: 20px;
            float: right;
        }
    }
</style>