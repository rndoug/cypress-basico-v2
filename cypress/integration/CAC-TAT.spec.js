describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })
      it('verifica o título da aplicação', function() {
    
  
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
      })
  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.'
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Signori')
    cy.get('#email').type('rndoug1@hotmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    const longText = 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.'
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Signori')
    cy.get('#email').type('rndoug1@hotmailcom')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('ao digitar letras no lugar de número o input deve permanecer vazio', function (){
    cy.get('#phone')
      .type('testeste')
      .should('have.value', '')
  
  })
  it('exibir mensagem de erro quando o campo de telefone se tornar obrigatório mas não é preenchido antes do envio do formulário', function(){
    const longText = 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.'
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Signori')
    cy.get('#email').type('rndoug1@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('exibir mensagem de sucesso ao preencher o campo de telefone', function(){
    const longText = 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.'
    cy.get('#firstName').type('Douglas')
    cy.get('#lastName').type('Signori')
    cy.get('#email').type('rndoug1@hotmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('0000000000')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    const longText = 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.'
    cy.get('#firstName')
      .type('Douglas')
      .should('have.value', 'Douglas')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Signori')
      .should('have.value', 'Signori')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('rndoug1@hotmail.com')
      .should('have.value', 'rndoug1@hotmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone-checkbox')
      .click()
    cy.get('#phone')
      .type('00000000000')
      .should('have.value', '00000000000')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type(longText, {delay:0})
      .should('have.value', 'Esse texto é apenas para um teste que estou fazendo agora para ver como vai se comportar na hora de executar o mesmo.')
      .clear()
     .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preenhcer os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formulário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('selecione um produto (YouTube) por seu texto', function(){
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marcar o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"]')
      .check('feedback')
      .should('be.checked')
  })
  it('marcar cada tipo de atendimento', function(){
  cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each((radio) => {
      cy.wrap(radio).check()
      .should('be.checked')
    })
  })
  it('marcar ambos os checkbox, depois desmarcar o último', function(){
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function(input) {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('selecionar um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(function(input) {
        expect(input[0].files[0].name).to.equal('example.json') 
      })
  })
  it('selecionar um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function(input) {
        expect(input[0].files[0].name).to.equal('example.json') 
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing')
      .should('be.visible')
  })
    })