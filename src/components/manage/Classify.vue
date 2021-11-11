<template>
    <div class="classify-main">
        <div class="classify-form-pack">
            <div class="classify-form">
                <div class="title">添加分类</div>
                <div class="body">
                    <el-form ref="classifyForm" :model="classifyInfo" :rules="rules" label-width="80px">
                        <el-form-item v-show="false" label="分类id" prop="classifyId">
                            <el-input type="text" v-model="classifyInfo.classifyId" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="分类名称" prop="classifyName">
                            <el-input v-model="classifyInfo.classifyName"></el-input>
                        </el-form-item>
                        <el-form-item label="是否启用" prop="enabled">
                            <el-switch
                                :active-value="1"
                                :inactive-value="0"
                                v-model="classifyInfo.enabled"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="分类描述" prop="classifyDescribe">
                            <el-input type=textarea v-model="classifyInfo.classifyDescribe"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="small" style="float: right; margin-left: 20px" @click="saveOrUpdate('classifyForm')">新增/编辑分类</el-button>
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
                            align="center"
                            label="名称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="classifyDescribe"
                            show-overflow-tooltip
                            align="center"
                            label="描述"
                            width="180">
                            <template slot-scope="scope">
                                {{scope.row.classifyDescribe || '--'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="启用/禁用">
                            <template slot-scope="scope">
                                <el-switch
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="updateEnable(scope.row)"
                                    v-model="scope.row.enabled"
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
                                    @click="toEdit(scope.row)">编辑</el-button>
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
                        @current-change="toPage"
                        @prev-click="toPage"
                        @next-click="toPage"
                        :total="total"
                        :page-size="pageSize">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            classifyInfo: {
                enabled: 1
            },
            classifyList: [],
            total: 0,
            pageSize: 5,
            rules: {
                classifyName: [
                    { required: true, message: '请输入分类名称', trigger: 'blur'}
                ],
                enabled: [
                    { required: true, message: '请输入选择是否启用', trigger: 'blur'}
                ]
            }
        }
    },
    mounted() {
        this.toPage(1)
    },
    methods: {
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: this.pageSize
            }
            this.loadData(param)
        },
        loadData(param) {
            $get('/classify/findByPage', param).then(res=>{
                if(res.code === 100) {
                    this.classifyList = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("查询失败!")
            })
        },
        toEdit(classifyInfo) {
            this.classifyInfo = classifyInfo
        },
        saveOrUpdate(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    let url
                    if(this.classifyInfo.classifyId) { //编辑
                        url = '/classify/update'
                    } else { // 新增
                        url = '/classify/save'
                    }
                    $post(url, this.classifyInfo).then(res=>{
                        if(res.code === 100) {
                            this.$message.success(res.msg)
                            this.resetForm(formName)
                            this.toPage(1)
                        } else {
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                        this.$message.error("保存失败!")
                    })
                } else {
                    return false
                }
            });
        },
        updateEnable(classifyInfo) {
            $post('/classify/update', classifyInfo).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("保存失败!")
            })
        },
        deleteClassify(classifyInfo) {
            let param = {
                classifyId: classifyInfo.classifyId
            }
            $get('/classify/delete', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("查询失败!")
            })
        },
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
                border-radius: 4px;
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
            .classify-info {
                width: 100%;
                padding-bottom: 40px;
                background-color: #ffffff;
                box-shadow: 1px 1px 8px #c7c7c7;
                border-radius: 4px;
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