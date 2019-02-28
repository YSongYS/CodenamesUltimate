class Board{
  constructor(){
    this.cards = []
    this.startColor = this.initStartColor()
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
    cards.forEach((cardInstance) => {
      this.boardEl.appendChild(cardInstance.getElement())
    })
  }

  createCard(card){
    const cardInstance = new Card (card)
    this.cards.push(cardInstance)
  }

}
