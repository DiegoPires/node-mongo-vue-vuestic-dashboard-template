import lazyLoading from './lazyLoading'

export default {
  name: 'Data',
  path: '/data',
  component: lazyLoading('tables/Table'),
  meta: {
    visible: true,
    default: true,
    title: 'Raw data',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  }
}
