import Joi from 'joi'

export default {
  // POST /api/sales/
  insert: {
    body: {
      timeStamp: Joi.date()
        .iso()
        .required(),
      type: Joi.number().required(),
      value: Joi.number().required(),
      accountId: Joi.number().required(),
    },
  },
}
