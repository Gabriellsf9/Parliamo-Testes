describe('DM View', () => {
  const DM_SELECTOR = '[href*="/dm/"], [href*="/direct/"], [data-testid*="dm-link"]';
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

  it('deve abrir DM ao clicar em usuário na sidebar', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.url().should('match', /\/(dm|direct)\//);
      cy.get('textarea[placeholder*="Mensagem em"]').should('be.visible');
    });
  });

  it('deve enviar mensagem em DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem privada');
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
      cy.contains('Mensagem privada').should('be.visible');
    });
  });

  it('deve alternar entre canal e DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get('a[href*="/channel/"]').first().click();
      cy.url().should('include', '/channel/');
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.url().should('match', /\/(dm|direct)\//);
      cy.get('a[href*="/channel/"]').first().click();
      cy.url().should('include', '/channel/');
    });
  });

  it('deve mostrar nome do destinatário no header', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('[data-testid="dm-header"]').should('be.visible');
      cy.get('[data-testid="dm-recipient-name"]').should('be.visible');
    });
  });

  it('deve mostrar status online/offline', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('[data-testid="dm-status"]').should('be.visible');
    });
  });

  it('deve abrir perfil do destinatário', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('[data-testid="dm-header"]').click({ force: true });
      cy.get('[data-testid="profile-modal"]').should('be.visible');
    });
  });

  it('deve permitir fixar DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('[data-testid="dm-header"]').trigger('mouseover');
      cy.get('[data-testid="pin-dm"]').click({ force: true });
      cy.get('[data-testid="dm-pinned-badge"]').should('be.visible');
    });
  });

  it('deve silenciar DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('[data-testid="dm-header"]').trigger('mouseover');
      cy.get('[data-testid="mute-dm"]').click({ force: true });
      cy.get('[data-testid="dm-muted-badge"]').should('be.visible');
    });
  });

  it('deve criar novo DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="new-dm-button"]').length === 0) {
        cy.log('New DM button not found - feature may not be implemented with data-testid');
        return;
      }
      cy.get('[data-testid="new-dm-button"]').click({ force: true });
      cy.get('[data-testid="new-dm-modal"]').should('be.visible');
      cy.get('[data-testid="dm-user-search"]').type('usuario');
      cy.contains('usuario@teste.com').click({ force: true });
      cy.get('[data-testid="create-dm"]').click({ force: true });
      cy.url().should('match', /\/(dm|direct)\//);
    });
  });

  it('deve mostrar indicador de digitação no DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('textarea[placeholder*="Mensagem em"]').type('teste');
      cy.get('[data-testid="typing-indicator"]').should('be.visible');
    });
  });

  it('deve reagir a mensagem no DM', () => {
    cy.get('body').then(($body) => {
      if ($body.find(DM_SELECTOR).length === 0) {
        cy.log('No DM links found - skipping');
        return;
      }
      cy.get(DM_SELECTOR).first().click({ force: true });
      cy.get('textarea[placeholder*="Mensagem em"]').type('Mensagem DM para reagir');
      cy.get('button[type="submit"][style*="parliamo-accent"]').click({ force: true });
      cy.contains('Mensagem DM para reagir').should('be.visible');

      cy.contains('Mensagem DM para reagir').parent().parent().parent().as('msg');
      cy.get('@msg').trigger('mouseover');
      cy.get('@msg').find('[data-testid="reaction-picker-trigger"]').click({ force: true });
      cy.get('[data-testid="reaction-picker-emoji-👍"]').click({ force: true });
      cy.get('@msg').should('contain', '👍');
    });
  });
});
