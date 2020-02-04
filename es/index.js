import packageJSON from '../package.json';

/**
 * Hapi plugin to add the "dependencyId" handler to the server.
 * That handler uses the dependency with the given ID as the handler for the route.
 *
 * @example
 *
 * container.service('my-handler', () => {
 *   return (request, h) => {
 *     h.response('It works!');
 *   };
 * });
 *
 * await server.register({
 *   plugin: HapiBlisterDependency,
 *   options: { container }
 * });
 *
 * @type {Object}
 */
export default {
  pkg: packageJSON,

  /**
  * Registers the plugin in the Hapi server
  * @param  {hapi.Server}        server
  * @param  {Object}             options
  * @param  {blister.Container}  options.container
  */
  register(server, options) {
    const { container } = options;

    server.decorate(
      'handler',
      'dependencyId',
      (route, dependencyId) => container.get(dependencyId),
    );
  },
};
