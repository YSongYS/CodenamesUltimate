class Adapters {
  static getRandomWords (){
    const URL = 'http://localhost:3000/words'
    return fetch(URL)
      .then (res => res.json())
      .then (wordsArray => randomSelection(wordsArray))

    function randomSelection (wordsArray){
      const selectedWords = []
      while (selectedWords.length<25) {
        const randomNumber = Math.round(Math.random()*400)
        const selectedWord = wordsArray[randomNumber]
        if (!selectedWords.includes(selectedWord)) {
          selectedWords.push(selectedWord)
        }
      }
      return selectedWords
    }
  }
}
