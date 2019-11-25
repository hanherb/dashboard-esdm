<template>
  <d-card class="card-small lo-stats h-100">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">Verifikasi Belanja Barang</h6>
      <div class="block-handle"></div>
    </d-card-header>

    <d-card-body class="p-0">
      <d-container fluid class="px-0">

        <!-- Latest Orders List -->
        <table class="table mb-0">
          <thead class="py-2 bg-light text-semibold border-bottom">
            <tr>
              <th>Nama Barang</th>
              <th class="text-center">Qty</th>
              <th class="text-center">Harga</th>
              <th class="text-center">Kategori</th>
              <th class="text-center">Spesifikasi</th>
              <th class="text-center">Negara Asal</th>
              <th class="text-center">Supplier Yang Menjual</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="barang in belanjaBarang">
              <td class="lo-stats__total">{{ barang.nama }}</td>
              <td class="lo-stats__items text-center">{{ barang.qty }}</td>
              <td class="lo-stats__total text-center text-success">$ {{ barang.harga.toLocaleString() }}</td>
              <td class="lo-stats__total text-center">{{ barang.kategori }}</td>
              <td class="lo-stats__total text-center">{{ barang.spesifikasi }}</td>
              <td class="lo-stats__total text-center">{{ barang.negara_asal }}</td>
                <td class="lo-stats__total text-center">
                  <d-link :to="'/user-profile?id=' + barang.supplier_id">{{ barang.supplier }}</d-link>
                </td>
            </tr>
          </tbody>
        </table>

      </d-container>
    </d-card-body>

    <d-card-footer class="border-top">
      <d-row>

        <!-- Time Frame -->
        <d-col>
          
        </d-col>

      </d-row>
    </d-card-footer>

  </d-card>
</template>

<script>
import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';
import headers from '@/headers';

export default {
  name: 'commerce',
  data(){
      return{
          commerces: [],
          belanjaBarang: [],
          tahun: [],
          status: 'Available'
      }
  },

  created: function()
  {
      this.fetchItems(() => {
        this.fetchBelanjaBarang();
      });
  },

  methods: {
    fetchItems(cb) {
      this.axios.get(address + ":3000/get-commerce", headers).then((response) => {
        let query = gql.allCommerce;
        graphqlFunction.graphqlFetchAll(query, (result) => {
        	console.log(result);
          	if(this.$session.get('user').role == "admin") {
            	for(var i = 0; i < result.commerces.length; i++) {
              		this.commerces.push(result.commerces[i]);
            	}
      		}
      		if(cb)
          		return cb();
        });
      });
    },
    fetchBelanjaBarang() {
      var id = window.location.href.split("?id=")[1];
      this.belanjaBarang.tableData = [];
      this.axios.get(address + ":3000/get-belanja-barang", headers).then((response) => {
        for(var i = 0; i < response.data.length; i++) {
          if(response.data[i].upload_by == id) {
            if(response.data[i].data[0]["Tahun"]) {
              if(!this.tahun.includes(response.data[i].data[0]["Tahun"])) {
                this.tahun.push(response.data[i].data[0]["Tahun"]);
                this.tahun.sort(function(a, b){return a-b});
              }
            }
          }
        }
        for(var i = 0; i < response.data.length; i++) {
          if(response.data[i].upload_by == id) {
            if(response.data[i].data[0]["Tahun"] == this.tahun[this.tahun.length-1]) {
              if(response.data[i].data[0]["Rencana/Realisasi"] == "Realisasi") {
                var kategori = response.data[i].data[0]["Jenis Barang"];
                for(var j = 0; j < response.data[i].data.length; j++) {
                  for(var k = 0; k < this.commerces.length; k++) {
                    var barang1 = response.data[i].data[j]["Jenis Barang"].toLowerCase().split(" ");
                    var barang2 = this.commerces[k].name.toLowerCase().split(" ");
                    if(response.data[i].data[j]["Negara"]) {
                      for(var l = 0; l < barang1.length; l++) {
                        for(var m = 0; m < barang2.length; m++) {
                          if(barang1[l] == barang2[m]) {
                          	console.log(barang1[l])
                            this.belanjaBarang.push({
                              "nama": response.data[i].data[j]["Jenis Barang"],
                              "kategori": kategori,
                              "spesifikasi": response.data[i].data[j]["Spesifikasi"],
                              "harga": response.data[i].data[j]["Total Price (US$)"],
                              "qty": response.data[i].data[j]["Kuantitas"],
                              "negara_asal": response.data[i].data[j]["Negara"],
                              "supplier": this.commerces[k].user,
                              "supplier_id": this.commerces[k].user_id
                            });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
    },
    getBadgeType(status) {
      const statusMap = {
        Available: 'success',
        Empty: 'danger',
      };

      return `badge-${statusMap[status]}`;
    },
  }
};
</script>

<style type="text/css">
  
</style>