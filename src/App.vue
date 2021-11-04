<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {$get, $post} from './api/RestUtils';

export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>
    
<style>
  *{
    padding: 0;
    margin: 0;
  }
</style>