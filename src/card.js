class Card{
  constructor(card){
    this.id = card.id
    this.word = card.word
    this.type = card.type
    this.clicked = false
  }

  getElement(card){
    const cardEl = document.createElement('div')
    cardEl.classList = 'card flex'
    cardEl.dataset.id = this.id
    cardEl.addEventListener('click', e => {this.clickCard(e.target.dataset.id)})
    cardEl.innerText = `${this.word.toUpperCase()}`
    return cardEl
  }

  clickCard(id){
    this.clicked = true
    this.showCard(id)
  }

  showCard(){
    const thisEl = document.querySelector(`div[data-id="${this.id}"]`)
    thisEl.classList.add(this.type)
    thisEl.innerText = ""
  }

}
