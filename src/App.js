import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from './components/Heading.js';



function App() {
  const apiKey = 'd07f35abd3f241b28dd811332c24aff7';

  const [game, setGame] = useState([]);
  const [moreGameInfo, setMoreGameInfo] = useState([]);

  const [userInput, setUserInput] = useState('');
  const [gameSearch, setGameSearch] = useState('');

  // let variableOfGameID = "";


  // useEffect(() => {



  //   // gameId = response.data.results[0].id



  // }, [gameSearch]);

  //   axios({

  //     //id: '4348',
  //     // url: 'https://api.rawg.io/api/games/',
  //     url: 'https://api.rawg.io/api/games/' + gameId,
  //     method: "GET",
  //     dataResponse: 'json',
  //     params: {
  //       key: apiKey,
  //       // search: gameSearch,
  //       // search: 'escape from tarkov',
  //       // id:id,
  //       // page_size: 1
  //       // q: searchTerm
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //     //  console.log(response.data.results)
  //     // setGame(response.data.results)

  //   })
  // }, [gameSearch]);

  const takeInput = (event) => {
    // console.log('is this working?', event.target.value)
    setUserInput(event.target.value);

  }

  const userSubmit = (event) => {
    event.preventDefault();

    axios({


      url: 'https://api.rawg.io/api/games',
      method: "GET",
      dataResponse: 'json',
      params: {
        key: apiKey,
        search: userInput,
        // search: 'escape from tarkov',
        // id:id,
        page_size: 1,
      }
    }).then((response) => {
      // console.log(response.data.results[0].id);
      const firstApiCall = response.data.results
      console.log(firstApiCall)
      setGame(firstApiCall)
      const gameId = response.data.results[0].id



      axios({

        id: gameId,
        url: 'https://api.rawg.io/api/games/' + gameId,
        method: "GET",
        dataResponse: 'json',
        params: {
          key: apiKey,
          // search: gameSearch,
          // search: 'escape from tarkov',
          // id: gameId,
          // q: searchTerm
        }
      }).then((response) => {
        // setGame.response.data

        const secondApiCall = response.data;
        console.log(secondApiCall)
        setMoreGameInfo(secondApiCall)
        // setGame(moreGameInfo)
      }).catch((error) => {

        alert("There was an error returning your data")
        console.log(error)
      })


      //

      // C.id = id
      //  console.log(response.data.results)

    })



    setGameSearch(userInput);

  }



  return (


    <div >
      <Heading />
      <section className='formSection'>

        <div className='userForm'>
          <h1>Choose your game!</h1>

          {<form onSubmit={userSubmit}>
            <label htmlFor="search">Search for your favourite game: </label> <br />
            <label htmlFor="subHeading">Get details back!</label> <br />
            <input type="text" className='search' placeholder='Game name' onChange={takeInput} value={userInput} /> <br />
            <button   >Search</button>
          </form>}
        </div>
      </section>

      <section>
        <div>

        </div>
      </section>

      {/* {moreGameInfo.map((gameDetails) => {
        return (
          <div className='gameDiv'>
            <h2>{gameDetails.name}</h2>
            <p>{gameDetails.description}</p>
          </div>
        )
      })} */}


      {game.map((moreGameDetails) => {
        return (

          <section key={moreGameDetails} className='gameDiv'>

            <div className='wrapper'>
              <div className='gameDivInfo' >
                <h2>{moreGameInfo.name}</h2>
                <ol>
                  {/* <li>{moreGameDetails.publishers[0].name}</li> */}
                  <li><b>MetaCritic Rating:</b>  {moreGameDetails.metacritic} </li>
                  <li><b> Genre of game:</b> {moreGameDetails.genres[0].name}</li>
                  <li><b> MetaCritic Website:</b> <a href={moreGameInfo.metacritic_url}>{moreGameInfo.metacritic_url}</a>   </li>
                  <li> <b>Website:</b> <a href={moreGameInfo.website}> {moreGameInfo.website} </a></li>
                </ol>

                <p dangerouslySetInnerHTML={{ __html: moreGameInfo.description }}></p>
                <p>{moreGameDetails.description_raw}</p>
                <div className='pictureGallery'>
                  {moreGameDetails.short_screenshots.map((pictures) => {
                    <img className='screenShot' src={pictures.image} alt="" />
                  })}
                  <img className='screenShot' src={moreGameDetails.short_screenshots[0].image} alt="" />
                  <img className='screenShot' src={moreGameDetails.short_screenshots[1].image} alt="" />
                  <img className='screenShot' src={moreGameDetails.short_screenshots[2].image} alt="" />
                  <img className='screenShot' src={moreGameDetails.short_screenshots[3].image} alt="" />
                  <img className='screenShot' src={moreGameDetails.short_screenshots[4].image} alt="" />
                  <img className='screenShot' src={moreGameDetails.short_screenshots[5].image} alt="" />
                </div>

              </div>
            </div>
          </section>
        )
      })}

      {/* {setGame.map((gameInfo) => {
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


      })} */}



    </div>
  );
}

export default App;
