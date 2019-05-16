<template>
  <div id="app">
    <transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .header{
    background-color: #409EFF;
    color: white;
    text-align: center;
  }
</style>
