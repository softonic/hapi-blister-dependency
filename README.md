# hapi-blister-dependency

Hapi plugin to add the "dependencyId" handler to the server. That handler uses the dependency with the given ID as the handler for the route.

Active maintainer: [ruben.norte@softonic.com](mailto:ruben.norte@softonic.com?subject=hapi-blister-dependency)

## Installation

```bash
npm install hapi-blister-dependency
```

## Usage

```javascript
// CommonJS
// const HapiBlisterDependency = require('hapi-blister-dependency');

// ES6
import HapiBlisterDependency from 'hapi-blister-dependency';
import Blister from 'blister';

const container = new Blister();

container.service('my-handler', () => {
  return (request, reply) => {
    reply('It works!');
  };
});

// Registration
server.register({
  register: HapiBlisterDependency,
  options: { container }
}, error => {
  // Usage
  server.route({
    path: '/test',
    handler: {
      dependencyId: 'my-handler'
    }
  });

  // GET /test => It works!
});
```

## Testing

Clone the repository and execute:

```bash
npm test
```

## Contribute

1. Fork it: `git clone ssh://git@stash.redtonic:7999/NODE/hapi-blister-dependency.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
