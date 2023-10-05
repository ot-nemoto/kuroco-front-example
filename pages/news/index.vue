<template>
    <div>
      <p>ニュース一覧ページ</p>
      <button type="button" @click="logout">
        ログアウト
      </button>
      <div v-for="n in response.list" :key="n.slug">
        <nuxt-link :to="`/news/${n.topics_id}`">
          {{ n.ymd }} {{ n.subject }}
        </nuxt-link>
      </div>
    </div>
  </template>

  <script>
  import { mapActions } from 'vuex';

  export default {
    middleware: 'auth',
    async asyncData({ $axios }) {
      return {
        response: await $axios.$get('/rcms-api/5/news'),
      };
    },
    methods: {
      ...mapActions(['logout'])
    },
  };
  </script>