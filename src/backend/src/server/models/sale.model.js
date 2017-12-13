import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'
import dataTables from 'mongoose-datatables'
/**
 * User Schema
 */
const SaleSchema = new mongoose.Schema({
  timeStamp: Date,
  type: String,
  value: Number,
  accountId: Number,
})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SaleSchema.method({})

/**
 * Statics
 */
SaleSchema.statics = {
  /**
   * List sales in descending order of 'timeStamp' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ timeStamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
  },
}

/**
 * @typedef Sale
 */
SaleSchema.plugin(dataTables)

export default mongoose.model('Sale', SaleSchema)
// export default SaleSchema.plugin(dataTables)
