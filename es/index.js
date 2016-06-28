import packageJSON from '../package.json';

/**
 * Hapi plugin to add the "dependencyId" handler to the server.
 * That handler uses the dependency with the given ID as the handler for the route.
 *
 * @example
 *
 * container.service('my-handler', () => {
 *   return (request, reply) => {
 *     reply('It works!');
 *   };
 * });
 *
 * // Registration
 * server.register({
 *   register: HapiBlisterDependency,
 *   options: {
 *     container
 *   }
 * }, error => {
 *
 *   // Usage
 *   server.route({
 *     path: '/test',
 *     handler: {
 *       dependencyId: 'my-handler'
 *     }
 *   });
 *
 *   // GET /test => It works!
 * });
 *
 * @type {Object}
 */
const HapiBlisterDependency = {

  /**
   * Registers the plugin in the Hapi server
   * @param  {hapi.Server}        server
   * @param  {Object}             options
   * @param  {blister.Container}  options.container
   * @param  {Function}           notifyRegistration
   */
  register(server, options, notifyRegistration) {
    const container = options.container;

    server.handler('dependencyId', (route, dependencyId) => {
      return container.get(dependencyId);
    });

    notifyRegistration();
  }
};

HapiBlisterDependency.register.attributes = {
  pkg: packageJSON
};

export default HapiBlisterDependency;
