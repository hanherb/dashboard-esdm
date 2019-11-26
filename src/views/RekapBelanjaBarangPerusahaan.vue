<template lang="pug">
  <d-container fluid class="main-content-container px-4 pb-4">
    <label>Filter Tahun: </label>
    <d-row>
      <d-col md="1" class="form-group">
         <d-form-select :options="belanjaBarang.tahun" @change="filterTahun($event)"></d-form-select>
      </d-col>
    </d-row>
    <d-button-group class="">
      <d-button size="sm" type="button" class="btn-white" v-on:click="toggleAll">Show All</d-button>
      <d-button size="sm" type="button" class="btn-white" v-on:click="toggleRealisasi">Rencana</d-button>
      <d-button size="sm" type="button" class="btn-white" v-on:click="toggleRencana">Realisasi</d-button> 
    </d-button-group>
    <v-client-table class="dataTables_wrapper belanjaBarang" :data="belanjaBarang.tableData" :columns="belanjaBarang.columns" :options="belanjaBarang.clientTableOptions">
    </v-client-table>
    <br>
    <d-col md="12">
      <as-chart-barang />
    </d-col>
  </d-container>
</template>
<script>
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';
import headers from '@/headers';
import ChartBarang from '@/components/belanja-barang/ChartBarang.vue';
import Vue from 'vue';
import { ClientTable } from 'vue-tables-2';
import '@/assets/scss/vue-tables.scss';

Vue.use(ClientTable);

export default {
  name: 'rekap-belanja-barang-perusahaan',
  components: {
    ClientTable,
    asChartBarang: ChartBarang,
  },
  data(){
    return{
      origins: ['All'],
      belanjaBarang: {
        columns: ['', 'Kategori', 'Impor_1', 'Local Content_1', 'Local Expenditure_1', 'Impor_2', 'Local Content_2', 'Local Expenditure_2'],
        tableData: [],
        tahun: [],
        filterTahun: null,
        clientTableOptions: {
          headings: {
            'Impor_1': 'Rencana Impor', 
            'Local Content_1': 'Rencana Local Content', 
            'Local Expenditure_1': 'Rencana Local Expenditure', 
            'Impor_2': 'Realisasi Impor', 
            'Local Content_2': 'Realisasi Local Content', 
            'Local Expenditure_2': 'Realisasi Local Expenditure', 
          },
          perPage: 40,
          recordsPerPage: [10, 25, 50, 100],
          skin: 'transaction-history table dataTable',
          sortIcon: {
            base: 'fas float-right mt-1 text-muted',
            up: 'fa-caret-up',
            down: 'fa-caret-down',
          },
          texts: {
            filterPlaceholder: '',
            limit: 'Show',
          },
          pagination: {
            edge: true,
            nav: 'scroll',
          },
        },
      },
    }
  },

  created: function()
  {
    var d = new Date();
    this.belanjaBarang.filterTahun = d.getFullYear();
    var vm = this;
    this.fetchBelanjaBarang(() => {
      setTimeout(function() {
        vm.coloring();
      }, 1000);
    }, this.belanjaBarang.filterTahun);
  },

  methods: {
    presetTable() {
      var arrLetter = [
        'A','B','C','D','E','F','G','H','I','J',
        'K','L','M','N','O','P','Q','R','S','T'
      ];

      var arrKategori = [
        'HEAVY EQUIPMENT',
        'LAND TRANSPORT EQUIPMENT',
        'WATER TRANSPORT EQUIPMENT',
        'AIR TRANSPORT EQUIPMENT',
        'COMMUNICATION',
        'LAND SURVEY & RECOINASSANCE',
        'DRILLING EQUIPMENT',
        'SAMPLING & LAB',
        'REPAIR & MAINTENANCE',
        'BUILDING MATERIALS',
        'UTILITIES, FURNITURE & APPLIANCES',
        'CONSUMABLES: FUEL',
        'CONSUMABLES: FOOD',
        'MISCELLANEOUS',
        'MEDICAL: HEALTHY & SAFETY',
        'RECREATION FACILITY',
        'POWER STATION',
        'PROCESSING PLANT',
        'SCHOOL & TRAINING',
        'ENVIRONMENTAL'
      ];
      
      for(var i = 0; i < arrLetter.length; i++) {
        this.belanjaBarang.tableData.push({
          '': arrLetter[i],
          'Kategori': arrKategori[i],
          'Impor_1': 0, 
          'Local Content_1': 0, 
          'Local Expenditure_1': 0, 
          'Impor_2': 0, 
          'Local Content_2': 0, 
          'Local Expenditure_2': 0
        });
      }
    },
    resetColumn(cb) {
      this.belanjaBarang.columns = ['', 'Kategori', 'Impor_1', 'Local Content_1', 'Local Expenditure_1', 'Impor_2', 'Local Content_2', 'Local Expenditure_2'];
      if(cb)
        return cb();
    },
    fetchBelanjaBarang(cb, filterTahun) {
      var id = window.location.href.split("?id=")[1];
      this.belanjaBarang.tableData = [];
      this.presetTable();
      this.axios.get(address + ":3000/get-belanja-barang", headers).then((response) => {
        var temp = [];
        var total = {};
        var persentase = {};
        for(var i = 0; i < response.data.length; i++) {
          var tahun = response.data[i].data[0]["Tahun"];
          if(!this.belanjaBarang.tahun.includes(tahun)) {
            this.belanjaBarang.tahun.push(tahun);
            this.belanjaBarang.tahun.sort(function(a, b){return a-b});
          }
        }
        for(var i = 0; i < response.data.length; i++) {
          var tahun = response.data[i].data[0]["Tahun"];
          if(response.data[i].upload_by == id) {
            if(response.data[i].data[0]["Rencana/Realisasi"] == "Rencana") {
              var status = "rencana";
            }
            else {
              var status = "realisasi";
            }
            var impor = 0;
            var localContent = 0;
            var localExpenditure = 0;
            var kategori = response.data[i].data[0]["Jenis Barang"];
            for(var j = 0; j < response.data[i].data.length; j++) {
              console.log(response.data[i].data[j])
              if(response.data[i].data[j]["Negara"]) {
                impor += response.data[i].data[j]["Total Price (US$)"];
              }
              else if(response.data[i].data[j]["Produsen/Suplier"] == "Produsen") {
                localContent += response.data[i].data[j]["Total Price (US$)"];
              }
              else if(response.data[i].data[j]["Produsen/Suplier"] == "Suplier") {
                localExpenditure += response.data[i].data[j]["Total Price (US$)"];
              }
            }
            for(var k = this.belanjaBarang.tahun[0]; k <= this.belanjaBarang.tahun[this.belanjaBarang.tahun.length-1]; k++) {
              if(k == tahun) {
                temp.push({
                  "kategori": kategori,
                  "impor": impor,
                  "localContent": localContent,
                  "localExpenditure": localExpenditure,
                  "tahun": tahun,
                  "status": status
                });
              }
            }
          }
        }

        //calculate total & persentase
        for(var i = this.belanjaBarang.tahun[0]; i <= this.belanjaBarang.tahun[this.belanjaBarang.tahun.length-1]; i++) {
          var tempTotalImpor1 = 0;
          var tempTotalLocalContent1 = 0;
          var tempTotalLocaExpenditure1 = 0;
          var tempTotalImpor2 = 0;
          var tempTotalLocalContent2 = 0;
          var tempTotalLocaExpenditure2 = 0;
          for(var j = 0; j < temp.length; j++) {
            if(temp[j].tahun == i) {
              if(temp[j].status == "rencana") {
                tempTotalImpor1 += temp[j]["impor"];
                tempTotalLocalContent1 += temp[j]["localContent"];
                tempTotalLocaExpenditure1 += temp[j]["localExpenditure"];
              }
              else {
                tempTotalImpor2 += temp[j]["impor"];
                tempTotalLocalContent2 += temp[j]["localContent"];
                tempTotalLocaExpenditure2 += temp[j]["localExpenditure"];
              }
            }
          }

          var tahun = String(i);
          total[tahun] = {};
          persentase[tahun] = {};

          total[tahun]["impor1"] = tempTotalImpor1;
          total[tahun]["localContent1"] = tempTotalLocalContent1;
          total[tahun]["localExpenditure1"] = tempTotalLocaExpenditure1;
          total[tahun]["impor2"] = tempTotalImpor2;
          total[tahun]["localContent2"] = tempTotalLocalContent2;
          total[tahun]["localExpenditure2"] = tempTotalLocaExpenditure2;
          persentase[tahun]["impor1"] = (tempTotalImpor1 / (tempTotalImpor1 + tempTotalLocalContent1 + tempTotalLocaExpenditure1)) * 100;
          persentase[tahun]["localContent1"] = (tempTotalLocalContent1 / (tempTotalImpor1 + tempTotalLocalContent1 + tempTotalLocaExpenditure1)) * 100;
          persentase[tahun]["localExpenditure1"] = (tempTotalLocaExpenditure1 / (tempTotalImpor1 + tempTotalLocalContent1 + tempTotalLocaExpenditure1)) * 100;
          persentase[tahun]["impor2"] = (tempTotalImpor2 / (tempTotalImpor2 + tempTotalLocalContent2 + tempTotalLocaExpenditure2)) * 100;
          persentase[tahun]["localContent2"] = (tempTotalLocalContent2 / (tempTotalImpor2 + tempTotalLocalContent2 + tempTotalLocaExpenditure2)) * 100;
          persentase[tahun]["localExpenditure2"] = (tempTotalLocaExpenditure2 / (tempTotalImpor2 + tempTotalLocalContent2 + tempTotalLocaExpenditure2)) * 100;
        }

        //mengisi tabel
        for(var i = 0; i < this.belanjaBarang.tableData.length; i++) {
          for(var j = 0; j < temp.length; j++) {
            if(temp[j]["tahun"] == filterTahun) {
              if(temp[j]["kategori"] == this.belanjaBarang.tableData[i]["Kategori"]) {
                if(temp[j]["status"] == "rencana") {
                  this.belanjaBarang.tableData[i]["Impor_1"] = temp[j]["impor"].toLocaleString();
                  this.belanjaBarang.tableData[i]["Local Content_1"] = temp[j]["localContent"].toLocaleString();
                  this.belanjaBarang.tableData[i]["Local Expenditure_1"] = temp[j]["localExpenditure"].toLocaleString();
                }
                else {
                  this.belanjaBarang.tableData[i]["Impor_2"] = temp[j]["impor"].toLocaleString();
                  this.belanjaBarang.tableData[i]["Local Content_2"] = temp[j]["localContent"].toLocaleString();
                  this.belanjaBarang.tableData[i]["Local Expenditure_2"] = temp[j]["localExpenditure"].toLocaleString();
                }
              }
            }
          }
        }

        this.belanjaBarang.tableData.push({
          'Kategori': 'Total',
          'Impor_1': total[filterTahun]["impor1"].toLocaleString(),
          'Local Content_1': total[filterTahun]["localContent1"].toLocaleString(),
          'Local Expenditure_1': total[filterTahun]["localExpenditure1"].toLocaleString(),
          'Impor_2': total[filterTahun]["impor2"].toLocaleString(),
          'Local Content_2': total[filterTahun]["localContent2"].toLocaleString(),
          'Local Expenditure_2': total[filterTahun]["localExpenditure2"].toLocaleString(),
        });
        this.belanjaBarang.tableData.push({
          'Kategori': 'Persentase (%)',
          'Impor_1': persentase[filterTahun]["impor1"].toLocaleString(),
          'Local Content_1': persentase[filterTahun]["localContent1"].toLocaleString(),
          'Local Expenditure_1': persentase[filterTahun]["localExpenditure1"].toLocaleString(),
          'Impor_2': persentase[filterTahun]["impor2"].toLocaleString(),
          'Local Content_2': persentase[filterTahun]["localContent2"].toLocaleString(),
          'Local Expenditure_2': persentase[filterTahun]["localExpenditure2"].toLocaleString(),
        });
        if(cb)
          return cb();
      })
    },
    coloring() {
      for(var i = 3; i <= 5; i++) {
        for(var j = 0; j < this.belanjaBarang.tableData.length; j++) {
          document.querySelectorAll(".belanjaBarang td:nth-child(" + i + ")")[j].classList.add('rencana-column');
          document.querySelectorAll(".belanjaBarang td:nth-child(" + i + ")")[j].classList.remove('realisasi-column');
        }
      }
      for(var i = 6; i <= 8; i++) {
        for(var j = 0; j < this.belanjaBarang.tableData.length; j++) {
          document.querySelectorAll(".belanjaBarang td:nth-child(" + i + ")")[j].classList.add('realisasi-column');
          document.querySelectorAll(".belanjaBarang td:nth-child(" + i + ")")[j].classList.remove('rencana-column');
        }
      }
    },
    toggleColor() {
      for(var i = 3; i <= 5; i++) {
        for(var j = 0; j < this.belanjaBarang.tableData.length; j++) {
          document.querySelectorAll(".belanjaBarang td:nth-child(" + i + ")")[j].classList.add('realisasi-column');
        }
      }
    },
    toggleAll() {
      var vm = this;
      this.resetColumn(() => {
        setTimeout(function() {
          vm.coloring();
        }, 0);
      });
    },
    toggleRencana() {
      for(var i = 0; i < this.belanjaBarang.columns.length; i++) {
        if(this.belanjaBarang.columns[i].split('_')[1] == "1") {
          this.belanjaBarang.columns.splice(i, 3);
        }
      }
      this.toggleColor();
    },
    toggleRealisasi() {
      for(var i = 0; i < this.belanjaBarang.columns.length; i++) {
        if(this.belanjaBarang.columns[i].split('_')[1] == "2") {
          this.belanjaBarang.columns.splice(i, 3);
        }
      }
    },
    filterTahun(tahun) {
      this.belanjaBarang.filterTahun = tahun;
      var vm = this;
      this.fetchBelanjaBarang(() => {
        setTimeout(function() {
          vm.coloring();
        }, 1000);
      }, this.belanjaBarang.filterTahun);
    },
  }
}
</script>

<style>
  .rencana-column {
    background-color: #f2ff63;
  }

  .realisasi-column {
    background-color: #9ced66;
  }
</style>
