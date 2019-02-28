class Card{
  constructor(card){
    this.id = card.id
    this.word = card.word
    this.type = card.type
  }

  getElement(card){
    const cardEl = document.createElement('div')
    cardEl.classList = 'card flex'
    cardEl.dataset.id = this.id
    cardEl.addEventListener('click', e => {this.showColor(e)})

    cardEl.innerText = `${this.word}`

    // const wordEl = document.createElement('span')
    // wordEl.innerText = `${this.word}`
    // wordEl.classList = 'word'
    // cardEl.appendChild(wordEl)

    return cardEl
  }

  showColor(e){
    const thisEl = document.querySelector(`div[data-id="${e.target.dataset.id}"]`)
    thisEl.classList.add(this.type)
    thisEl.innerText = ""
  }


}
