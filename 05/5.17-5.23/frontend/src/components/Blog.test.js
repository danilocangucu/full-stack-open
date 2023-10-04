import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from "./Blog";
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    const blog = {
        title: "Best blog entry",
        url: "http://www.bestblog.com",
        likes: 10,
        user: {
            name: "Best author"
        }
    }
    const handleLike = jest.fn()

    beforeEach(() => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "http://new.url"
        }
        render(
            <Blog
                blog={blog}
                updateBlogLikes={handleLike}
            />
        )
    })

    test('contains blog\'s title', () => {
        expect(screen.getByText('Best blog entry')).toBeInTheDocument();
    })

    test('does not contains author\'s name, likes nor url', () => {
        expect(screen.queryByText('Best author')).not.toBeInTheDocument();
        expect(screen.queryByText('10')).not.toBeInTheDocument();
        expect(screen.queryByText('http://www.bestblog.com')).not.toBeInTheDocument();
    })

    test('url and number of likes are shown when button is clicked', async () => {
        const user = userEvent.setup()
        const showButton = screen.getByText('show')

        await user.click(showButton)
        expect(screen.queryByText('Best author')).toBeInTheDocument();
        expect(screen.queryByText('likes 10')).toBeInTheDocument();
    })

    test('like button is clicked twice', async () => {
        const user = userEvent.setup()

        const showButton = screen.getByText('show')
        await user.click(showButton)

        const likeButton = screen.getByText('Like')
        await userEvent.click(likeButton)
        await userEvent.click(likeButton)
        
        expect(handleLike).toHaveBeenCalledTimes(2)
    })
})