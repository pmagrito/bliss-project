<template>
  <div id="app">
    <transition name="fade">
      <div v-if="offline" class="offline-overlay"><h1>OFFLINE</h1></div>
    </transition>
    <b-navbar toggleable variant="faded" sticky="true">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-link class="navbar-brand" to="/">
        <img src="./assets/logo.png">
      </b-link>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item to="/">Health</b-nav-item>
          <b-nav-item to="/questions">Questions</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <!-- <router-link v-bind:to="'/'">Health</router-link>
    <router-link v-bind:to="'/questions'">Questions</router-link> -->
    <div class="container-fluid content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        offline: false
      }
    },
    methods: {
      checkConnectivity () {
        if (!navigator.onLine) {
          this.offline = true
          console.log('offline')
        } else {
          this.offline = false
          console.log('online')
        }
        var self = this
        setTimeout(function () {
          self.checkConnectivity()
        }, 10000)
      }
    },
    created () {
      this.checkConnectivity()
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .navbar-brand img{
    width: 28px;
  }
  .content{
    margin: 20px 0;
  }
  .offline-overlay{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: white;
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .offline-overlay h1{
    text-align: center;
    max-width: 50%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
