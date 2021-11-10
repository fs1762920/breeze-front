<template>
    <div class="essay-main">
        <div class="search-group">
            <el-form ref="blogForm" :model="blogInfo" label-width="80px">
                <el-row>
                    <el-col span="6">
                        <el-form-item label="文章标题" prop="title">
                            <el-input v-model="blogInfo.title" style="width: 80%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col span="6">
                        <el-form-item label="文章状态" prop="status">
                            <el-select v-model="blogInfo.status" style="width: 80%" placeholder="请选择">
                                <el-option label="已发布" :value="1"></el-option>
                                <el-option label="草稿" :value="2"></el-option>
                                <el-option label="回收站" :value="3"></el-option>
                                <el-option label="私密" :value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col span="6">
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
                    <el-col span="6">
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
                    </el-table-column>
                    <el-table-column
                        prop="classifyName"
                        align="center"
                        label="分类"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="labelName"
                        align="center"
                        label="标签"
                        min-width="240">
                    </el-table-column>
                    <el-table-column
                        prop="visitCount"
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
                            <el-button
                                size="mini"
                                type="text"
                                @click="deleteClassify(scope.row)">回收站</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="essay-page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            blogInfo: {},
            classifyList: [
                {
                    classifyId: 1,
                    classifyName: '技术'
                },
                {
                    classifyId: 2,
                    classifyName: '阅读'
                },
                {
                    classifyId: 3,
                    classifyName: '杂文'
                },
                {
                    classifyId: 4,
                    classifyName: '生活'
                }
            ],
            blogList: [
                {
                    blogId: 1,
                    title: '《资本论》'
                }
            ]
        }
    },
    methods: {
        toEdit(blogInfo) {
            this.$router.push({ name: 'compose', params: { blogId: blogInfo.blogId }});
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
        }
        .essay-page {
            padding: 20px;
            float: right;
        }
    }
</style>