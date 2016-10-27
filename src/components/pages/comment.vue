<template>
  <div class="comment l-spacing">
    <img class="avatar" :src="imgurl">
    <div class="right-info">
      <span class="name">{{name}}</span>
      <span class="hot">
        <m-icon name="whatshot" size="16" color="#f44336"></m-icon>
        {{ hot ? hot : 0 }}
      </span>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
  import MIcon from 'components/m-icon';
  export default {
    components: {
      MIcon,
    },
    props: {
      imgurl: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      hot: {
        type: [Number, String],
      },
    },
  };
</script>

<style lang="scss" scoped>
  .comment {
    overflow: hidden;
    margin-bottom: 16px;
    .avatar {
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .right-info {
      margin-left: 50px;
      p {
        word-break: break-word;
      }
      .hot {
        float: right;
      }
      .name {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
