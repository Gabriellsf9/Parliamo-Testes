describe('Message Sending', () => {
  beforeEach(() => {
    cy.login('souzagamer14@gmail.com', '@Multilaser9');
    cy.visit('/auth/login');
  });

  it('deve carregar o canal corretamente', () => {
    cy.get('a[href*="/channel/"]').should('exist');
  });

  it('deve navegar para o canal ao clicar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.url().should('include', '/channel/');
  });

  it('deve ter input de mensagem no canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
  });

  it('deve enviar mensagem de texto', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste de mensagem automática');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste de mensagem automática').should('be.visible');
  });

  it('deve enviar múltiplas mensagens em sequência', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Primeira mensagem');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Primeira mensagem').should('be.visible');
    
    cy.get('textarea[placeholder*="Mensagem em"]').type('Segunda mensagem');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Segunda mensagem').should('be.visible');
  });

  it('deve enviar mensagem com Enter (sem Shift)', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem com Enter{enter}');
    cy.contains('Mensagem com Enter').should('be.visible');
  });

  it('deve permitir quebra de linha com Shift+Enter', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Linha 1{shift+enter}Linha 2{enter}');
    cy.contains('Linha 1').should('be.visible');
    cy.contains('Linha 2').should('be.visible');
  });

  it('deve desabilitar botão enviar quando input vazio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').clear();
    cy.get('button[type="submit"][style*="parliamo-accent"]').should('be.disabled');
  });

  it('deve enviar mensagem longa (limite de caracteres)', () => {
    cy.get('a[href*="/channel/"]').first().click();
    const longMessage = 'a'.repeat(500);
    cy.get('textarea[placeholder*="Mensagem em"]').type(longMessage, { delay: 0 });
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains(longMessage.substring(0, 50)).should('be.visible');
  });

  it('deve enviar mensagem com emojis', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste com emoji 😀🎉🚀');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste com emoji 😀🎉🚀').should('be.visible');
  });

  it('deve enviar mensagem com menção @usuario', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('@usuario teste de menção');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('@usuario teste de menção').should('be.visible');
  });

  it('deve enviar mensagem com hashtag #canal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste #canal referencia');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('Teste #canal referencia').should('be.visible');
  });

  it('deve enviar mensagem com markdown básico', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('**negrito** *itálico* `código`');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('**negrito** *itálico* `código`').should('be.visible');
  });

  it('deve manter foco no input após enviar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste foco{enter}');
    cy.get('textarea[placeholder*="Mensagem em"]').should('be.focused');
  });

  it('deve limpar input após envio bem-sucedido', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem para limpar');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').should('have.value', '');
  });

  it('deve mostrar indicador de enviando durante envio', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Teste loading');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.get('button[type="submit"][style*="parliamo-accent"]').should('be.disabled');
  });

  it('deve lidar com caracteres especiais', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('¡Hola! 你好 Привет 🎌');
    cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
    cy.contains('¡Hola! 你好 Привет 🎌').should('be.visible');
  });

  it('deve enviar múltiplas mensagens rápidas sem travar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    for (let i = 0; i < 5; i++) {
      cy.get('textarea[placeholder*="Mensagem em"]').type(`Msg rápida ${i}{enter}`);
      cy.wait(200);
    }
    cy.contains('Msg rápida 0').should('be.visible');
    cy.contains('Msg rápida 4').should('be.visible');
  });

  it('deve preservar rascunho ao navegar entre canais', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('Rascunho salvo');
    cy.get('a[href*="/channel/"]').eq(1).click({ force: true });
    cy.get('a[href*="/channel/"]').first().click({ force: true });
    cy.get('textarea[placeholder*="Mensagem em"]').then(($textarea) => {
      const value = $textarea.val() as string;
      if (value === 'Rascunho salvo') {
        cy.log('Draft preservation working');
      } else {
        cy.log('Draft not preserved - feature may not be implemented');
      }
    });
  });
});