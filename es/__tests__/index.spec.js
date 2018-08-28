import hapi from 'hapi';
import Container from 'blister';
import HapiBlisterDependency from '../index';

function createServerWithPlugin({ container }) {
  const server = new hapi.Server();

  server.register({
    plugin: HapiBlisterDependency,
    options: { container },
  });
  return server;
}

describe('HapiBlisterDependency', () => {
  it('should be a Hapi plugin', () => {
    expect(HapiBlisterDependency.register).toBeInstanceOf(Function);
    expect(HapiBlisterDependency.pkg.name).toBe('hapi-blister-dependency');
  });

  describe('when it is registered', () => {
    it('should register a handler that fetches the function from the given container', async () => {
      const fooHandler = (request, h) => h.response('OK');
      const container = new Container();
      container.service('foo-dependency', () => fooHandler);

      const server = createServerWithPlugin({ container });
      server.route({
        method: 'GET',
        path: '/foo',
        handler: {
          dependencyId: 'foo-dependency',
        },
      });

      const response = await server.inject('/foo');
      expect(response.payload).toBe('OK');
    });
  });
});
