<template>
<div class="annotation-detail l-spacing" v-if="annotationDetail.content">
  <p v-html="annotationDetail.content.replace(/\n/g, '<br>')"></p>
</div>
</template>

<script>
  export default {
    data () {
      return {
        annotationDetail: '',
      };
    },
    created () {
      this.getAnnotationDetail();
    },
    methods: {
      getAnnotationDetail () {
        Indicator.open();
        this.$http.get(`book/annotation/${this.$route.params.annotationId}`).then(res => {
          Indicator.close();
          if (res.status === 200) {
            this.annotationDetail = res.data;
            console.log(res);
          } else {
            console.log('annotation detail get fail');
          }
        }).catch(err => {
          console.log(err);
        });
      },
    },
  };
</script>
<style>
  .annotation-detail {
    padding-top: 20px;
    /*padding-bottom: 10px;*/
  }
</style>
