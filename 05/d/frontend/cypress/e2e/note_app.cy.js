describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of CS, University of Helsinki')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()  

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Matti Luukkainen logged in')  
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('#note').type('a new cypress note')
        cy.get('#save-button').click()
        cy.contains('a new cypress note')
      })
      
      it('it can be made not important', function() {
        cy.contains('a new cypress note')
          .contains('make not important')
          .click()

        cy.contains('a new cypress note')
          .contains('make important')
      })
    })
  })
})