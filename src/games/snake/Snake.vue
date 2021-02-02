<template>
  <div id="snake">
    <canvas id="playground" width="500" height="500"></canvas>
    <div id="sidebar">
      <h2>Controls</h2>
      <hr>
      <p>Use the arrow-keys (&#8592; &#8593; &#8595; &#8594;) on your keyboard to navigate the snake!</p>
      <p>If you collide with the walls or yourself the game is over!</p>
      <hr>
      <h2>Score</h2>
      <p class="big" v-bind:score="score">{{score}}</p>
      <hr>
      <h2>Highscore</h2>
      <p class="big" v-bind:highscore="highscore">{{highscore}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Snake",
  props: {
    isPlaying: Boolean,
    score: Number,
    highscore: Number
  },
  data() {
    return {
      playgroundElement: '',
      playgroundContext: '',
      snakeBody: {},
      x_velocity: 10,
      y_velocity: 0,
      gameHandler: Number,
      food: {}
    }
  },
  methods: {
    initializeGame() {
      this.snakeBody = [{'x': 250, 'y': 250}, {'x': 240, 'y': 250}, {'x': 230, 'y': 250}, {'x': 220, 'y': 250}, {'x': 210, 'y': 250}]
      this.spawnFood();
      this.x_velocity = 10;
      this.y_velocity = 0;
    },
    drawSnake() {
      const board = this.playgroundContext;
      this.snakeBody.forEach(part => {
        board.fillStyle = "green";
        board.strokeStyle = 'lightgreen';
        board.fillRect(part.x, part.y, 10, 10);
        board.strokeRect(part.x, part.y , 10, 10);
      })
    },
    moveSnake() {
      const body = this.snakeBody;
      const next = { 'x': body[0].x + this.x_velocity, 'y': body[0].y + this.y_velocity };
      this.snakeBody.unshift(next);
      if(body[0].x === this.food.x && body[0].y === this.food.y) {
        this.updateScore(10);
        this.spawnFood()
      } else {
        this.snakeBody.pop();
      }
    },
    changeDirection(event) {
      const LEFT = 37;
      const RIGHT = 39;
      const UP = 38;
      const DOWN = 40;

      const keyPressed = event.keyCode;
      const movingUp = this.y_velocity === -10;
      const movingDown = this.y_velocity === 10;
      const movingRight = this.x_velocity === 10;
      const movingLeft = this.x_velocity === -10;

      if(keyPressed === LEFT && !movingRight) {
        this.x_velocity = -10;
        this.y_velocity= 0;
      }

      if(keyPressed === RIGHT && !movingLeft) {
        this.x_velocity = 10;
        this.y_velocity= 0;
      }

      if(keyPressed === UP && !movingDown) {
        this.x_velocity = 0;
        this.y_velocity = -10;

      }

      if(keyPressed === DOWN && !movingUp) {
        this.x_velocity = 0;
        this.y_velocity = 10;
      }
    },
    spawnFood() {
      let that = this;
      this.food = { 'x' : this.randomize(), 'y': this.randomize()};
      const body = this.snakeBody;
      let food = this.food;

      body.forEach(part => {
        if(part.x === food.x && part.y === food.y) {
          that.spawnFood();
        }
      })
    },
    drawFood() {
      this.playgroundContext.fillStyle = 'red';
      this.playgroundContext.strokeStyle = 'darkred'
      this.playgroundContext.fillRect(this.food.x, this.food.y, 10, 10);
      this.playgroundContext.strokeRect(this.food.x, this.food.y, 10, 10);
    },
    randomize() {
      return Math.round((Math.random() * 490) / 10) * 10;
    },
    gameOver() {
      const body = this.snakeBody;
      let collision;
      for(let i = 1; i < body.length; i++) {
        collision = ( body[0].x === body[i].x ) && ( body[0].y === body[i].y );
        if(collision) { // looks weird to not just return collision but we want to check for wall collision too
          return true;
        }
      }
      const leftWall = body[0].x < 0;
      const rightWall = body[0].x > 500 - 10;
      const topWall = body[0].y < 0;
      const botWall = body[0].y > 500 - 10;

      collision = leftWall || rightWall || topWall || botWall;
      return collision;
    },
    gameLoop() {
      if(this.gameOver()) {
        this.updateIsPlaying();
        this.$emit('reset');
        console.log("GAME OVER!")
      }
      this.clearBoard();
      this.moveSnake();
      this.drawSnake();
      this.drawFood();
    },
    updateIsPlaying: function() {
      this.$emit('isPlaying', false);
    },
    updateScore: function(increase) {
      this.$emit('updateScore', increase)
    },
    clearBoard() {
      this.playgroundContext.fillStyle = '#ede887';
      this.playgroundContext.strokeStyle = 'brown';
      this.playgroundContext.fillRect(0,0, this.playgroundElement.width, this.playgroundElement.height);
    }
  },
  mounted() {
    this.playgroundElement = document.getElementById("playground");
    this.playgroundContext = this.playgroundElement.getContext("2d");
    this.initializeGame();
    this.clearBoard();
    document.addEventListener("keydown", this.changeDirection);
  },
  watch: {
    isPlaying(value) {
      clearInterval(this.gameHandler);
      this.$emit('reset');
      if(value) {
        this.initializeGame();
        this.gameHandler = setInterval(() => this.gameLoop(), 100);
      }
    }
  }
}
</script>

<style scoped>
  #snake {
    display: grid;
    width: 700px;
    grid-template-columns: 500px 200px;
    grid-template-rows: 500px;
    grid-template-areas:
        "game sidebar";
  }
  #playground {
    border: 2px solid black;
    grid-area: game;
    height: calc(500px - 4px);
  }

  #sidebar {
    background-color: dodgerblue;
    grid-area: sidebar;
    padding: 0.5em;
  }

  .big {
    font-weight: bolder;
    font-size: larger;
  }

</style>