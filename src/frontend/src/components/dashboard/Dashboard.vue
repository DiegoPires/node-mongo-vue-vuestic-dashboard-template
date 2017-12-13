<template>
  <div class="dashboard">
    <div class="charts-page">
      <vuestic-tabs :names="names" v-on:tabActivate="tabActivate" ref="tabs">
        <div :slot="activeName">
          
          <div class="col-md-12">
            <line-chart @dataChanged="dataChanged" :type="currentType" />
          </div>

        </div>
      </vuestic-tabs>
    </div>
    <br />
    <div class="row dashboard-info-widgets">
      <div class="col" v-for="date in dates">
        <vuestic-widget class="info-widget">
          <div slot="body" class="info-widget-inner">
            <div class="">

              <div class="row">
                <div class="col-md-4">
                  Total:
                </div>
                <div class="col-md-8 stats-number">
                  {{ date.sum }}
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  Avg:
                </div>
                <div class="col stats-number">
                   {{ date.mean }}
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  High:
                </div>
                <div class="col stats-number">
                   {{ date.max }}
                </div>
              </div>
              
              <div class="stats-title">
                {{ date.begin | formatDate }} - {{ date.end | formatDate }}
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticTabs from '../vuestic-components/vuestic-tabs/VuesticTabs.vue'
  import LineChart from './LineChart'
  import axios from 'axios'
  import config from '@/helpers/config'
  import moment from 'moment'

  export default {
    name: 'dashboard',
    components: {
      LineChart,
      VuesticTabs,
      VuesticWidget
    },
    data: function () {
      return {
        types: [],
        names: [],
        activeName: {},
        currentType: {},
        dates: []
      }
    },
    mounted: function () {
      this.fetchData()
    },
    methods: {
      tabActivate: function (typeSelected) {
        this.activeName = typeSelected
        this.currentType = this._.find(this.types, { type: this.activeName }).type
      },
      fetchData: async function () {
        const retour = await axios.get(config.apiUrl + '/types')

        this.types = retour.data
        this.types.forEach(element => {
          this.names.push(element.type)
        })
      },
      dataChanged: function (val) {
        this.dates = val
      }
    },
    filters: {
      formatDate: function (date) {
        return moment(date).format('DD/MM/YYYY')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
  .stats-number, .stats-title {
    line-height: 1;
  }
  .stats-title{
    font-weight: bold;
    border-top: 1px solid black;
    padding: 15px 30px 0px 30px
  }
  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    &.has-chart {
      justify-content: space-between;
    }
    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  .stats-number {
    text-align: right;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.625rem;
    margin-bottom: 0.5rem;
    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;
      &.icon-wide {
        left: -1.875rem;
      }
    }
  }
</style>
