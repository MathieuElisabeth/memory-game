import { useState, useEffect } from 'react';
import './App.css';
import { mangas } from './mangas';
import Modal from './components/Modal/Modal';

const App = () => {

  const mangasPair = [...mangas, ...mangas];

  const [mangasCards, setMangasCards] = useState(mangasPair.sort(() => Math.random() - 0.5))
  const [openCard, setOpenCard] = useState([] as any)
  const [matched, setMatched] = useState([] as any)
  const [tryNumber, setTryNumber] = useState(15)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState({ modal: false, text: '' })

  useEffect(() => {
    const firstMatch = mangasCards[openCard[0]];
    const secondMatch = mangasCards[openCard[1]];

    if (secondMatch && firstMatch.id === secondMatch.id) {
      setMatched((matched: any) => [...matched, firstMatch.id]);
      console.log(matched)
    } else if (secondMatch && firstMatch.id !== secondMatch.id) {
      setTryNumber((prevTry) => prevTry - 1)
    }

    if (openCard.length === 2) {
      setTimeout(() => setOpenCard([]), 1000)
    }

  }, [openCard])

  const handleFlip = (index: any) => {
    setOpenCard((opened: any) => [...opened, index])
  }

  const shuffleCard = () => {
    setMangasCards(mangasPair.sort(() => Math.random() - 0.5))
  }

  useEffect(() => {
    if (tryNumber === 0) {
      setResult({
        modal: true,
        text: 'You Lose !'
      })
      setScore(0)
    } else if (matched.length === mangas.length) {
      setResult({
        modal: true,
        text: 'You win !'
      })
      setScore((score) => score + 1)
    }
  }, [tryNumber, matched])


  const restart = () => {
    setMatched([])
    setOpenCard([])
    setResult({ modal: false, text: '' })
    setTryNumber(15)
    shuffleCard()
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="info-game">
        <p>Score: <strong>{score}</strong></p>
        <p>Try: <strong>{tryNumber}</strong></p>
      </div>
      <div className="cards">
        {mangasCards.map((manga, index) => {

          let flipCard = false;

          if (openCard.includes(index)) flipCard = true;

          if (matched.includes(manga.id)) flipCard = true;

          return (
            <div className={`manga-card ${flipCard ? "flipped" : ""}`} key={index} onClick={flipCard ? undefined : () => handleFlip(index)}>
              <div className="inner">
                <div className="front">
                  <img src={manga.image} alt={manga.name} width="100" />
                </div>
                <div className="back"></div>
              </div>
            </div>
          )
        })
        }
      </div>
      {result.modal &&
        <Modal text={result.text} restart={restart} />
      }
    </div>
  );
}

export default App;
