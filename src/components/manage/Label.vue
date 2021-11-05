<template>
    <div class="label-main">
        <div class="label-form-pack">
            <div class="label-form">
                <div class="title">添加标签</div>
                <div class="body">
                    <el-form ref="labelForm" :model="labelInfo" label-width="80px">
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
                            <el-button type="danger" size="small" style="float: right; margin-left: 20px">新增标签</el-button>
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
export default {
    data() {
        return {
            labelInfo: {},
            labelList: [
                {
                    labelId: 1,
                    labelName: '阅读',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 2,
                    labelName: '技术',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 3,
                    labelName: '杂文',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 4,
                    labelName: '生活',
                    labelDescribe: '但似乎驱蚊器asda玩额武器恶趣味131人情味wneh'
                },
                {
                    labelId: 5,
                    labelName: '娱乐',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 1,
                    labelName: '阅读',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 2,
                    labelName: '技术',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 3,
                    labelName: '杂文',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 4,
                    labelName: '生活',
                    labelDescribe: '但似乎驱蚊器asda玩额武器恶趣味131人情味wneh'
                },
                {
                    labelId: 5,
                    labelName: '娱乐',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 1,
                    labelName: '阅读',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 2,
                    labelName: '技术',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 3,
                    labelName: '杂文',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 4,
                    labelName: '生活',
                    labelDescribe: '但似乎驱蚊器asda玩额武器恶趣味131人情味wneh'
                },
                {
                    labelId: 5,
                    labelName: '娱乐',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 1,
                    labelName: '阅读',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 2,
                    labelName: '技术',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 3,
                    labelName: '杂文',
                    labelDescribe: '但似乎驱蚊器wneh'
                },
                {
                    labelId: 4,
                    labelName: '生活',
                    labelDescribe: '但似乎驱蚊器asda玩额武器恶趣味131人情味wneh'
                },
                {
                    labelId: 5,
                    labelName: '娱乐',
                    labelDescribe: '但似乎驱蚊器wneh'
                }
            ]
        }
    },
    methods: {
        removeTag(tag) {
            console.log(tag.labelName + "--------" + tag.labelDescribe)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="less" scoped>
    .label-main {
        min-height: 100vh;
        width: 100%;
        display: flex;
        .label-form-pack {
            width: 40%;
            .label-form {
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
        .label-info-pack {
            width: 60%;
            padding-left: 20px;
            .label-info {
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
                    .el-tag {
                        margin-right: 10px;
                        margin-bottom: 8px;
                    }
                }
            }
        }
        
    }
</style>