import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'

/**
 * User Schema
 */
const TypeSchema = new mongoose.Schema({
  type: String,
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
TypeSchema.method({})

/**
 * Statics
 */
TypeSchema.statics = {
  list() {
    return this.find()
      .sort({ type: 1 })
      .exec()
  },
}

/**
 * @typedef Type
 */
export default mongoose.model('Type', TypeSchema)
