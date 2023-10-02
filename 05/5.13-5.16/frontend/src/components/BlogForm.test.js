import React from "react";
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import BlogForm from "./BlogForm";
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    const createBlog = jest.fn()

    test('form calls the event handler with right details', async () => {
        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByText('title')
        const authorInput = screen.getByText('author')
        const urlInput = screen.getByText('url')
        const saveButton = screen.getByText('save')

        userEvent.type(titleInput, 'New blog')
        userEvent.type(authorInput, 'New author')
        userEvent.type(urlInput, 'http://new.url')

        expect(screen.getByDisplayValue('New blog')).toBeInTheDocument()
        expect(screen.getByDisplayValue('New author')).toBeInTheDocument()
        expect(screen.getByDisplayValue('http://new.url')).toBeInTheDocument()

        screen.debug()

        userEvent.click(saveButton)

        await waitFor(() => expect(createBlog).toHaveBeenCalledTimes(1))

        expect(createBlog).toHaveBeenCalledWith({
            title: 'New blog',
            author: 'New author',
            url: 'New url'
        })
    })
})