describe('API Stress Testing', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
    cy.get('input[type="email"]').clear().type('souzagamer14@gmail.com');
    cy.get('input[type="password"]').clear().type('@Multilaser9');
    cy.contains('button[type="submit"]', 'Entrar').click({ force: true });
    cy.url({ timeout: 20000 }).should('not.include', '/auth/login');
  });

  it('deve lidar com 50 requisições simultâneas', () => {
    cy.get('a[href*="/channel/"]').first().click();
    const requests = [];
    for (let i = 0; i < 50; i++) {
      requests.push(
        cy.request({
          method: 'POST',
          url: '/api/v1/messages',
          body: { content: `Stress test ${i}`, channel_id: 'ch-1' },
          failOnStatusCode: false,
        })
      );
    }
    cy.wrap(Promise.all(requests)).then((responses) => {
      const success = responses.filter(r => r.status < 400).length;
      expect(success).to.be.greaterThan(40);
    });
  });

  it('deve responder em menos de 200ms para GET', () => {
    const start = Date.now();
    cy.request('/api/v1/channels').then(() => {
      const duration = Date.now() - start;
      expect(duration).to.be.lessThan(200);
    });
  });
});