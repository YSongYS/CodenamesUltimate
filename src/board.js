class Board{
  constructor(){
    this.cards = []

    this.boardEl = document.querySelector('div.board-container')

    this.timerEl = document.querySelector('div.countdown p')
    this.startTimerBtn = document.querySelector('#start-timer-btn')
    this.resetTimerBtn = document.querySelector('#reset-timer-btn')
    this.pauseTimerBtn = document.querySelector('#pause-timer-btn')
    this.operativeViewBtn = document.querySelector('#player-view-btn')
    this.masterViewBtn = document.querySelector('#master-view-btn')
    this.currentTeamEl = document.querySelector('#current-team')
    this.scoreBoardEl = document.querySelector('div.score-board')
    this.countDownEl = document.querySelector(".countdown")

    this.startColor = this.initStartColor()
    this.redCount = (this.startColor==='red')? 9:8
    this.blueCount = (this.startColor==='blue')? 9:8
    this.currentTurn = this.startColor
    this.timePause = false
    this.timeleft = "03:00"
    this.countDown = this.startTimer()
    this.materView = false
  }

  ////////////////////////// Intialization //////////////////////////

  initBoard(){
    let selectedWords
    Adapters.getRandomWords()
    .then(selectedWords => {this.createCards(selectedWords)})
    .then(() => {this.renderBoard(this.cards)})
    .then(() => {this.initNavToggle()})
  }

  initStartColor(){
    if (Math.round(Math.random())===1) {return 'red'}
    else {return 'blue'}
  }

  initNavToggle(){
    this.operativeViewBtn.addEventListener('click',this.operativeView.bind(this))
    this.masterViewBtn.addEventListener('click',this.masterView.bind(this))

    this.startTimerBtn.addEventListener('click', e=> this.startTimer())
    this.resetTimerBtn.addEventListener('click', e=>this.resetTimer())
    this.pauseTimerBtn.addEventListener('click', e=> this.pauseTimer())

    this.displayTurn()
    this.displayScoreBoard()
  }

  initTypeArray(){
    let typeArray = []
    let typeCount = {'red':8, 'blue':8, 'civilian':7, 'assassin':1}
    typeCount[this.startColor] += 1

    for (const key in typeCount) {
      for (let i= 0; i<typeCount[key]; i++){
        typeArray.push(key)
      }
    }
    typeArray.sort(() => 0.5-Math.random())
    return typeArray
  }

  createCards(selectedWords){
    const typeArray = this.initTypeArray()
    selectedWords.forEach((word,i) => {
      const card = {
        'word':word,
        'id':i+1,
        'type':typeArray[i]
      }
      this.createCard(card)
      })
  }

  createCard(card){
    const cardInstance = new Card (card)
    this.cards.push(cardInstance)
  }

  ////////////////////////// Display and render functions //////////////////////////

  renderBoard(cards){
    this.boardEl.innerHTML = ''
    cards.forEach((cardInstance) => {
      this.boardEl.appendChild(cardInstance.getElement())
      if (cardInstance.clicked) {cardInstance.showCard()}
    })
    this.boardEl.addEventListener('click', e=>this.clickCard(e))
  }

  displayTurn(){
    this.currentTeamEl.innerText = this.currentTurn.toUpperCase()
  }


  displayScoreBoard(){
    this.checkGameOver()
    this.scoreBoardEl.innerText = `To win: Red-${this.redCount} | Blue-${this.blueCount}`
  }

  checkGameOver(){
    this.redCount = this.cards.filter((card)=>card.type==='red'&&card.clicked===false).length
    this.blueCount = this.cards.filter((card)=>card.type==='blue'&&card.clicked===false).length
    const assassinClicked = !!this.cards.filter((card)=>card.type==='assassin'&&card.clicked===true).length
    if (this.redCount * this.blueCount === 0) {
      this.redCount===0? this.displayGameOver('red'):this.displayGameOver('blue')
    }
    else if (assassinClicked){
      this.currentTurn==='red'? this.displayGameOver('blue'):this.displayGameOver('red')
    }
  }

  displayGameOver(winner){
    this.countDownEl.innerHTML = ""
    this.countDownEl.innerHTML = `
    <h2>GAME OVER</h2>
    <h4>${winner.toUpperCase()} WON</h4>
    `
  }

  ////////////////////////// Dynamic User Interactions //////////////////////////

  clickCard(event){
    const cardId = event.target.dataset.id
    const cardInstance = this.cards.find((card)=>card.id==cardId)

    cardInstance.clickCard()
    this.displayScoreBoard()
  }

  operativeView(){
    this.renderBoard(this.cards)
    this.operativeViewBtn.classList = "btn btn-dark"
    this.masterViewBtn.classList = "btn btn-outline-dark"
  }

  masterView(){
    this.cards.forEach(cardInstance => {
      cardInstance.showCard()
    })
    this.operativeViewBtn.classList = "btn btn-outline-dark"
    this.masterViewBtn.classList = "btn btn-dark"
  }

  ////////////////////////// Timer functions //////////////////////////

  startTimer(){
    this.timePause = false
    this.timerEl.innerText = this.timeleft
    this.timerEl.style.color = (this.currentTurn === 'blue')? 'navy':'maroon'
    this.countDown = setInterval(getTime.bind(this), 1000)
    this.startTimerBtn.disabled = true

    function getTime (){
      let [min,sec] = this.timerEl.innerText.split(":")
      let secondsLeft = parseInt(min)*60 + parseInt(sec)
      if (!this.timePause) {secondsLeft -= 1;}
      min = Math.floor(secondsLeft/60)
      sec = secondsLeft%60
      sec = (sec<10)? `0${sec}`: sec
      min = (min<10)? `0${min}`: min
      this.timerEl.innerText = `${min}:${sec}`
      if (secondsLeft<=0) {clearInterval(this.countDown)}
    }

    this.timerEl.innerText = this.timeleft;
    return this.countDown
  }

  pauseTimer(){
    this.startTimerBtn.disabled = false
    this.timePause = true
    clearInterval(this.countDown)
    this.timeleft = this.timerEl.innerText
  }

  resetTimer(){
    this.startTimerBtn.disabled = true
    clearInterval(this.countDown)
    this.timeleft = '03:00'
    this.currentTurn = (this.currentTurn==='blue')? 'red':'blue'
    this.displayTurn()
    this.countDown = this.startTimer()
  }

}
