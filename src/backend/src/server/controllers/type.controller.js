import Type from '../models/Type.model'

/**
 * Get Types list.
 * @returns {Type[]}
 */
function list(req, res, next) {
  Type.list()
    .then(Types => res.json(Types))
    .catch(e => next(e))
}

/**
 * Insert a new Type.
 * @property {Number} type
 * @property {String} name
 * @returns {Type}
 */
function insert(req, res, next) {
  var new_Type = new Type(req.body)
  new_Type.save(function(err, task) {
    if (err) res.send(err)
    res.json(task)
  })
}

export default {
  list,
  insert,
}
