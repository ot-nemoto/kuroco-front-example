<template>
    <div>
      <p>News list</p>
      <div v-for="n in response.list" :key="n.slug">
        <nuxt-link :to="`/news/${n.topics_id}`">
          {{ n.ymd }} {{ n.subject }}
        </nuxt-link>
      </div>
    </div>
  </template>

  <script>
  export default {
    middleware: 'auth',
    async asyncData({ $axios }) {
      return {
        response: await $axios.$get('/rcms-api/5/news'),
      };
    },
  };
  </script>