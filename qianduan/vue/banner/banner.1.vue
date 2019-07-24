<template>
  <div class="container">
    <div class="banner-bg-mask"></div>
    <div class="banner-content-bg"></div>
    <div class="banner-content">
      <div class="banner-main">
        <div class="video-content">
          <the-jpb-video />
        </div>
      </div>
      <div class="banner-thumb">
        <div class="ban-l-btn">
          <div class="ban-l-mask"></div>
          <img src="../../assets/images/icon_xiangzuo.png" @click="prevBtn" alt="">
        </div>
        <div class="ban-r-btn">
          <div class="ban-l-mask"></div>
          <img src="../../assets/images/icon_xiangyou.png" @click="nextBtn" alt="">
        </div>
        <ul class="banner-list" :style="{'left':calleft + 'px'}">
          <li class="list-item" v-for="banner in banners" :key="banner.id">
            <img :src="banner.image">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheJbpVideo from "@/components/jbp-video.vue";
export default {
  components: {
    "the-jpb-video": TheJbpVideo,
  },
  data() {
    return {
      banners: [],
      calleft: 0,
      totalWidth: 1080
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    async getBanner() {
      const banners = await axios.get("/api/banners");
      this.banners = banners.data;
    }, 
    prevBtn() {
      this.calleft -= 193;
      if (this.calleft < -790) {
          this.calleft = 0
      }
    },
    nextBtn() {
      this.calleft += 193;
      if (this.calleft > 0) {
          this.calleft = -790
      }
    }

  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  .banner-bg-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 1867px;
    width: 100%;
    background: rgba(32, 95, 131, 0.9);
    z-index: 9;
  }
  .banner-content-bg {
    height: 603px;
    background: url("../../assets/images/banner01.png") center center no-repeat;
    background-size: cover;
  }
  .banner-content {
    z-index: 99;
    width: 100%;
    height: 603px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .banner-main {
      width: 100%;
      height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
      .video-content {
        width: 590px;
        height: 360px;
        border: 1px solid #ccc;
      }
      video {
        // width: 486px;
        // height: 300px;
      }
    }
    .banner-thumb {
      // position: relative;
      width: 100%;
      height: 140px;
      overflow-x: auto;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display:none
      }
      .ban-l-btn, .ban-r-btn {
        position: absolute;
        width: 71px;
        top: 370px;
        height: 114px;
        // height: 100%;
        z-index: 99;
        border: none;
        img {
          width: 27px;
          height: 27px;
          margin-top: 46px;
          z-index: 99;
        }
      }
      .ban-l-btn {
        left: 0;
        background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0% , rgba(32, 95, 131, 0.9) 100%); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, rgba(255,255,255,0) 0%, rgba(32, 95, 131, 0.9) 100%); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, rgba(255,255,255,0) 0%, rgba(32, 95, 131, 0.9) 100%); /* Firefox 3.6 - 15 */
        background: linear-gradient(to left, rgba(255,255,255,0) 0% , rgba(32, 95, 131, 0.9) 100%); /* 标准的语法 */
        img {
          margin-left: 22px;
        }
      }
      .ban-r-btn {
        right: 0;
        background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0% , rgba(32, 95, 131, 0.9) 100%); /* Safari 5.1 ~ */
        background: -o-linear-gradient(right, rgba(255,255,255,0) 0%, rgba(32, 95, 131, 0.9) 100%); /* Opera 11.1 ~ */
        background: -moz-linear-gradient(right, rgba(255,255,255,0) 0%, rgba(32, 95, 131, 0.9) 100%); /* Firefox 3.6 ~ */
        background: linear-gradient(to right, rgba(255,255,255,0) 0% , rgba(32, 95, 131, 0.9) 100%); /* 标准的语法 */
        img {
          margin-left: 22px;
        }
      }
      .banner-list {
        // display: flex;
        // justify-content: space-around;
        // transition: all .5s;
       
        position: relative;
        left: 0px;
        transition: all 2s;
        display: inline-flex;
        margin: 0 16px;
        align-items: center;
        // flex-wrap: nowrap;
        .list-item {
          display: inline-block;
          cursor: pointer;
          width: 210px;
          height: 112px;
          margin: 0 16px;
          border: 1px solid #ccc;
          text-align: center;
          &:nth-child(3) {
            width: 218px;
            height: 132px;
            border: 1px solid #ffad03;
          }
          img {
            width: 100%;
            height: 100%;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
