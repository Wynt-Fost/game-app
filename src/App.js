import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import displayGame from './components/displayGame.js'


function App() {
  const apiKey = 'd07f35abd3f241b28dd811332c24aff7';

  const [game, setGame] = useState([])

  const [userInput, setUserInput] = useState('');
  const [gameSearch, setGameSearch] = useState('');

  useEffect(() => {
    axios({
      url: 'https://api.rawg.io/api/games',
      // url: 'https://api.rawg.io/api/games/{id}',
      method: "GET",
      dataResponse: 'json',
      params: {
        key: apiKey,
        // search: gameSearch,
        search: 'escape from tarkov',
        // id: 52106,
        page_size: 1
        // q: searchTerm
      }
    }).then((response) => {
      console.log(response.data.results)

      setGame(response.data.results)

    })
  }, [gameSearch]);

  const takeInput = (event) => {
    // console.log('is this working?', event.target.value)
    setUserInput(event.target.value);

  }


  const userSubmit = (event) => {
    event.preventDefault();
    setGameSearch(userInput);

  }



  return (
    <div >
      <h1>Choose your game!</h1>

      {<form onSubmit={userSubmit}>
        <label htmlFor="search">Search for your favourite game: </label>
        <input type="text" id='search' onChange={takeInput} value={userInput} />
        <button>Search</button>
      </form>}

      {/* <displayGame theGame={theGame} /> */}

      {game.map((gameInfo) => {
        return (
          <div>
            <h2>{gameInfo.name}</h2>
            <p>{gameInfo.metacritic}</p>
            <img src={gameInfo.background_image} alt="" />
          </div>
        )
      })}

    </div>
  );
}

export default App;
