<template>
  <div id="app">
    <h1>Snake with Vue.js</h1>
    <snake
      v-bind:is-playing="isPlaying"
      v-bind:score="points"
      v-bind:highscore="maxpoints"
      @isPlaying="updateState"
      @updateScore="calculateScore"
      @reset="reset">
    </snake>
    <div id="game-menu">
      <button id="button" v-on:click="isPlaying ? stopGame() : startGame()" v-bind:class="[isPlaying ? 'red' : 'green']">{{isPlaying ? "Stop" : "Start"}}</button>
    </div>
    <audio id="theme" loop><source src="../src/assets/Funky Chill loop.wav"></audio>
    <audio id="over"><source src="../src/assets/gameover_01.mp3"></audio>
    <audio id="snack"><source src="../src/assets/coin_06.mp3"></audio>
  </div>
</template>

<script>
import Snake from './components/Snake.vue'

export default {
  name: 'App',
  components: {
    Snake
  },
  data() {
    return {
      isPlaying: false,
      points: 0,
      maxpoints: 0
    }
  },
  methods: {
    startGame() {
      this.isPlaying = true;
      this.playSound("theme");
    },
    stopGame() {
      this.isPlaying = false;
      this.stopSound();
    },
    updateState(bool) {
      this.isPlaying = bool;
      if(!bool) {
        this.stopSound();
        this.playSound("over");
      }
    },
    calculateScore(value) {
      this.points += value;
      this.playSound("snack");
    },
    reset() {
      if(this.maxpoints < this.points) {
        this.maxpoints = this.points;
      }
      this.points = 0;
    },
    playSound(id) {
      const audioPromise = document.getElementById(id).play();
      if (audioPromise !== undefined) {
        audioPromise.then(function() {
          // Automatic playback started!
        }).catch(function(error) {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
          console.log(error);
        });
      }
    },
    stopSound() {
      const audioPromise = document.getElementById('theme').pause();
      if (audioPromise !== undefined) {
        audioPromise.then(function() {
          // Automatic playback started!
        }).catch(function(error) {
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
          console.log(error);
        });
      }
    }
  }
}
</script>

<style>
  body {
    background: darkgray;
  }

  #app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  button {
    font-size: larger;
    font-weight: bold;
    margin-top: 0.5em;
    border: 3px solid #fff;
    border-radius: 100%;
    cursor: pointer;
    display: inline-block;
    height: 5vh;
    width: 5vw;
  }

  button:focus {
    outline: none;
  }

  .red {
    background: #E53030;
    box-shadow: 0 -2px 0 3px #F54040 inset, 0 5px 5px #F86060, 0 15px #F54040 inset;
  }

  .green {
    background: #0EC518;
    box-shadow: 0 -2px 0 3px #1ED528 inset, 0 5px 5px #3CE337, 0 15px #3CE337 inset;
  }
</style>
