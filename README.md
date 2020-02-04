# hapi-blister-dependency

Hapi plugin to add the "dependencyId" handler to the server. That handler uses the dependency with the given ID as the handler for the route.

## Installation

```bash
npm install @softonic/hapi-blister-dependency
```

## Usage

```javascript
// CommonJS
// const HapiBlisterDependency = require('@softonic/hapi-blister-dependency');

// ES6
import HapiBlisterDependency from '@softonic/hapi-blister-dependency';
import Blister from 'blister';

const container = new Blister();

container.service('my-handler', () => {
  return (request, h) => {
    h.response('It works!');
  };
});

// Registration
await server.register({
  plugin: HapiBlisterDependency,
  options: { container }
});

server.route({
  path: '/test',
  handler: {
    dependencyId: 'my-handler'
  }
});

// GET /test => It works!

```

## Testing

Clone the repository and execute:

```bash
npm test
```

## Contribute

1. Fork it: `git clone https://github.com/softonic/hapi-blister-dependency.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
