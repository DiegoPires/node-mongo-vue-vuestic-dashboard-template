import mongoose from 'mongoose'
import util from 'util'
import config from './config/env'
import app from './config/express'
import User from './server/models/user.model'

const debug = require('debug')('homein-api:index')

// plugin native promise in mongoose
mongoose.Promise = global.Promise

// connect to mongo db
mongoose.connect(config.db, {
  server: {
    socketOptions: {
      keepAlive: 1,
    },
  },
})

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

// TODO: Not really a got practice, find a way to do this on the seed file...
// create first if not there already, otherwise crash silently
User.register(new User({ email: 'asd@asd.com' }), 'asd', (err, user) => {
  // console.log(err)
})

export default app
