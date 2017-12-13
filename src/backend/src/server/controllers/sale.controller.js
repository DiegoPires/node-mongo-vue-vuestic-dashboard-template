import Sale from '../models/sale.model'

/**
 * Get sales list.
 * @property {number} req.query.skip - Number of Sales to be skipped.
 * @property {number} req.query.limit - Limit number of Sales to be returned.
 * @returns {Sale[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query
  Sale.dataTables({
    limit: req.query.per_page,
    skip: (req.query.page - 1) * req.query.per_page,
    // search: {
    //   value: req.query.filter,
    //   fields: ['type'],
    // },
    sort: {
      timeStamp: 1,
    },
  }).then(function(table) {
    table.per_page = req.query.per_page
    table.current_page = req.query.page
    table.last_page = table.total / req.query.per_page
    //next_page_url":"https:\/\/vuetable.ratiw.net\/api\/users?page=2","prev_page_url":null,
    //table.from = 1
    //table.to = 15

    res.json(table) // table.total, table.data
  })
}

/**
 * Insert a new sale.
 * @property {Date} req.body.timeStamp
 * @property {Number} type
 * @property {Number} value
 * @property {Number} accountId
 * @returns {Sale}
 */
function insert(req, res, next) {
  var new_sale = new Sale(req.body)
  new_sale.save(function(err, sale) {
    if (err) res.send(err)
    res.json(sale)
  })
}

function bulkInsert(req, res, next) {
  Sale.insertMany(req.body.sales)
    .then(function(sales) {
      res.sendStatus(200)
    })
    .catch(function(err) {
      res.send(err)
    })
}

export default {
  list,
  insert,
  bulkInsert,
}
