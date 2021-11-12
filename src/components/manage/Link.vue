<template>
    <div class="link-main">
        <el-dialog
            :title="friendInfo.friendId?'修改友情链接':'添加友情链接'"
            :visible.sync="show"
            @close="resetForm('friendForm')"
            width="28%">
            <el-form :model="friendInfo" status-icon :rules="rules" ref="friendForm" label-width="72px">
                <el-form-item v-show="false" label="友链id" prop="friendId">
                    <el-input type="text" v-model="friendInfo.friendId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="博客名称" prop="nickname">
                    <el-input type="text" v-model="friendInfo.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="头像链接" prop="avatarPath">
                    <el-input type="text" v-model="friendInfo.avatarPath" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="博客地址" prop="homePage">
                    <el-input type="text" v-model="friendInfo.homePage" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="个人介绍" prop="personalSign">
                    <el-input type="textarea" v-model="friendInfo.personalSign" :rows="3" :maxlength="50" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addOrEditClassify('friendForm')">提交</el-button>
                    <el-button @click="resetForm('friendForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="link-operate">
            <el-button type="success" size="small" @click="show = true">添加友链</el-button>
        </div>
        <div class="link-table">
            <el-table 
                :data="friendList"
                style="width: 100%">
                <el-table-column
                    prop="nickname"
                    show-overflow-tooltip
                    align="center"
                    label="博客名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="avatarPath"
                    show-overflow-tooltip
                    align="center"
                    label="头像链接"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="homePage"
                    show-overflow-tooltip
                    align="center"
                    label="博客地址"
                    width="240">
                </el-table-column>
                <el-table-column
                    prop="personalSign"
                    show-overflow-tooltip
                    align="center"
                    label="个人介绍"
                    width="280">
                </el-table-column>
                <el-table-column
                    prop="ctime"
                    :formatter="dateFormat"
                    align="center"
                    label="申请时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="mtime"
                    :formatter="dateFormat"
                    align="center"
                    label="修改时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            @click="showEditDialog(scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteFriend(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="link-page">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="toPage"
                @prev-click="toPage"
                @next-click="toPage"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {$get, $post} from '../../api/RestUtils'

export default {
    data() {
        return {
            dialogTitle: '',
            show: false,
            friendInfo: {},
            rules: {},
            friendList: [
                {
                    friendId: 1,
                    nickname: '张三的歌',
                    avatarPath: 'http://localhost:8080/upload/file/3475212308431&341.jpeg',
                    personalSign: '年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。',
                    homePage: 'http://localhost:8080/portal'
                },
                {
                    friendId: 2,
                    nickname: '最熟悉的陌生人',
                    avatarPath: 'http://localhost:8080/upload/file/3475212308431&341.jpeg',
                    personalSign: '年龄永远不是衡量一个人的刻度，只有责任的叠加才会让人逐渐成长。',
                    homePage: 'http://localhost:8080/portal'
                }
            ],
            total: 0
        }
    },
    mounted() {
        this.toPage(1)
    },
    methods: {
        loadData(param) {
            $get('/friend/findByPage', param).then(res=>{
                // if(res.code === 100) {
                //     this.friendList = res.data.list
                //     this.total = res.data.total
                // } else {
                //     this.$message.error(res.msg)
                // }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        toPage(pageNum) {
            let param = {
                pageNum: pageNum,
                pageSize: 10
            }
            this.loadData(param)
        },
        showEditDialog(friendInfo) {
            this.friendInfo = friendInfo
            this.show = true
        },
        addOrEditClassify(formName) {
            let url;
            if(this.friendInfo.friendId) {
                url = '/friend/update'
            } else {
                url = '/friend/save'
            }
            $post(url, param).then(res=>{
                if(res.code === 100) {
                    this.$message.success(res.msg)
                    this.show = false
                    this.resetForm(formName)
                    this.toPage(1)
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(error => {
                this.$message.error("无法连接到服务器")
            })
        },
        deleteFriend(friendInfo) {
            let param = {
                friendId: friendInfo.friendId
            }
            $get('/friend/delete', param).then(res=>{
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
        resetForm(formName) {
            this.friendInfo = {}
            // this.$refs[formName].resetFields();
        },
        dateFormat(row, column, cellValue){
            return this.$moment(cellValue).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}
</script>
<style lang="less" scoped>
    .link-main {
        min-height: calc(100vh - 100px);
        background-color: white;
        box-shadow: 1px 1px 8px #c7c7c7;
        border-radius: 4px;
        .link-operate {
            padding: 20px;
        }
        .link-table {
            padding: 20px
        }
        .link-page {
            float: right;
        }
    }
</style>