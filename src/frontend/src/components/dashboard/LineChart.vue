<template>
    
    <div class="col-md-12">
      
          <div class=row>
            <div class="col-md-3">

                <div class=row>
                    <div class="col-md-10">
                      <h3>Dates</h3>
                    </div>
                    <div class="col-md-2 actionIcon">
                      <a href="#" @click="addDate">
                        <span class="fa fa-plus fa-lg"></span>
                      </a>
                    </div>
                </div>

                <div v-for="(date, index) in dates">

                  <div class=row>
                    <div class="col-md-5">
                      <datepicker language="fr" :format="customFormatter" 
                          v-model="date.begin" v-on:selected="d => beginDateChanged(index, d)"></datepicker>
                    </div>
                    <div class="col-md-5">
                      <datepicker language="fr" :format="customFormatter" 
                          v-model="date.end" v-on:selected="d => endDateChanged(index, d)"></datepicker>
                    </div>
                    <div class="col-md-2 actionIcon">
                      <a href="#" @click="d => removeDate(index)">
                        <span class="fa fa-minus fa-lg"></span>
                      </a>
                    </div>
                  </div>
                
                </div>

            </div>
          <br />
          <div class="col-md-9">

            <vuestic-chart :data="lineChartData" :options="lineDataOptions" type="line"></vuestic-chart>

        </div>

      </div>

 </div>

</template>

<script>
  import VuesticChart from '../vuestic-components/vuestic-chart/VuesticChart.vue'
  // import utils from 'services/utils'
  // import store from 'vuex-store'
  import axios from 'axios'
  import config from '@/helpers/config'
  import Datepicker from 'vuejs-datepicker'
  
  // let palette = store.getters.palette

  export default {
    name: 'LineChart',
    props: ['type'],
    components: {
      VuesticChart,
      Datepicker
    },
    data: function () {
      return {
        localChartData: {},
        lineChartData: {},
        lineDataOptions: {},
        filters: [],
        dates: []
      }
    },
    mounted: async function () {
      let currentMonthBegin = this.$moment().startOf('month')
      let currentMonthEnd = this.$moment().endOf('month')

      this.dates = [
        {
          begin: currentMonthBegin.toDate(),
          end: currentMonthEnd.toDate(),
          data: []
        },
        {
          begin: currentMonthBegin.add(-1, 'months').toDate(),
          end: currentMonthEnd.add(-1, 'months').toDate(),
          data: []
        },
        {
          begin: currentMonthBegin.add(-11, 'months').toDate(),
          end: currentMonthEnd.add(-11, 'months').toDate(),
          data: []
        }
      ]
      this.localChartData = {
        labels: [],
        datasets: []
      }
      for (let i = 0; i < this.dates.length; i++) {
        await this.fetchData(this.dates[i])
        this.setChartData(this.dates[i])
      }

      this.updateLabelAndChart()
      this.setOptionsData()
    },
    methods: {
      updateLabelAndChart: function () {
        this.localChartData.labels = []

        for (let i = 0; i < this.localChartData.datasets.length; i++) {
          // if (this.localChartData.datasets[i].data != null) {
          for (let j = 0; j < this.localChartData.datasets[i].data.length; j++) {
            if (this.localChartData.labels[j] === undefined) {
              this.localChartData.labels[j] = []
            }
            this.localChartData.labels[j].push(this.localChartData.datasets[i].data[j].x)
          }
          // }
        }

        this.lineChartData = Object.assign({}, this.localChartData)

        this.$emit('dataChanged', this.dates)
      },
      beginDateChanged: function (index, val) {
        this.dates[index].begin = val
        this.updateChart(index)
      },
      endDateChanged: function (index, val) {
        this.dates[index].end = val
        this.updateChart(index)
      },
      updateChart: async function (index) {
        let dateFilter = this.dates[index]
        await this.fetchData(this.dates[index])
        this.localChartData.datasets[index].data = this.dates[index].data
        this.localChartData.datasets[index].label = this.customFormatter(dateFilter.begin) + ' - ' + this.customFormatter(dateFilter.end)
        this.updateLabelAndChart()
      },
      addDate: async function () {
        let newDate = {
          begin: this.$moment().startOf('month').toDate(),
          end: this.$moment().endOf('month').toDate()
        }
        this.dates.push(newDate)
        await this.fetchData(newDate)
        this.setChartData(newDate)

        this.updateLabelAndChart()
      },
      removeDate: function (index) {
        this.dates.splice(index, 1)
        this.localChartData.datasets.splice(index, 1)

        this.updateLabelAndChart()
      },
      fetchData: async function (date) {
        let retour = await axios.get(
          config.apiUrl +
            '/sales/stats?type=' + this.type +
            '&begin=' + this.queryFormatter(date.begin) +
            '&end=' + this.queryFormatter(date.end))

        if (retour.data != null) {
          date.data = this._.map(retour.data, function (item) {
            return { x: item.time, y: item.sum }
          })

          date.mean = (this._.meanBy(date.data, 'y')).toFixed(2)
          date.sum = (this._.sumBy(date.data, 'y')).toFixed(2)

          let max = this._.maxBy(date.data, 'y')
          if (max !== undefined) {
            date.max = max.y.toFixed(2)
          }
        }
      },
      setChartData: function (dateFilter) {
        let color = this.getRandomColor()
        this.localChartData.datasets.push(
          {
            label: this.customFormatter(dateFilter.begin) + ' - ' + this.customFormatter(dateFilter.end),
            data: dateFilter.data,
            backgroundColor: color,
            borderColor: color.replace('0.4', '1')
          }
        )
      },
      setOptionsData: function (data) {
        this.lineDataOptions = {
          responsive: true,
          title: {
            display: false
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return 'Label'
              }
            }
          },
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'value'
              }
            }]
          }
        }
      },
      getRandomColor: function () {
        var trans = '0.4'
        var color = 'rgba('
        for (var i = 0; i < 3; i++) {
          color += Math.floor(Math.random() * 255) + ','
        }
        color += trans + ')'
        return color
      },
      customFormatter: function (date) {
        return this.$moment(date).format('DD/MM/YYYY')
      },
      queryFormatter: function (date) {
        return this.$moment(date).format('YYYY-MM-DD')
      }
    }
  }

</script>

<style lang="scss">
  @import "../../sass/_variables.scss";

  .vdp-datepicker input {
    width: 90px;
  }
  .row {
    padding-bottom: 5px;
  }

  .actionIcon {
    text-align: right
  }
</style>
