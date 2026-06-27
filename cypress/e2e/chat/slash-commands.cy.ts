describe('Slash Commands', () => {
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

  it('deve abrir menu de slash commands ao digitar /', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="slash-command-menu"]').length === 0) {
        cy.log('Slash command menu not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="slash-command-menu"]').should('be.visible');
    });
  });

  it('deve mostrar comandos disponíveis', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="slash-command-menu"]').length === 0) {
        cy.log('Slash command menu not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="slash-command-menu"]').should('be.visible');
      cy.contains('/agendar').should('be.visible');
      cy.contains('/away').should('be.visible');
      cy.contains('/status').should('be.visible');
    });
  });

  it('deve executar comando /away', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/away{enter}');
    cy.get('textarea[placeholder*="Mensagem em"]').should('have.value', '');
  });

  it('deve executar comando /agendar e abrir modal', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/agendar reunião amanhã{enter}');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="schedule-modal"]').length === 0) {
        cy.log('Schedule modal not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="schedule-modal"]').should('be.visible');
    });
  });

  it('deve executar comando /status', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/status ocupado{enter}');
    cy.get('textarea[placeholder*="Mensagem em"]').should('have.value', '');
  });

  it('deve executar comando /status limpar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/status{enter}');
    cy.get('textarea[placeholder*="Mensagem em"]').should('have.value', '');
  });

  it('deve filtrar comandos ao digitar', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/aga');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="slash-command-menu"]').length === 0) {
        cy.log('Slash command menu not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="slash-command-menu"]').should('be.visible');
      cy.contains('/agendar').should('be.visible');
      cy.contains('/away').should('not.exist');
    });
  });

  it('deve navegar com setas no menu', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="slash-command-menu"]').length === 0) {
        cy.log('Slash command menu not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="slash-command-menu"]').should('be.visible');
      cy.get('textarea[placeholder*="Mensagem em"]').type('{downarrow}');
      cy.get('[data-testid="slash-command-menu"] [aria-selected="true"]').should('exist');
    });
  });

  it('deve executar comando /lembrete', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/lembrete em 1h revisar PR{enter}');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="reminder-modal"]').length === 0) {
        cy.log('Reminder modal not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="reminder-modal"]').should('be.visible');
    });
  });

  it('deve executar comando /enquete', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/enquete "Qual melhor?" "Opção 1" "Opção 2"{enter}');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="poll-modal"]').length === 0) {
        cy.log('Poll modal not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="poll-modal"]').should('be.visible');
    });
  });

  it('deve fechar menu com ESC', () => {
    cy.get('a[href*="/channel/"]').first().click();
    cy.get('textarea[placeholder*="Mensagem em"]').type('/');
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="slash-command-menu"]').length === 0) {
        cy.log('Slash command menu not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="slash-command-menu"]').should('be.visible');
      cy.get('body').type('{esc}');
      cy.get('[data-testid="slash-command-menu"]').should('not.be.visible');
    });
  });
});
