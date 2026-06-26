describe('API Security', () => {
  it('deve validar CSRF token', () => {
    cy.request({
      method: 'POST',
      url: '/api/v1/messages',
      body: { content: 'test', channel_id: 'ch-1' },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 403, 400]);
    });
  });

  it('deve bloquear SQL injection', () => {
    cy.request({
      method: 'POST',
      url: '/api/v1/search',
      body: { query: "'; DROP TABLE users; --" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 403]);
    });
  });

  it('deve ter rate limiting', () => {
    const requests = Array.from({ length: 20 }, () =>
      cy.request({
        method: 'GET',
        url: '/api/v1/channels',
        failOnStatusCode: false,
      })
    );
    
    cy.wrap(Promise.all(requests)).then((responses) => {
      const rateLimited = responses.some(r => r.status === 429);
      expect(rateLimited).to.be.true;
    });
  });
});