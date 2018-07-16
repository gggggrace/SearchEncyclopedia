<template>
  <div class="main-logo">
    <img :src="logoData[selectedNow].imgSrc" @click="toggleFlag">
    <span class="logoList-arrow" @click="toggleFlag"></span>
    <!--Vue过渡动画-transition组件-->
    <transition name="logoFade">
      <ul v-show="logoListShow" class="logoList" @mouseleave="mouseLeaveList">
        <li v-for="(item,index) in logoData" v-show="selectedNow==index?false:true" class="logoItem" @mouseover="logoListHover(index)" :class="{selectBack:index===hoverNum}" @click="logoSelected(index)">
          <img :src="item.imgSrc">
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        selectedNow:0,//鼠标点击的元素序号
        hoverNum:-1,//鼠标经过的元素序号
        logoListShow:false,
        logoData: [{
          imgSrc: require('../assets/360_logo.png')
        },{
          imgSrc: require('../assets/baidu_logo.png')
        },{
          imgSrc: require('../assets/sougou_logo.png')
        }]
      }
    },
    methods: {
      toggleFlag: function () {
        this.logoListShow = !this.logoListShow;
      },
      mouseLeaveList:function () {
        this.logoListShow = false;//隐藏列表
      },
      logoListHover:function (index) {
        this.hoverNum = index;
      },
      logoSelected:function (index) {
        this.selectedNow = index;
        this.logoListShow = false;
        // 触发父组件的自定义事件，向父组件传参数
        this.$emit('getindex',this.selectedNow)
      }
    }
  }
</script>

<style type="text/css">
  ul{list-style: none;padding: 0;margin: 0}
  .main-logo {
    /*width: 600px;*/
    height: 140px;
    position: relative;
  }

  .main-logo img {
    display: block;
    margin: 0 auto;
    user-select: none;
    cursor: pointer;
  }

  .logoList-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 8px solid;
    border-color: #000 transparent transparent transparent;
    right: 100px;
    top: 66px;
    cursor: pointer
  }

  .logoList {
    position: absolute;
    top: 100%;
    width: 200px;
    left: 50%;
    margin-left: -100px;
    z-index: 999999;
    border: 1px solid #d4d4d4
  }

  .logoList li {
    width: 100%;
    height: 80px;
    background-color: #FEFEFE; /*少个封号报错*/
    line-height: 80px;
    padding-top: 1px;
  }

  .logoList li img {
    width: 100%;
    margin-top: 10px;
  }

  .logoFade-enter-active,
  .logoFade-leave-active {
    transition: all  .5s;
  }

  .logoFade-enter,
  .logoFade-leave-active {
    opacity: 0;
    transform: translateY(20px);
  }
  .selectBack{background-color: #eee !important;cursor: pointer}

  @media screen and (max-width: 480px){
    .logoList-arrow{
      right: 70px;
    }
    .main-logo img{
      margin-left: -65px;
    }
    .logoList li img{
      margin-left: 0;
    }
  }
</style>
