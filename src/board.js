class Board{
  constructor(){
    this.cards = []
    this.startColor = this.initStartColor()
    this.materView = this.initNavToggle()
    this.boardEl = document.querySelector('div.board-container')
  }

  initBoard(){
    let selectedWords
    Adapters.getRandomWords()
    .then(selectedWords => {this.createCards(selectedWords)})
    .then(() => this.renderBoard(this.cards))
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
    const startTimerBtn = document.querySelector('#start-timer-btn')
    startTimerBtn.addEventListener('click', this.timer.bind(this))
    return false
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
  }

  createCard(card){
    const cardInstance = new Card (card)
    this.cards.push(cardInstance)
  }

  timer(){
    let timePause = false
    const timerEl = document.querySelector('div.countdown p')
    console.log(timerEl.innerText)
    timerEl.innerText = "03:00";

    let countDown = setInterval(getTime, 1000)

    function getTime (){
      let [min,sec] = timerEl.innerText.split(":")
      let secondsLeft = parseInt(min)*60 + parseInt(sec)
      secondsLeft -= 1;
      min = Math.floor(secondsLeft/60)
      sec = secondsLeft%60
      sec = (sec<10)? `0${sec}`: sec
      min = (min<10)? `0${min}`: min
      timerEl.innerText = `${min}:${sec}`
    }

  }

}
