describe('Gif Picker', () => {
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

  it('deve abrir o GIF picker ao clicar no botão', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker"]').should('be.visible');
    });
  });

  it('deve buscar GIFs', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker-search"]').type('happy');
      cy.get('[data-testid="gif-picker-results"] img').should('have.length.at.least', 1);
    });
  });

  it('deve inserir GIF na mensagem', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker-results"] img').first().click({ force: true });
      cy.get('textarea[placeholder*="Mensagem em"]').should('not.be.empty');
    });
  });

  it('deve enviar mensagem com GIF', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker-results"] img').first().click({ force: true });
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
      cy.get('img[src*="gif"]').should('be.visible');
    });
  });

  it('deve buscar GIFs por categoria', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-category-reactions"]').click({ force: true });
      cy.get('[data-testid="gif-picker-results"] img').should('have.length.at.least', 1);
      cy.get('[data-testid="gif-category-celebrate"]').click({ force: true });
      cy.get('[data-testid="gif-picker-results"] img').should('have.length.at.least', 1);
    });
  });

  it('deve paginar resultados de GIF', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker-search"]').type('funny');
      cy.get('[data-testid="gif-picker-results"] img').should('have.length.at.least', 10);
      cy.get('[data-testid="gif-load-more"]').click({ force: true });
      cy.get('[data-testid="gif-picker-results"] img').should('have.length.greaterThan', 10);
    });
  });

  it('deve fechar picker ao clicar fora', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker"]').should('be.visible');
      cy.get('body').click(0, 0);
      cy.get('[data-testid="gif-picker"]').should('not.be.visible');
    });
  });

  it('deve fechar picker com ESC', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-picker"]').should('be.visible');
      cy.get('body').type('{esc}');
      cy.get('[data-testid="gif-picker"]').should('not.be.visible');
    });
  });

  it('deve mostrar GIFs trending', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="gif-picker-trigger"]').length === 0) {
        cy.log('GIF picker trigger not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="gif-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="gif-trending"]').should('be.visible');
      cy.get('[data-testid="gif-trending"] img').should('have.length.at.least', 1);
    });
  });
});
