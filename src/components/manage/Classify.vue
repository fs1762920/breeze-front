<template>
    <div class="classify-main">
        <div class="classify-form-pack">
            <div class="classify-form">
                <div class="title">添加分类</div>
                <div class="body">
                    <el-form ref="classifyForm" :model="classifyInfo" label-width="80px">
                        <el-form-item v-show="false" label="分类id" prop="classifyId">
                            <el-input type="text" v-model="classifyInfo.classifyId" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="分类名称" prop="classifyName">
                            <el-input v-model="classifyInfo.classifyName"></el-input>
                        </el-form-item>
                        <el-form-item label="分类描述" prop="classifyDescribe">
                            <el-input type=textarea v-model="classifyInfo.classifyDescribe"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="small" style="float: right; margin-left: 20px">新增分类</el-button>
                            <el-button type="text" size="small" style="float: right;" @click="resetForm('classifyForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        
        <div class="classify-info-pack">
            <div class="classify-info">
                <div class="title">分类列表</div>
                <div class="body">
                    <el-table
                        :data="classifyList"
                        stripe
                        style="width: 100%">
                        <el-table-column
                            prop="classifyName"
                            label="名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="classifyDescribe"
                            show-overflow-tooltip
                            label="描述"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="启用/禁用">
                            <template slot-scope="scope">
                                <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="updateEnable(scope.row)"
                                    v-model="scope.row.isValid"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="showEditDialog(scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteClassify(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            classifyInfo: {},
            classifyList: [
                {
                    classifyId: 1,
                    classifyName: '阅读',
                    classifyDescribe: '但似乎驱蚊器wneh',
                    isValid: 1
                },
                {
                    classifyId: 2,
                    classifyName: '技术',
                    classifyDescribe: '但似乎驱蚊器wneh',
                    isValid: 1
                },
                {
                    classifyId: 3,
                    classifyName: '杂文',
                    classifyDescribe: '但似乎驱蚊器wneh',
                    isValid: 1
                },
                {
                    classifyId: 4,
                    classifyName: '生活',
                    classifyDescribe: '但似乎驱蚊器asda玩额武器恶趣味131人情味wneh',
                    isValid: 1
                },
                {
                    classifyId: 5,
                    classifyName: '娱乐',
                    classifyDescribe: '但似乎驱蚊器wneh',
                    isValid: 1
                }
            ]
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
    .classify-main {
        min-height: calc(100vh - 100px);
        width: 100%;
        display: flex;
        .classify-form-pack {
            width: 40%;
            .classify-form {
                box-shadow: 1px 1px 8px #c7c7c7;
                width: 100%;
                background-color: #ffffff;
                .title {
                    height: 48px;
                    line-height: 48px;
                    padding: 0 0 0 20px;
                    border-bottom: 1px solid rgb(216, 216, 216);
                }
                .body {
                    padding: 20px;
                }
            }
        }
        .classify-info-pack {
            width: 60%;
            padding-left: 20px;
            height: 48vh;
            .classify-info {
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                box-shadow: 1px 1px 8px #c7c7c7;
                .title {
                    height: 48px;
                    line-height: 48px;
                    padding: 0 0 0 20px;
                    border-bottom: 1px solid rgb(216, 216, 216);
                }
                .body {
                    padding: 20px;
                }
                .page {
                    float: right;
                }
            }
        }
        
    }
</style>