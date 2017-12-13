import { Line, mixins } from 'vue-chartjs'
import DefaultOptions from '../DefaultOptions'

const { reactiveProp } = mixins

export default Line.extend({
  props: ['options'],
  mixins: [reactiveProp],
  data () {
    return {
      defaultOptions: {

      }
    }
  },

  mounted () {
    let options = Object.assign({}, DefaultOptions, this.defaultOptions, this.options)
    this.renderChart(this.chartData, options)
  }
})
