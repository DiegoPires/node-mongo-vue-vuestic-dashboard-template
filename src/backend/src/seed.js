import MongooseSeed from 'mongoose-seed-db'
import config from './config/env'

MongooseSeed.connect(config.db)
  .then(() => {
    MongooseSeed.loadModels(__dirname + '/server/models')
    // MongooseSeed.clearModels(['User'])
    //  .then(() => {
    MongooseSeed.populate(__dirname + '/../seeds/', {
      populateExisting: false,
    })
      .then(() => {
        process.exit()
      })
      .catch(error => {
        throw error
      })
    // })
    // .catch(error => {
    //   throw error
    // })
  })
  .catch(error => {
    throw error
  })
