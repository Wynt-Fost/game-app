import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from './components/Heading.js';
import Footing from './components/Footing.js';
import DOMPurify from "dompurify";

function App() {
  // api key
  const apiKey = 'd07f35abd3f241b28dd811332c24aff7';

  // storing first api call data
  const [game, setGame] = useState([]);
  // storing second api call data
  const [moreGameInfo, setMoreGameInfo] = useState([]);

  const [userInput, setUserInput] = useState('');
  const [gameSearch, setGameSearch] = useState('');

  // fires api call on user input
  const takeInput = (event) => {
    setUserInput(event.target.value);

  }

  const userSubmit = (event) => {
    event.preventDefault();

    // api call
    // need to add two calls one to get list of games then the next to get game details
    // first call is to get the ID of the game which is a key value pair in response of this first call
    // save the value to a variable and pass it to the second call 
    axios({

      url: 'https://api.rawg.io/api/games',
      method: "GET",
      dataResponse: 'json',
      params: {
        key: apiKey,
        search: userInput,
        page_size: 1,
      }
    }).then((response) => {
      const firstApiCall = response.data.results
      setGame(firstApiCall)
      const gameId = response.data.results[0].id
      // second call takes the gameId variable at the end of the url and returns the next call with more info from the "get details of the game" url 
      // It doesnt take the id as a parameter will have to physically attach it to the end of the url
      axios({

        id: gameId,
        url: 'https://api.rawg.io/api/games/' + gameId,
        method: "GET",
        dataResponse: 'json',
        params: {
          key: apiKey,
        }
      }).then((response) => {

        const secondApiCall = response.data;
        setMoreGameInfo(secondApiCall)

      }).catch((error) => {
        alert("There was an error returning your data")
      })
    })
    setGameSearch(userInput);
  }

  // because a value in the second response comes with html elements I had to use dangerouslySetInnerHTML attribute. Just to keep it safe i installed a sanitizer and will run my code through this. Although its not needed because I am not connecting this to a user input, I still will show that this is what could be done.
  const myHTMLData = moreGameInfo.description;
  const myPurifiedData = DOMPurify.sanitize(myHTMLData);

  // form section follows
  return (
    <div >
      <section className='formSection'>
        <div className='wrapper'>
          <Heading title="Game Finder" />

          <div className='userForm'>
            <h1>Choose your game!</h1>
            {/* on submit  */}
            {<form onSubmit={userSubmit}>
              <label htmlFor="search">Search for your favourite game: </label> <br />
              <label className='scrollDown' htmlFor="subHeading">Once submitted scroll down to Get details back!</label> <br />
              <input type="text" className='search' placeholder='Game name' onChange={takeInput} value={userInput} /> <br />
              <button >Search</button>
            </form>}
          </div>
        </div>
      </section>

      {/* map through response to get what i need the following is returning the api data on the screen */}
      {game.map((moreGameDetails) => {
        return (

          <section key={moreGameDetails} className='gameDiv'>

            <div className='wrapper'>
              <div className='gameDivInfo' >
                <h2>{moreGameInfo.name}</h2>
                <ol>
                  <li><b>MetaCritic Rating:</b>  {moreGameDetails.metacritic} </li>
                  <li><b> Genre of game:</b> {moreGameDetails.genres[0].name}</li>
                  <li><b> MetaCritic Website:</b> <a href={moreGameInfo.metacritic_url}>{moreGameInfo.metacritic_url}</a>   </li>
                  <li> <b>Website:</b> <a href={moreGameInfo.website}> {moreGameInfo.website} </a></li>
                </ol>

                {/* this is where i used the purifier for this attribute and it is passed here */}
                <p dangerouslySetInnerHTML={{ __html: myPurifiedData }}></p>

                <p>{moreGameInfo.description_raw}</p>
                <p>{moreGameDetails.description_raw}</p>
                <div className='pictureGallery'>
                  {/* another .map() to map through and return all available  photos */}
                  {moreGameDetails.short_screenshots.map((screenShot, index) => {
                    return (
                      <img className='screenShot' src={screenShot.image} key={index} alt="" />
                    )
                  })}
                </div>
              </div>
              <Footing />
            </div>
          </section>
        )
      })}

    </div>
  );
}

export default App;
