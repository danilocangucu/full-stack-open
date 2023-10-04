// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', '/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
        cy.visit('/')
    })
})

Cypress.Commands.add('createBlog', (title, author, url) => {
    cy.contains('create blog').click()
    cy.get('[data-testid="title"]').type(title)
    cy.get('[data-testid="author"]').type(author)
    cy.get('[data-testid="url"]').type(url)
    cy.contains('save').click()
    cy.contains(title)
})

Cypress.Commands.add('showBlog', (title) => {
    cy.contains('div', title)
    .find('button')
    .click()
})


Cypress.Commands.add('likeBlog', (title) => {
    cy.contains('div', title)
    .find('button').contains('Like')
    .click()
})