<template lang="pug">
  div.h-100
    d-row.h-50(align-v='center', align-h='center')
      h4 Delete {{commerce.name}} ?
    d-row(align-v='center', align-h='center')
      d-link( to="/commerce")
        d-button( pill) &larr; Cancel
      d-button( theme="danger" v-on:click="deleteCommerce()" pill) Delete
</template>

<script>
import gql from '@/gql';
import graphqlFunction from '@/graphqlFunction';
import basicFunction from '@/basicFunction';
import address from '@/address';
import headers from '@/headers';

export default {
  name: 'delete-commerce',
  data(){
      return{
        commerce: []
      }
  },

  created: function()
  {
      this.fetchCommerce();
  },

  methods: {
      fetchCommerce() {
        let id = window.location.href.split("?id=")[1];
        this.axios.get(address + ":3000/get-commerce", headers).then((response) => {
          let query = gql.singleCommerce;
          let variable = {
            itemId: id
          };
          graphqlFunction.graphqlFetchOne(query, variable, (result) => {
            this.commerce = result.commerce;
          });
        });
      },
      deleteCommerce() {
        let postObj = {
          _id: this.commerce._id
        };
        this.axios.post(address + ':3000/delete-commerce', postObj, headers)
        .then((response) => {
          let query = gql.deleteCommerce;
          let variables = {
            itemId: this.commerce._id
          }
          graphqlFunction.graphqlMutation(query, variables, (result) => {
            console.log(result);
            alert("Delete Commerce Success");
            this.$router.push('/commerce');
          });
        });
      }
  }
};
</script>