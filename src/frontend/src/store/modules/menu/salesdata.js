import lazyLoading from './lazyLoading.js'

export default {
  name: 'salesdata',
  meta: {
    title: 'Sales data',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  },
  path: '/salesdata',
  component: lazyLoading('sales/data')
}
