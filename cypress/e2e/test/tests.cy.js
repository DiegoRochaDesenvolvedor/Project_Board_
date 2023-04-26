context('Actions', () => {
beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })
  it('Should creating project',()=>{
    cy.wait(2000)
    cy.get('.input_text').type('New project');
    cy.get('.button_add').click();
    cy.get('.button_text').then( obj => { 
        for(let i = 0 ; i<obj.length-1; i++){
          cy.wait(2000)
          cy.get('button.button_delete').eq(0).click()
          cy.get('button.button_delete').eq(0).click()
        } 
    cy.get('button.button_text').invoke('text').then(obj =>{ 
      expect(obj).equal('New project')
    })
  })
  })
  it('Should add sprint in project', ()=>{
    cy.get('.button_text').eq(0).click()
    cy.get('.button_text').eq(0).click()
    cy.get('input.text_add').type('sprint test')
    cy.get('input.text_sprint').type('sprint')
    cy.get('.add_button').click()
    cy.get('.line div').eq(1).invoke('text').then(obj=>
       expect(obj).equal('sprint test')
       )
  })
  it('Should show project in dashboard', ()=>{
    cy.get('.dashboard_button').click()
    cy.get('span.text_sprint').invoke('text').then(obj=> 
      expect(obj).equal('sprint test')
      )
    cy.get('h1').eq(0).invoke('text').then(obj=>
      expect(obj).equal('1')
      //obj=>console.log(obj))
  )})
})

  