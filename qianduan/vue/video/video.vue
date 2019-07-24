<template>
  <div>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      id="video"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>
    <input type="button" @click="pipBtn" value="点击进入画中画状态">
  </div>
</template>
<script>
export default {
  name: "BusImg",
  data() {
    return {
      // 视频播放
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            // ype: "video/mp4",
            // src: "../assets/video/code_dev.mp4" //url地址
            type: "video/mp4",
            src:
              "https://image.zhangxinxu.com/video/blog/201812/fish-16166-s.mp4"
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {
    pipBtn() {
      let pipWindow;
      const video = document.getElementById("video");
      console.log(video)
      video.requestPictureInPicture().catch(error => {
        console.log(error, "Video failed to enter Picture-in-Picture mode.");
      });

      //video元素添加事件
      video.addEventListener("enterpictureinpicture", function(event) {
        console.log("Video entered Picture-in-Picture mode.");
        pipWindow = event.pictureInPictureWindow;
        updateVideoSize(pipWindow.width, pipWindow.height);
        pipWindow.addEventListener("resize", onPipWindowResize);
      });
      //video元素添加事件
      video.addEventListener("leavepictureinpicture", function(e) {
        console.log("Video left Picture-in-Picture mode.");
        pipWindow.removeEventListener("resize", onPipWindowResize);
      });
      function onPipWindowResize(event) {
        // Picture-in-Picture window has been resized.
        updateVideoSize(event.target.width, event.target.height);
      }
      function updateVideoSize(width, height) {
        // TODO: Update video size based on pip window width and height.
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>