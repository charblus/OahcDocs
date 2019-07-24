<template>
  <div class="container">
    <div class="player" ref="barWrapper">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
      ></video-player>

      <!-- <div class="barrage-screen" v-if="isBarrageContent" ref="bar"> -->
      <!-- <div class="barrage-content" >，</div> -->
      <!-- 发个弹幕吧 弹幕要在全屏显示 需要放于video同级 -->
      <!-- </div> -->

      <!-- 视频上悬浮的关注和弹幕按钮  -->
      <div class="dz-control" v-if="isdzCtrl">
        <div class="ctrl-item">
          <img
            @click="handleCollect"
            :src="isCollect ? collectIcon.collectUrl : collectIcon.unCollectUrl"
            alt="收藏"
          >
        </div>
        <div class="ctrl-item">
          <img
            @click="handleBarrage"
            :src="isBarrage ? barrageImg.barrageUrl : barrageImg.unbarrageUrl "
            alt="弹幕"
          >
        </div>
      </div>
      <transition name="stretch-fade">
        <div class="send-container" v-if="isBarrage">
          <img
            class="bar-cxt-btn"
            @click="selectViewBarContent"
            :src="isBarrageContent ? barCxtImg.barCxtUrl : barCxtImg.unBarCxtUrl"
          >
          <div class="send-barrage-tool">
            <input
              type="text"
              @focus="focusfo"
              v-model="barrageInnerText"
              placeholder="发送弹幕一起high！"
            >
            <img class="bar-user-avator" :src="headUrl" alt>
            <div class="send-btn" @click="handleSend">发送</div>
          </div>
          <img
            class="back-cxt-btn"
            @click="isBarrage = false"
            src="../assets/images/icon_guanbi@2x.png"
            alt
          >
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
export default {
  props: {
    height: { type: [Number, String] },
    isDanmu: { type: Boolean },
    isdzCtrl: { type: Number, default: 0 },
    cover: { type: String },
    videoSrc: { type: String },
    index: { type: [Number, String] }
  },
  watch: {
    cover(newValue, oldValue) {
      this.playerOptions.poster = newValue;
      return newValue;
    },
    videoSrc(newValue, oldValue) {
      this.playerOptions.sources[0].src = newValue;
      return newValue;
    }
  },
  data() {
    return {
      isCollect: false,
      isBarrage: false,
      isBarrageContent: false,
      collectIcon: {
        collectUrl: require("@/assets/images/icon_shoucang.png"),
        unCollectUrl: require("@/assets/images/icon_un_shoucang.png")
      },
      barrageImg: {
        barrageUrl: require("@/assets/images/icon_dakai.png"),
        unbarrageUrl: require("@/assets/images/icon_danmu.png")
      },
      barCxtImg: {
        barCxtUrl: require("@/assets/images/icon_shurudanmu.png"),
        unBarCxtUrl: require("@/assets/images/icon_close_shurudanmu.png")
      },
      posterUrl: "",
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            // type: "application/x-mpegURL",
            // src: "https://b79096456.at.baijiayun.com/web/video/player?vid=20277154&token=lc_eMHDM3XtNe1QdbjLMnABidsW84S1xskUNbw8r2vO4NUKM-hqHvg" //你的m3u8地址（必填）
            type: "video/mp4",
            // src: "https://image.zhangxinxu.com/video/blog/201812/fish-16166-s.mp4"
            src: this.videoSrc
          }
        ],
        poster: this.cover, //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      },
      // 弹幕
      barrageBoxWrap: 0,
      barrageBox: 0,
      barrageWidth: 0,
      barrageHeight: 0,
      currentTime: 0, //弹幕时间
      barrageInnerText: "", //弹幕内容
      barrageColorArray: [
        //弹幕颜色
        "#0099CC",
        "#333333",
        "#009966",
        "#FFFF66",
        "#9933FF",
        "#FFFF99",
        "#CCCCFF",
        "#CC9933",
        "#FFFF66"
      ],
      currentTimeNumber: 0,
      barrageTopArray: [5, 25, 45],
      barrageOffsetLeft: 0, // 弹幕偏离的距离
      barrageArray: [
        //假弹幕数据
        {
          time: "5",
          text: "不知不觉就听过去，吸收了太多知识，大赞。"
        },
        {
          time: "3",
          text: "讲的好幽默啊，收获颇丰。"
        },
        {
          time: "11",
          text: "winter has come"
        },
        {
          time: "5",
          text: "不知不觉就听过去，吸收了太多知识，大赞。"
        },
        {
          time: "5",
          text: "不知不觉就听过去，吸收了太多知识，大赞。"
        },
        {
          time: "3",
          text: "讲的好幽默啊，收获颇丰。"
        },
        {
          time: "5",
          text: "不知不觉就听过去，吸收了太多知识，大赞。"
        },
        {
          time: "3",
          text: "讲的好幽默啊，收获颇丰。"
        },
        {
          time: "11",
          text: "winter has come"
        }
      ],
      headUrl: ""
    };
  },
  components: {
    videoPlayer
  },
  created() {
    this.handleCreateBarrage();
  },
  mounted() {
    // this.headUrl = JSON.parse(localStorage.getItem('user')).head_pic
  },
  methods: {
    limitplayback() {},
    setPlayerOptions() {
      return this.playerOptions;
    },
    selectViewBarContent() {
      this.isBarrageContent = !this.isBarrageContent;
      this.handleCreateBarrage();
    },
    handleCreateBarrage() {
      if (this.isBarrageContent) {
        this.$nextTick(() => {
          this.initBarrageContainer();
          for (let i = 0; i < this.barrageArray.length; i++) {
            this.createBarrage(this.barrageArray[i].text, true);
          }
        });
      } else {
        // console.log("fasdfdf");
        // console.log(this.barrageArray)
        //  this.barrageArray = Object.assign({},this.barrageArray, [] );
      }
    },
    watchCurrentTime(seconds) {
      // 传递的每一秒，看这一秒是否有弹幕
      this.currentTime = seconds;
      let barlen = this.barrageArray.length;
      let that = this;
      for (let i = 0; i < barlen; i++) {
        let item = this.barrageArray[i];
        if (!item) {
          continue;
        }
        if (item.time == seconds) {
          that.createBarrage(item.text, true);
          // that.barrageArray.splice(i,1)
        }
      }
    },
    focusfo() {
      if (!localStorage.getItem("user")) {
        this.$store.dispatch("asyncSetIsLoginBox", true);
      }
    },
    move(el) {
      el.distance = el.distance - 0.1;
      // if(el.distance < -30) return;   // 测试
      el.style.transform = "translateX(" + el.distance + "%)"; //设置transform，平滑实现
      el.style.webkitTransform = "translateX(" + el.distance + "%)";
    },
    barrageAnimation(el) {
      // 让弹幕 动起来 cancelAnimationFrame，requestAnimationFrame是h5的请求动画帧的方法，递归实现平滑节能的动画效果
      let that = this;
      this.move(el);

      if (
        Math.abs(el.distance) <
        this.barrageWidth + 220 + this.barrageOffsetLeft
      ) {
        //如果移动的距离小于 (视频的宽度+弹幕的（最大）长度+弹幕偏移距离，则不断移动
        el.timer = requestAnimationFrame(function() {
          that.barrageAnimation(el);
        });
      } else {
        cancelAnimationFrame(el.timer);
        //删除节点
        el.parentNode.removeChild(el);
      }
    },
    initBarrage(el, obj) {
      // 初始化弹幕元素
      obj.top = obj.top || 0;
      obj.class = obj.color || "#fff";
      el.style.left = obj.left + "%";
      el.style.top = obj.top + "px";
      el.style.color = obj.color;
      //添加属性
      el.distance = 0;
      el.width = window.getComputedStyle(el).width.replace("%", "");
      el.timer = null;
      this.barrageAnimation(el);
    },
    getRandom(start, end) {
      return start + Math.random() * (end - start);
    },
    barrageTesting() {},
    createBarrage(msg, isSendMsg) {
      let divNode = document.createElement("div");
      let vjsVideoPar = document.getElementsByClassName("vjs-tech")[0]
        .parentElement;
      divNode.classList.add("barrage-screen");
      vjsVideoPar.appendChild(divNode);

      // let divNodepar = document.getElementsByClassName("barrage-screen")[0].parentElement;
      let divSonNode = document.createElement("div");
      divSonNode.innerHTML = msg;
      divSonNode.classList.add("barrage-item");

      divNode.appendChild(divSonNode);

      // this.$refs.barWrapper.appendChild(divNode);
      // this.$refs.barWrapper.appendChild(divNode);
      //设置偏离距离
      this.barrageOffsetLeft = this.getRandom(
        this.barrageWidth,
        this.barrageWidth * 2
      );
      //可设置随机距离
      var barrageOffsetLeft = isSendMsg
        ? this.barrageWidth
        : this.barrageOffsetLeft; //不随机则就在距右边0px

      // var barrageOffsetTop = this.getRandom(10, this.barrageHeight - 40); //弹幕的高度
      // var barrageOffsetTop = this.getRandom(5, 50); //弹幕的高度--随机
      var barrageOffsetTop = this.barrageTopArray[
        Math.round(Math.random() * (this.barrageTopArray.length - 1))
      ]; //弹幕的高度
      var barrageColor = this.barrageColorArray[
        Math.floor(Math.random() * this.barrageColorArray.length)
      ]; //弹幕的颜色
      //执行并初始化滚动
      this.initBarrage(divNode, {
        left: barrageOffsetLeft,
        top: barrageOffsetTop,
        color: barrageColor
      });
    },
    handleSend() {
      this.createBarrage(this.barrageInnerText, true); //制作弹幕
      // this.sendBarrage({
      //   // 向后台发送post请求，发送当前视频时间，弹幕内容，存储到数据库中
      //   time: this.currentTime,
      //   content: this.barrageInnerText
      // });
      this.barrageInnerText = "";
    },
    handleCollect() {
      if (!localStorage.getItem("user")) {
        this.$store.dispatch("asyncSetIsLoginBox", true);
      } else {
        this.isCollect = !this.isCollect;
        this.$emit("collectVideo", this.isCollect ? 1 : -1);
      }
    },
    handleBarrage() {
      this.isBarrage = !this.isBarrage;
    },
    initBarrageContainer() {
      this.barrageBoxWrap = this.$refs.barWrapper;
      // this.barrageWidth = parseInt(this.barrageBoxWrap.offsetWidth);
      this.barrageWidth = 100;
      this.barrageHeight = parseInt(this.barrageBoxWrap.offsetHeight);
    },
    onlyPlayVideo() {
      var videoList = document.querySelectorAll("video");
      for (var i = videoList.length - 1; i >= 0; i--) {
        (function() {
          var p = i;
          videoList[p].addEventListener("play", function() {
            pauseAll(p);
          });
        })();
      }
      function pauseAll(index) {
        for (var j = videoList.length - 1; j >= 0; j--) {
          if (j != index) videoList[j].pause();
        }
      }
    },
    onActivePlay() {
      const player = this.$refs.videoPlayer.player;
      console.log("121212", player);
      player.play();
    },
    onPlayerPlay(player) {
      this.onlyPlayVideo();
      this.$emit("autoSelectList"); // 点击视频播放，状态为-1，自动选中第一个
      // let blob = new Blob(['https://vdn1.vzuu.com/SD/e20fe244-7856-11e9-a422-0a580a442da0.mp4?disable_local_cache=1&bu=com&expiration=1558100446&auth_key=1558100446-0-0-9221ded2c5ae32c216e5df9374a258ff&f=mp4&v=hw'], {type: 'video/*'})
      // // 创建blob链接
      // console.log(URL.createObjectURL(blob))
      // this.playerOptions.sources[0].src = URL.createObjectURL(blob);
      // this.playerOptions.sources[0].src = this.videoSrc;
    },
    onPlayerPause(player) {
      // alert("pause");
      const plays = this.$refs.videoPlayer;
      console.log("当前播放时间", plays);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 100%;
  .player {
    width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  //弹幕内容
  .barrage-screen {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    cursor: default;
    user-select: none;
    // .barrage-item {
    // vue 机制 创建div的class 不会加载这里的局部样式 已放到main.css
    // }
  }
  // 点赞和弹幕开关按钮
  .dz-control {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
    top: 222px;
    right: 0;
    z-index: 99;
    .ctrl-item {
      width: 25px;
      height: 25px;
      margin: 4px 8px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  // 弹幕发送器
  .send-container {
    width: 585px;
    height: 51px;
    background: rgba(14, 70, 103, 1);
    border-radius: 0px 0px 15px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bar-cxt-btn {
      width: 25px;
      height: 28px;
      margin-left: 20px;
    }
    .back-cxt-btn {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
    .send-barrage-tool {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 469px;
      height: 30px;
      input {
        width: 394px;
        height: 30px;
        line-height: 30px;
        background: #525c76;
        border: none;
        border-radius: 33px 0px 0px 33px;
        padding-left: 15px;
        font-weight: 500;
        font-size: 11px !important;
        font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica,
          Arial, Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light, simsun,
          \\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";

        &::-webkit-input-placeholder {
          font-size: 11px;
          font-weight: 500;
          font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica,
            Arial, Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light,
            simsun, \\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei,
            "sans-serif";
          color: rgba(147, 147, 147, 0.98);
        }
        :-moz-placeholder {
          font-size: 11px;
          font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica,
            Arial, Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light,
            simsun, \\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei,
            "sans-serif";
          font-weight: 500;
          color: rgba(147, 147, 147, 0.98);
        }
        ::-moz-placeholder {
          font-size: 11px;
          font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica,
            Arial, Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light,
            simsun, \\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei,
            "sans-serif";
          font-weight: 500;
          color: rgba(147, 147, 147, 0.98);
        }
        &:-ms-input-placeholder {
          font-size: 11px;
          font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica,
            Arial, Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light,
            simsun, \\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei,
            "sans-serif";
          font-weight: 500;
          color: rgba(147, 147, 147, 0.98);
        }
      }
      .send-btn {
        width: 75px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: rgba(247, 222, 166, 1);
        font-size: 12px;
        font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica,
          Arial, Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, STHeitiSC-Light, simsun,
          \\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";

        font-weight: 400;
        color: #333333;
        border-radius: 0 33px 33px 0;
      }
      .bar-user-avator {
        position: absolute;
        right: 84px;
        width: 19px;
        height: 20px;
        border-radius: 50%;
        opacity: 0.64;
      }
    }
  }
}

// 弹幕发射器展开动画
.stretch-fade-enter-active {
  transition: all 0.9s ease;
}
.stretch-fade-leave-active {
  transition: all 0.08s cubic-bezier(1, 0.5, 0.8, 1);
}
.stretch-fade-enter,
.stretch-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

