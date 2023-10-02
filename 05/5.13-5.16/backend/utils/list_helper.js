const _ = require('lodash')

const dummy = _ => 1

const totalLikes = blogs => {
    const reducerLikes = (likesSum, blog) => {
        return likesSum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducerLikes, 0)
}

const favoriteBlog = blogs => {
    const reducerFavorite = (maxLikesBlog, blog) => {
        if (blog.likes > maxLikesBlog.likes) {
            return blog
        } else {
            return maxLikesBlog
        }
    }

    return blogs.reduce(reducerFavorite, { likes: 0 })
}

const mostBlogs = (blogs) => {
    return _.reduce(blogs, (acc, blog) => {
        if (acc.blogs >= blog.blogs) {
            return { author: acc.author, blogs: acc.blogs }
        } else {
            return { author: blog.author, blogs: blog.blogs }
        }
    }, { author: '', blogs: 0 })
}

const mostLikes = (blogs) => {
    return _.reduce(blogs, (acc, blog) => {
        if (acc.likes >= blog.likes) {
            return { author: acc.author, likes: acc.likes }
        } else {
            return { author: blog.author, likes: blog.likes }
        }
    }, { author: '', likes: 0 })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}