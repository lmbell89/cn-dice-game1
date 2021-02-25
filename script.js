(() => {
    class Game {
        constructor() {
            this._score = 0
            this._gameOver = false
            this.rolling = false
            this.die = new Die()
            this.rollbtn = document.getElementById("roll")
            this.restartBtn = document.getElementById("restart")
        }

        get score() {
            return this._score
        }

        set score(value) {
            const h2 = document.querySelector("h2")

            this._score = value            
            h2.innerHTML = this._score
            this.gameOver = this.score >= 20
        }

        get gameOver() {
            return this._gameOver
        }

        set gameOver(isOver) {
            const h1 = document.querySelector("h1")
            this._gameOver = isOver

            if (isOver) {
                this.rollbtn.classList.add("hidden")
                this.restartBtn.classList.remove("hidden")
                h1.innerHTML = this.score >= 20 ? "Winner!" : "Loser :("
            } else {
                this.rollbtn.classList.remove("hidden")
                this.restartBtn.classList.add("hidden")
                h1.innerHTML = "Player 1"
            }
        }

        restart() {
            this.score = 0
            this.die.setNumber(1)
            this.gameOver = false
        }

        roll() {
            if (this.rolling || this.gameOver) {
                return
            }
    
            const interval = setInterval(() => this.die.showRandom(), 100)
            const number = Math.floor(Math.random() * 6 + 1)
            this.rolling = true
    
            setTimeout(() => {
                clearInterval(interval)
                this.die.setNumber(number)
                this.rolling = false
    
                if (number === 1) {
                    this.gameOver = true
                } else {
                    this.score += number
                }
            }, 1500)
        }
    }

    class Die {
        constructor() {
            this.number = 1
            this.image = document.getElementById("die")
        }
    
        setNumber(number) {
            this.number = number
            this.image.src = `./img/dice${number}.png`
        }
    
        showRandom() {
            let random = Math.floor(Math.random() * 5 + 1)
            random += (random >= this.number)
            this.setNumber(random)
        }
    }

    const preloadImages = () => {
        const img = new Image
        for(let i = 1; i < 7; i++) {
            img.src = `./img/dice${i}.png`
        }
    }
    preloadImages()

    const game = new Game()
    const rollBtn = document.getElementById("roll")
    const restartBtn = document.getElementById("restart")
    
    rollBtn.addEventListener("click", () => game.roll())
    restartBtn.addEventListener("click", () => game.restart())
})()