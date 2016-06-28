import hapi from 'hapi';
import Container from 'blister';

import HapiBlisterDependency from '../es/index';

describe('HapiBlisterDependency', () => {
  function createServerWithPlugin({ container }) {
    const server = new hapi.Server();
    server.connection();
    server.register({
      register: HapiBlisterDependency,
      options: { container }
    });
    return server;
  }

  it('should be a Hapi plugin', () => {
    expect(HapiBlisterDependency.register).toEqual(jasmine.any(Function));
    expect(HapiBlisterDependency.register.attributes.pkg.name).toBe('hapi-blister-dependency');
  });

  describe('when it is registered', () => {
    it('should register a handler that fetches the function from the given container', done => {
      const fooHandler = (request, reply) => reply('OK');

      const container = new Container();
      container.service('foo-dependency', () => fooHandler);

      const server = createServerWithPlugin({ container });
      server.route({
        method: 'GET',
        path: '/foo',
        handler: {
          dependencyId: 'foo-dependency'
        }
      });

      server.inject('/foo').then(response => {
        expect(response.payload).toBe('OK');
        done();
      });
    });
  });
});
