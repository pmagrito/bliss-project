<template>
  <div id="health">
    <transition name="fade">
      <div v-if="show" class="overlay">
        <div class="spinner-container">
          <double-bounce></double-bounce>
        </div>
      </div>
    </transition>
    <div class="response">
      <h1>The server is {{data}}</h1>
      <a href="/">try again</a>
    </div>
  </div>
</template>

<script>
  import DoubleBounce from 'vue-loading-spinner/src/components/DoubleBounce'

  export default {
    name: 'health',
    data () {
      return {
        data: '',
        show: true
      }
    },
    components: {
      DoubleBounce
    },
    methods: {
      getHealth () {
        this.$http.get('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/health').then(response => {
          if (response.body.status === 'OK') {
            this.$router.push('questions')
          } else {
            this.data = response.body.status
            this.show = false
          }
        }, response => {
          console.log(response)
        })
      }
    },
    created () {
      this.getHealth()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .overlay{
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    overflow-x: hidden;
    transition: 0.5s;
    background-color: #FFFFFF;
  }
  .spinner-container{
    height: 100%;
    width: 100%;
    text-align: center;
  }
  .spinner{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
    position: absolute;
    top: 50%;
    height: 100px;
    margin-top: -50px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .response{
    text-align: center;
  }
  .response h1{
    margin-top: 50px;
    margin-bottom: 10px;
  }
</style>
