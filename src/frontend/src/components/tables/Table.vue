<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        
        <widget>
          <div slot="header">
            Raw data
          </div>
          <div slot="body">
            <data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :itemsPerPage="itemsPerPage"
                        :sortFunctions="sortFunctions"
                        :apiMode="apiMode"
                        :paginationPath="paginationPath"></data-table>
          </div>
        </widget>
      </div>
    </div>

  </div>
</template>

<script>
  import Widget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import DataTable from '../vuestic-components/vuestic-datatable/VuesticDataTable'
  import FieldsDef from '../vuestic-components/vuestic-datatable/data/fields-definition'
  import ItemsPerPageDef from '../vuestic-components/vuestic-datatable/data/items-per-page-definition'

  export default {
    components: {
      DataTable,
      Widget
    },
    name: 'Table',
    data () {
      return {
        apiUrl: 'http://localhost:8081/sales',
        apiMode: true,
        tableFields: FieldsDef.tableFields,
        itemsPerPage: ItemsPerPageDef.itemsPerPage,
        sortFunctions: FieldsDef.sortFunctions,
        paginationPath: ''
      }
    }
  }
</script>

<style lang="scss">

  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
</style>
