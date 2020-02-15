import fly from './index'
export default {
    // classification(分类信息)
    // 大类
    getCats() {
        return fly.get("/cats/lv2/statistics")
    },
    // 小类
    getMinor() {
        return fly.get("/cats/lv2")
    },
    // 分类书籍
    getCatsBooks({
        gender,
        type,
        major,
        minor,
        start
    }) {
        if (minor !== '全部') {
            return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
        } else {
            return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
        }
    },
    // https://statics.zhuishushenqi.com
    //书本
    // 详情
    bookInfo(book_id) {
        return fly.get(`/book/${book_id}`)
    },
    // 推荐
    relatedRecommendedBooks(book_id) {
        return fly.get(`/book/${book_id}/recommend`)
    },
    // 作者相关
    authorBooks(author) {
        return fly.get(`/book/accurate-search?author=${author}`)
    },
    // 书源
    bookSources(book_id) {
        return fly.get(`/atoc?view=summary&book=${book_id}`)
    },
    // 书籍章节 根据书源id
    bookChapters(id) {
        return fly.get(`/atoc/${id}?view=chapters`)
    },
    // 书籍章节 根据书id
    bookChaptersBookId(book_id) {
        return fly.get(`/mix-atoc/${book_id}?view=chapters`)
    },
    // 章节内容
    chapterContent(link) {
        return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    },
    //搜索热词
    hotWord() {
        return fly.get('/book/hot-word')
    },
    // 书籍搜索 (分类，书名，作者名)
    research(content, start = 0) {
        return fly.get(`/book/fuzzy-search?start=${start}&limit=20&v=1&query=${content}`)
    },

    // 排名
    // 排名分类
    rankCategory() {
        return fly.get("/ranking/gender")
    },
    // 排名详情
    rankInfo(rank_id) {
        return fly.get(`ranking/${rank_id}`)
    },

    // 评论系统
    // 讨论
    discussions(book_id) {
        return fly.get(`/post/by-book?book=${book_id}`)
    },
    // 短评
    shortReviews(book_id, start = 1) {
        return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest&start=${start}&limit=20`)
    },
    //长评
    bookReviews(book_id) {
        return fly.get(`/post/review/by-book?book=${book_id}`)
    },

    //书列表
    lists() {
        return fly.get("/book-list")
    },

    //详情
    detail(id) {
        return fly.get(`/book-list/${id}`)
    }
}