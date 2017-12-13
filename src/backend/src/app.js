import mongoose from 'mongoose'
import util from 'util'
import config from './config/env'
import app from './config/express'
import seed from 'seed-mongoose'

const debug = require('debug')('homein-api:index')

// plugin native promise in mongoose
mongoose.Promise = global.Promise

// connect to mongo db
mongoose.connect(
  config.db,
  {
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
  },
  function() {
    require('seed-mongoose')(
      {
        // suffix: '_seed',
        // logger: winston,
        mongoose: mongoose, //This is required
      },
      function(error, results) {
        console.log('seeded ' + results)
      },
    )
  },
)

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`)
})

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`)
  })
}

console.log('app.js' + app.get('env'))

export default app
