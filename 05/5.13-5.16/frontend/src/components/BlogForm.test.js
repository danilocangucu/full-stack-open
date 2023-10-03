import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import BlogForm from "./BlogForm";
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    const createBlog = jest.fn()

    test('form calls the event handler with right details', async () => {
        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByTestId('title')
        const authorInput = screen.getByTestId('author')
        const urlInput = screen.getByTestId('url')
        const saveButton = screen.getByText('save')

        userEvent.type(titleInput, 'New blog')
        userEvent.type(authorInput, 'New author')
        userEvent.type(urlInput, 'http://new.url')

        // screen.debug()

        userEvent.click(saveButton)

        expect(createBlog).toHaveBeenCalledWith({
            title: 'New blog',
            author: 'New author',
            url: 'New url'
        })
    })
})