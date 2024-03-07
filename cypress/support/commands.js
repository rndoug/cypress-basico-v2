Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText = 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.'
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Signori')
    cy.get('#email').type('rndoug1@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('0000000000')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()

})