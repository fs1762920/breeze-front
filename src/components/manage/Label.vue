<template>
    <div class="label-main">
        <div class="label-form-pack">
            <div class="label-form">
                <div class="title">添加标签</div>
                <div class="body">
                    <el-form ref="labelForm" :model="labelInfo" :rules="rules" label-width="80px">
                        <el-form-item v-show="false" label="标签id" prop="labelId">
                            <el-input type="text" v-model="labelInfo.labelId" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="标签名称" prop="labelName">
                            <el-input v-model="labelInfo.labelName"></el-input>
                        </el-form-item>
                        <el-form-item label="标签描述" prop="labelDescribe">
                            <el-input type=textarea v-model="labelInfo.labelDescribe"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="small" style="float: right; margin-left: 20px" @click="saveOrUpdate('labelForm')">新增标签</el-button>
                            <el-button type="text" size="small" style="float: right;" @click="resetForm('labelForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        
        <div class="label-info-pack">
            <div class="label-info">
                <div class="title">标签列表</div>
                <div class="body">
                    <el-tag
                        v-for="(item, index) in labelList"
                        :key="index"
                        @close="removeTag(item)"
                        closable>
                        {{item.labelName}}
                    </el-tag>
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
            labelInfo: {},
            rules: {
                labelName: [
                    { required: true, message: '请输入标签名称', trigger: 'blur'}
                ]
            },
            labelList: []
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData() {
            $get('/label/find', null).then(res=>{
                if(res.code === 100) {
                    this.labelList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("查询失败!")
            })
        },
        saveOrUpdate(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    $post('/label/save', this.labelInfo).then(res=>{
                        if(res.code === 100) {
                            this.$message.success(res.msg)
                            this.resetForm(formName)
                            this.loadData()
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
        removeTag(tag) {
            let param = {
                labelId: tag.labelId
            }
            $get('/label/delete', param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.loadData()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("删除失败!")
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
    .label-main {
        min-height: calc(100vh - 100px);
        width: 100%;
        display: flex;
        .label-form-pack {
            width: 40%;
            .label-form {
                width: 100%;
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
            }
        }
        .label-info-pack {
            width: 60%;
            padding-left: 20px;
            .label-info {
                width: 100%;
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
                    .el-tag {
                        margin-right: 10px;
                        margin-bottom: 8px;
                    }
                }
            }
        }
        
    }
</style>