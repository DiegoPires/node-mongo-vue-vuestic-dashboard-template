var faker = require('faker')

var data = []

for (var i = 0; i < 100000; i++) {
  data.push({
    timeStamp: faker.date.between('2015-01-01', '2017-12-11'),
    type: faker.random.arrayElement(['CC added', 'Inscription', 'Sale', 'Montly payement']),
    value: faker.finance.amount(),
    accountId: faker.random.number({ min: 1, max: 666 }),
  })
}

module.exports = {
  model: 'Sale',
  data: data,
}
