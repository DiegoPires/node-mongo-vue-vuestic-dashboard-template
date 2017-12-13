// import Stats from '../models/Stats.model'
import Sale from '../models/sale.model'
import moment from 'moment'

/**
 * Get Types list.
 * @returns {Type[]}
 */
function getStats(req, res, next) {
  let begin = moment(req.query.begin)
  let end = moment(req.query.end)
  let type = req.query.type

  let groupAs = '%Y-%m-%d'

  if (end.diff(begin, 'years') > 3) {
    groupAs = '%Y'
    // } else if (end.diff(begin, 'weeks') > 4 && end.diff(begin, 'weeks') < 20) {
    //   groupAs = '$U'
  } else if (end.diff(begin, 'days') > 31) {
    groupAs = '%Y-%m'
  }

  // console.log('-≥' + begin.toDate())
  // console.log('-≥' + end.toDate())
  // console.log('-≥' + type)

  Sale.aggregate([
    {
      $match: {
        $and: [{ timeStamp: { $gt: begin.toDate() } }, { timeStamp: { $lt: end.toDate() } }, { type: type }],
      },
    },
    {
      $group: {
        _id: {
          time: { $dateToString: { format: groupAs, date: '$timeStamp' } },
          type: '$type',
        },
        sum: { $sum: '$value' },
      },
    },
    { $project: { type: '$_id.type', time: '$_id.time', sum: '$sum', _id: 0 } },
    { $sort: { type: 1, time: 1 } },
  ])
    .then(Stats => res.json(Stats))
    .catch(e => next(e))
}

export default {
  getStats,
}
