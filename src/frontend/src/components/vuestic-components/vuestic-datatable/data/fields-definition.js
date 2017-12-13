// import moment from 'moment'

export default {
  tableFields: [
    {
      name: 'timeStamp',
      sortField: 'sort',
      callback: 'formatDate|D/MM/Y'
    },
    {
      name: 'type',
      sortField: 'sort'
    },
    {
      name: 'value',
      sortField: 'sort'
    },
    {
      name: 'accountId',
      sortField: 'sort'
    }
  ],
  sortFunctions: {
    'sort': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
