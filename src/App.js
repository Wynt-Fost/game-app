import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';



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
        search: gameSearch,
        // search: 'escape from tarkov',
        // id: 654,
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

    setGameSearch('', userInput);

  }



  return (
    <div >
      <section className='userForm'>
        <h1>Choose your game!</h1>

        {<form onSubmit={userSubmit}>
          <label htmlFor="search">Search for your favourite game: </label>
          <input type="text" id='search' onChange={takeInput} value={userInput} />
          <button>Search</button>
        </form>}
      </section>



      {game.map((gameInfo) => {
        return (
          <div className='gameDiv'>
            <h2>{gameInfo.name}</h2>
            <p className='metaScore' >{gameInfo.metacritic}</p>
            <div className='pictureGallery'>
              <img className='screenShot' src={gameInfo.short_screenshots[0].image} alt="" />
              <img className='screenShot' src={gameInfo.short_screenshots[1].image} alt="" />
              <img className='screenShot' src={gameInfo.short_screenshots[2].image} alt="" />
              <img className='screenShot' src={gameInfo.short_screenshots[3].image} alt="" />
            </div>

          </div>

        )
      })}



    </div>
  );
}

export default App;
