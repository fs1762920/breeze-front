<template>
    <div class="time-main">
        <div class="timeline">
            <vue-timeline-update v-for="(item, index) in blogList" :key="index" @click="toDetail(item)"
                :date="dateFormat(item.date)"
                :title="item.title"
                :thumbnail="item.cover"
                :category="item.classify"
                icon="code"
                theme="light"
                color="orange"
                :is-last="index === blogList.length-1"
            />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            blogList: [
                {
                    id: 1,
                    cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    title: '聊一聊 Vue 3 动态组件是如何工作的',
                    describe: '微软赞助的研究被Nature撤稿了，而且还是2021年“第一撤”。原本被物理学界视为颠覆量子计算技术的成果，不过是论文作者删改数据得来的结论，根本靠不住。',
                    author: 'voracious',
                    date: '2021-01-06',
                    commentCount: 15,
                    classify: '技术'
                },
                {
                    id: 2,
                    cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    title: '在 CSDN 博客 100 天技术日更的 Flag，我做到了！',
                    describe: '这 100 天，橡皮擦重点突击了 Python 相关的内容（基础部分偏多），过程中尽量追究体系化。这样写作的原因，是希望在互联网上留下一点点痕迹，而单独一篇文章很难做到系统化，所以你看到了滚雪球学 Python 系列的出现，你看到了 365 天学 OpenCV 系列。',
                    author: 'voracious',
                    date: '2021-01-09',
                    commentCount: 53,
                    classify: '社科'
                },
                {
                    id: 3,
                    cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    title: 'Redis不是一直号称单线程效率也很高吗，为什么又采用多线程了？',
                    describe: 'Redis是目前广为人知的一个内存数据库，在各个场景中都有着非常丰富的应用，前段时间Redis推出了6.0的版本，在新版本中采用了多线程模型。因为我们公司使用的内存数据库是自研的，按理说我对Redis的关注其实并不算多，但是因为Redis用的比较广泛，所以我需要了解一下这样方便我进行面试。',
                    author: 'voracious',
                    date: '2021-01-29',
                    commentCount: 27,
                    classify: '阅读'
                },
                {
                    id: 4,
                    cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    title: '程序员用10分钟写了个旅游管家APP，女友用了直呼贴心',
                    describe: '听到阿珍又念起这句经典台词，阿强，这个对自然界的花期不太敏感的程序员，也收到了“樱花开了”的讯号。春天的樱花不能错过，赏樱是写进阿珍价值观的春日打卡动作。视频通话里，阿珍计划了一场远行——周末就回母校武大看樱花。但这一次，在外出差的阿强不能陪她一起去。',
                    author: 'voracious',
                    date: '2021-02-10',
                    commentCount: 47,
                    classify: '杂文'
                },
                {
                    id: 5,
                    cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                    title: 'Spring菜鸟教你看源码冲面试',
                    describe: 'Spring 通过 AbstractAutoProxyCreator 来创建 AOP 代理，AbstractAutoProxyCreator 是一个抽象类，它实现了 BeanPostProcessor 接口，用于在 bean 初始化完成之后创建它的代理(从上面IOC容器创建Bean过程中有点体现)；在AbstractAutoProxyCreator类关系UML图中找到一个特殊的接口—>BeanPostProcessor',
                    author: 'voracious',
                    date: '2021-02-20',
                    commentCount: 92,
                    classify: '技术'
                }
            ]
        }
    },
    methods: {
        dateFormat(date) {
            return this.$moment(date).format("YYYY-MM-DD")
        }
    }
}
</script>
<style lang="less" scoped>
    .time-main {
        background-color: rgba(255, 255, 255);
        border-radius: 4px;
        padding: 40px;
        margin-top: 20px;
        .timeline {
            min-height: 80vh;
            padding-bottom: 80px;
            cursor: pointer;
            /deep/.gb-vue-timeline-update__title {
                overflow:hidden;  //超出部分隐藏
                text-overflow:ellipsis;  //超出部分显示...
                white-space:nowrap;  //文本强制一行显示 
                width: 70%;
            }
            /deep/.gb-vue-timeline-update__thumbnail {
                border: none!important
            }
            /deep/.gb-vue-timeline-update__right {
                width: 20vw;
            }
        }
    }
</style>