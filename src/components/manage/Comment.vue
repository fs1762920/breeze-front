<template>
    <div class="comment-main">
        <el-tabs type="border-card" @tab-click="switchTab">
            <el-tab-pane label="文章">
                <div class="essay-body">
                    <div class="coment-table">
                        <el-table
                            :data="commentList"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="commentId"
                            :tree-props="{children: 'replyList', hasChildren: 'hasChildren'}">
                            <el-table-column
                                prop="belongBlog"
                                show-overflow-tooltip
                                label="所属博客"
                                sortable
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="nickname"
                                label="昵称"
                                sortable
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="mail"
                                label="邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                show-overflow-tooltip
                                label="内容">
                            </el-table-column>
                            <el-table-column
                                prop="createDate"
                                label="评论日期">
                            </el-table-column>
                            <el-table-column
                                prop="ip"
                                label="IP">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="comment-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="50">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="关于页面">
                <div class="essay-body">
                    <div class="coment-table">
                        <el-table
                            :data="commentList"
                            style="width: 100%;margin-bottom: 20px;"
                            row-key="commentId"
                            :tree-props="{children: 'replyList', hasChildren: 'hasChildren'}">
                            <el-table-column
                                prop="belongBlog"
                                show-overflow-tooltip
                                label="所属博客"
                                sortable
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="nickname"
                                label="昵称"
                                sortable
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="mail"
                                label="邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="content"
                                show-overflow-tooltip
                                label="内容">
                            </el-table-column>
                            <el-table-column
                                prop="createDate"
                                label="评论日期">
                            </el-table-column>
                            <el-table-column
                                prop="ip"
                                label="IP">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="comment-page">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="50">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            commentList: [
                // {   
                //     commentId: 1,
                //     belongBlog: "SpringBoot之定时任务",
                //     nickname: "法外狂徒张三",
                //     mail: "fs1762920@163.com",
                //     createDate: "2021-12-02 21:10:12",
                //     content: "只需要在类上加上@EnableScheduling，在方法上加上@Scheduled两个注解即可启用定时任务Spring Boot提供的定时任务存在的小坑",
                //     ip: "113.12.85.2",
                //     replyList: [
                //         {
                //             commentId: 3,
                //             nickname: "法外狂徒张三",
                //             mail: "fs1762920@163.com",
                //             createDate: "2021-12-02 21:10:12",
                //             content: "只需要在类上加上@EnableScheduling，在方法上加上@Scheduled两个注解即可启用定时任务Spring Boot提供的定时任务存在的小坑",
                //             ip: "113.12.85.2"
                //         },
                //         {
                //             commentId: 2,
                //             nickname: "法外狂徒张三",
                //             mail: "fs1762920@163.com",
                //             createDate: "2021-12-02 21:10:12",
                //             content: "只需要在类上加上@EnableScheduling，在方法上加上@Scheduled两个注解即可启用定时任务Spring Boot提供的定时任务存在的小坑",
                //             ip: "113.12.85.2"
                //         }
                //     ]
                // },
                // {   
                //     commentId: 2,
                //     belongBlog: "SpringBoot之定时任务",
                //     nickname: "法外狂徒张三",
                //     mail: "fs1762920@163.com",
                //     createDate: "2021-12-02 21:10:12",
                //     content: "只需要在类上加上@EnableScheduling，在方法上加上@Scheduled两个注解即可启用定时任务Spring Boot提供的定时任务存在的小坑",
                //     ip: "113.12.85.2"
                // },
                // {   
                //     commentId: 3,
                //     belongBlog: "SpringBoot之定时任务",
                //     nickname: "法外狂徒张三",
                //     mail: "fs1762920@163.com",
                //     createDate: "2021-12-02 21:10:12",
                //     content: "只需要在类上加上@EnableScheduling，在方法上加上@Scheduled两个注解即可启用定时任务Spring Boot提供的定时任务存在的小坑",
                //     ip: "113.12.85.2"
                // }
            ]
            
        }
    },
    methods: {
        switchTab(tab, event) {
            console.log(tab.index);
            if (tab.index === 0) { // 文章评论

            } else { // 关于页面评论

            }
        }
    }
}
</script>
<style lang="less" scoped>
    .comment-main {
        min-height: calc(100vh - 100px);
        .comment-page {
            float: right;
        }
    }
</style>