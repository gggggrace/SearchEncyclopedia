<template>
  <div>
    <!--选择logo组件-->
    <!--  getindex是自定义事件 -->
    <logoSelect @getindex='getIndex'></logoSelect>

    <div class="search-input">
      <!--输入框-->
      <input type="text" v-model="keyword" @keyup="get($event)" @keydown.enter="search()" @keydown.down="selectDown" @keydown.up.prevent="selectUp">
      <span class="search-reset" @click="clearKeyword" v-show="this.keyword==''?false:true">&times;</span>
      <button class="search-btn" @click="search">搜索</button>

      <!--实时搜索下拉框-->
      <div class="search-select" v-show="this.keyword==''?false:true">
        <transition-group name="itemFade" tag="ul" mode="out-in">
          <li v-for="(value,index) in selectData" :key="value" class="search-select-option search-select-list" @mouseover="selectListHover(index)" :class="{selectBack:index===hoverNum}" @click="selectItemClick(index)">
            {{value}}
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
  import logoSelect from './logoSelect.vue';
  export default {
    //注册组件
    components:{
      'logoSelect':logoSelect
    },
    data () {
      return {
        keyword:'',
        searchIndex:0,//搜索引擎序号
        selectData:[],//实时搜索下拉框数据
        hoverNum:-1,
        // now:0,
        logoData: [{
          name: '360搜索',
          searchSrc: 'https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='
        }, {
          name: '百度搜索',
          searchSrc: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='
        }, {
          name: '搜狗搜索',
          searchSrc: 'https://www.sogou.com/web?query='
        }]
      }
    },
    methods: {
      // 键盘键入进行后台请求
      get:function(e){
        // 如果按键是上或者下，就不进行后台请求
        if (e.keyCode === 38 || e.keyCode === 40) {
          return;
        }

        this.$http.jsonp('https://sug.so.360.cn/suggest?word=' +this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function (res) {
          this.selectData = res.data.s;
        })
      },
      // 键盘向下选择
      selectDown: function () {
        this.hoverNum ++;
        if(this.hoverNum === this.selectData.length){
          this.hoverNum = 0;
        }
        this.keyword = this.selectData[this.hoverNum];
      },
      // 键盘向上事件
      selectUp:function(){
        if(this.hoverNum != -1){
          this.hoverNum --;
        }
        if(this.hoverNum === -1){
          this.hoverNum = this.selectData.length - 1;
        }
        this.keyword = this.selectData[this.hoverNum];
      },
      // 搜索关键字
      search:function(){
        window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
      },
      // 清除关键字并清楚下拉框数据
      clearKeyword:function () {
        this.keyword = '';
        this.selectData = '';
        this.hoverNum = -1;
      },
      //鼠标划过下拉框item样式
      selectListHover:function (index) {
        this.hoverNum = index;
      },
      // 选中下拉框中item
      selectItemClick:function (index) {
        this.keyword = this.selectData[index];
        this.search();
      },
      // 获取搜索引擎序号
      getIndex:function (index) {
        this.searchIndex = index;
      },
    }
  }
</script>

<style type="text/css">
  .search-input {
    height: 45px;
    width: 600px;
    margin: 0 auto;
    margin-top: 10px;
    position: relative;
  }

  .search-input input {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    width: 500px;
    height: 45px;
    font-size: 18px;
    float: left;
    padding-left: 10px;
    padding-right: 10px;
    overflow: hidden;
  }

  .search-btn {
    height: 45px;
    width: 100px;
    border: 1px solid mediumseagreen;
    background-color: mediumseagreen;
    color: white;
    font-size: 16px;
    font-weight: bold;
    float: left;
  }

  .search-btn {
    cursor: pointer
  }

  .search-select {
    position: absolute;
    top: 45px;
    width: 500px;
    box-sizing: border-box;
    z-index: 999;
  }

  .search-select li {
    border: 1px solid #d4d4d4;
  ;
    border-top: none;
    border-bottom: none;
    background-color: #fff;
    width: 100%
  }

  .search-select-option {
    box-sizing: border-box;
    padding: 7px 10px;
  }

  .selectback {
    background-color: #eee !important;
    cursor: pointer
  }

  input::-ms-clear {
    display: none
  }

  .search-reset {
    width: 21px;
    height: 21px;
    position: absolute;
    display: block;
    line-height: 21px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    right: 110px;
    top: 12px
  }

  .search-select-list {
    transition: all 0.5s
  }

  .itemfade-enter,
  .itemfade-leave-active {
    opacity: 0;
  }

  .itemfade-leave-active {
    position: absolute;
  }

  .selectBack {
    background-color: #eee !important;
    cursor: pointer
  }
  .search-select ul{margin:0;text-align: left; }
</style>
