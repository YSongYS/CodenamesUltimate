class Board{
  constructor(){
    this.cards = []
    this.startColor = this.initStartColor()
    this.materView = false
    this.boardEl = document.querySelector('div.board-container')
    this.timePause = false
    this.timeleft = "03:00"
    this.redCount = (this.startColor==='red')? 9:8
    this.blueCount = (this.startColor==='blue')? 9:8
    this.currentTurn = this.startColor
    this.countDown = this.startTimer()
  }

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
    const operativeViewBtn = document.querySelector('#player-view-btn')
    const masterViewBtn = document.querySelector('#master-view-btn')
    operativeViewBtn.addEventListener('click',this.operativeView.bind(this))
    masterViewBtn.addEventListener('click',this.masterView.bind(this))

    //////////////////////
    const startTimerBtn = document.querySelector('#start-timer-btn')
    startTimerBtn.addEventListener('click', e=> this.startTimer())

    const resetTimerBtn = document.querySelector('#reset-timer-btn')
    resetTimerBtn.addEventListener('click', e=>this.resetTimer(countDown))

    const pauseTimerBtn = document.querySelector('#pause-timer-btn')
    pauseTimerBtn.addEventListener('click', ()=> this.pauseTimer())

    this.displayTurn()
    this.displayScoreBoard()

    return false
  }

  displayTurn(){
    const currentTeamEl = document.querySelector('#current-team')
    currentTeamEl.innerText = this.currentTurn.toUpperCase()
  }


  displayScoreBoard(){
    this.checkGameOver()
    const scoreBoardEl = document.querySelector('div.score-board')
    scoreBoardEl.innerText = `To win: Red-${this.redCount} | Blue-${this.blueCount}`
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
    const navDiv = document.querySelector(".countdown")
    navDiv.innerHTML = ""
    navDiv.innerHTML = `
    <h2>GAME OVER</h2>
    <h4>${winner.toUpperCase()} WON</h4>
    `
  }

  operativeView(){
    this.renderBoard(this.cards)
    const operativeViewBtn = document.querySelector('#player-view-btn')
    const masterViewBtn = document.querySelector('#master-view-btn')
    operativeViewBtn.classList = "btn btn-info"
    masterViewBtn.classList = "btn btn-secondary"
  }

  masterView(){
    this.cards.forEach(cardInstance => {
      cardInstance.showCard()
    })
    const operativeViewBtn = document.querySelector('#player-view-btn')
    const masterViewBtn = document.querySelector('#master-view-btn')
    operativeViewBtn.classList = "btn btn-secondary"
    masterViewBtn.classList = "btn btn-info"
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

  renderBoard(cards){
    this.boardEl.innerHTML = ''
    cards.forEach((cardInstance) => {
      this.boardEl.appendChild(cardInstance.getElement())
      if (cardInstance.clicked) {cardInstance.showCard()}
    })
    this.boardEl.addEventListener('click', e=>this.clickCard(e))
  }

  clickCard(event){
    const cardId = event.target.dataset.id
    const cardInstance = this.cards.find((card)=>card.id==cardId)

    cardInstance.clickCard()
    this.displayScoreBoard()
  }

  createCard(card){
    const cardInstance = new Card (card)
    this.cards.push(cardInstance)
  }

  startTimer(timeleft){
    this.timePause = false
    const countDown = setInterval(getTime.bind(this), 1000)
    const timerEl = document.querySelector('div.countdown p')

    function getTime (){
      let [min,sec] = timerEl.innerText.split(":")
      let secondsLeft = parseInt(min)*60 + parseInt(sec)
      if (!this.timePause) {secondsLeft -= 1;}
      min = Math.floor(secondsLeft/60)
      sec = secondsLeft%60
      sec = (sec<10)? `0${sec}`: sec
      min = (min<10)? `0${min}`: min
      timerEl.innerText = `${min}:${sec}`
      if (secondsLeft<=0) {clearInterval(countDown)}
    }

    timerEl.innerText = timeleft;
    return countDown
  }

  pauseTimer(){
    this.timePause = true
    clearInterval(this.countDown)
    this.timeleft = timerEl.innerText
  }

  resetTimer(){
    console.log('inside countDown')
    const timerEl = document.querySelector('div.countdown p')
    this.timeleft = '03:00'
    console.log(this.currentTurn)
    this.currentTurn = (this.currentTurn==='blue')? 'red':'blue'
    this.displayTurn()
    console.log(this.currentTurn)
    this.timePause = true
    clearInterval(this.countDown)
    timerEl.innerText = this.timeleft;
  }

}
