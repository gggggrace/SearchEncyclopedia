<template>
  <div id="app">
    <searchPanel></searchPanel>
  </div>
</template>

<script>

  import searchPanel from './components/searchPanel';

  export default {
    components:{
      searchPanel
    }
  }
</script>

<style>
  html {
    height: 100%;
  }

  body {
    height: 100%;
    background: url('./assets/background.png') no-repeat;
    background-size: 100% 100%
  }
  #app {
    color: #2c3e50;
    width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    position: absolute;
    top: 35%;
    left: 50%;
    margin-left: -300px;
    margin-top: -100px;
  }
  @media screen and (max-width: 480px){
    #app{
      width: auto;
      margin-left: 0;
      left: 0;
    }
  }
</style>
