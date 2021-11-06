<template>
    <div class="home-main">
        <div class="essay-item">
            <div class="cover">
                <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
            <div class="info">
                <div class="date">
                    <span>2021-08-21&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>分类&nbsp;·&nbsp;阅读</span>
                </div>
                <div class="title">
                    《毛选》（卷一） 001中国社会各阶级的分析
                </div>
                <div class="description">
                    毛泽东此文是为反对当时党内存在着的两种倾向而写的。当时党内的第一种倾向，以陈独秀为代表，只注意同国 民党合作，忘记了农民，这是右倾机会主义。第二种倾向，以张国焘为代表，只注意工人运动，同样忘记了农民，这是“左”倾机会主义。这两种机会主义都感觉自己力量不足，而不知道到何处去寻找力量，到何处去取得广大的同盟军。毛泽东指出中国无产阶级的最广大和最忠实的同盟军是农民，这样就解决了中国革命中的最主要的同盟军问题。毛泽东并且预见到当时的民族资产阶级是一个动摇的阶级，他们在革命高涨时将要分化，其右翼将要跑到帝国主义方面去。一九二七年所发生的事变，证明了这一点。
                </div>
                <div class="read">
                    <el-button type="info" size="small" plain @click="blogOverview(1)">阅读更多</el-button>
                </div>
            </div>
        </div>
        <div class="essay-item">
            <div class="cover">
                <el-image fit="cover" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
            <div class="info">
                <div class="date">
                    <span>2021-08-21&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>分类&nbsp;·&nbsp;阅读</span>
                </div>
                <div class="title">
                    《毛选》（卷一） 001中国社会各阶级的分析
                </div>
                <div class="description">
                    毛泽东此文是为反对当时党内存在着的两种倾向而写的。毛泽东并且预见到当时的民族资产阶级是一个动摇的阶级，他们在革命高涨时将要分化，其右翼将要跑到帝国主义方面去。一九二七年所发生的事变，证明了这一点。
                </div>
                <div class="read">
                    <el-button type="info" size="small" plain>阅读更多</el-button>
                </div>
            </div>
        </div>
        <div class="page-group">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="20">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
         return {
             
         }
    },
    methods: {
        blogOverview(id) {
            let param = {
                path: '/portal/view',
                query: {
                    blogId: id
                }
            }
            this.$router.push(param)
        }
    }
}
</script>
<style lang="less" scoped>
    .main {
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