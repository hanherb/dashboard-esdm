<template>
  <d-card class="card-small lo-stats mb-4">

    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">List Barang</h6>
      <div class="block-handle"></div>
    </d-card-header>

    <d-card-body class="p-0">
      <d-container fluid class="px-0">

        <!-- Latest Orders List -->
        <table class="table mb-0">
          <thead class="py-2 bg-light text-semibold border-bottom">
            <tr>
              <th>Details</th>
              <th></th>
              <th class="text-center">Status</th>
              <th class="text-center">Qty</th>
              <th class="text-center">Harga</th>
              <th class="text-center">TKDN</th>
              <th class="text-center">Kategori</th>
              <th class="text-center">Spesifikasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="commerce in commerces">
              <td class="lo-stats__image">
                <img class="border rounded" :src="require('@/assets/images/uploads/' + commerce.image + '.png')" alt="Alternative title">
              </td>
              <td class="lo-stats__order-details">
                <span>{{ commerce.name }}</span>
              </td>
              <td class="lo-stats__status">
                <div class="d-table mx-auto">
                  <d-badge pill :class="[getBadgeType(status)]">{{ status }}</d-badge>
                </div>
              </td>
              <td class="lo-stats__items text-center">{{ commerce.qty }}</td>
              <td class="lo-stats__total text-center text-success">$ {{ commerce.price }}</td>
              <td class="lo-stats__total text-center text-success">{{ commerce.tkdn }}%</td>
              <td class="lo-stats__total text-center">{{ commerce.category }}</td>
              <td class="lo-stats__total text-center">{{ commerce.description }}</td>
            </tr>
          </tbody>
        </table>

      </d-container>
    </d-card-body>

  </d-card>
</template>

<script>
import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';
import headers from '@/headers';

export default {
  name: 'user-goods',
  data(){
      return{
        commerces: [],
        status: 'Available'
      }
  },

  created: function()
  {
      this.fetchItems();
  },

  methods: {
    fetchItems() {
      var id = window.location.href.split("?id=")[1];
      this.axios.get(address + ":3000/get-commerce", headers).then((response) => {
        let query = gql.allCommerce;
        graphqlFunction.graphqlFetchAll(query, (result) => {
          for(var i = 0; i < result.commerces.length; i++) {
            if(result.commerces[i].user_id == id) {
              result.commerces[i].price = basicFunction.numberWithCommas(result.commerces[i].price);
              this.commerces.push(result.commerces[i]);
            }
          }
        });
      });
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
