import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from "./BlogForm";
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {

    test('form calls the event handler with right details', async () => {
        const createBlog = jest.fn()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByTestId('title')
        const authorInput = screen.getByTestId('author')
        const urlInput = screen.getByTestId('url')
        const saveButton = screen.getByText('save')

        const newBlog = {
            title: 'New blog',
            author: 'New author',
            url: 'New url'
        }

        await userEvent.type(titleInput, newBlog.title)
        await userEvent.type(authorInput, newBlog.author)
        await userEvent.type(urlInput, newBlog.url)

        await userEvent.click(saveButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
        expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
        expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)
    })
})