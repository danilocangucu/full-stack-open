describe('Blog app', function() {
  before(function() {
    cy.request('POST', '/api/testing/reset')
    cy.request('POST', '/api/users',
    {
      username: 'user1',
      name: 'User 1',
      password: 'user1pass'
    })
    cy.request('POST', '/api/users',
    {
      username: 'user2',
      name: 'User 2',
      password: 'user2pass'
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })

  describe('Login', function() {
    it('fails with wrong credentials', function() {
      cy.request({
        method: 'POST',
        url: '/api/login',
        body: {
          username: 'wrong',
          password: 'wrrrong'
        },
        failOnStatusCode: false
      }).then((response => {
        expect(response.status).to.eq(401)
        expect(response.body).to.have.property('error', 'invalid username or password')
      }))
      
    })

    describe('When logged in', function() {
      before(function() {
        cy.login({ username: 'user2', password: 'user2pass' })
        cy.contains('User 2 logged in')
        cy.createBlog('Blog less liked', 'Another author', 'http://lessliked.url')
        cy.createBlog('Blog most liked', 'Best author', 'http://mostliked.url')
        cy.showBlog('Blog most liked')
        cy.likeBlog('Blog most liked')
      })

      beforeEach(function() {
        cy.login({ username: 'user1', password: 'user1pass' })
        cy.contains('User 1 logged in')
      })

      describe('A blog can', function() {
        it('be created', function() {
          cy.createBlog('Blog title', 'Blog author', 'http://blog.url')
        })

        it('be liked', function() {
          cy.showBlog('Blog title')
          cy.likeBlog('Blog title')
        })

        it('be deleted by the user who created it', function() {
          cy.showBlog('Blog title')
          cy.contains('delete').click()
          cy.contains('Blog title').should('not.exist')
        })

        it('cannot be deleted by the user who didnt create it', function() {
          cy.showBlog('Blog less liked')
          cy.contains('delete').should('not.exist')
        })


      })

      describe('The blog list', function() {
        it('is ordered with the most liked blog first', function() {
          cy.get('.blog').eq(0).should('contain', 'Blog most liked')
          cy.get('.blog').eq(1).should('contain', 'Blog less liked')
        })
      })
    })
  })
})