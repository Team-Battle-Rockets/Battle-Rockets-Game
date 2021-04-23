import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "./firebase";

import Footer from "./Footer";

function GameStart(props) {
  const { playerOne, captureTheToken } = props;

  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [token, setToken] = useState(null);

  //create a unique token when component first mounts (borrowed from somewhere off the internet)
  useEffect(() => {
    function create_UUID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    }
    setToken(create_UUID());
  }, []);

  //handleClick to confirm when players are ready by capturing their name, their assigned token & creating the structure of the database for gameplay
  const handleIsPlayerReady = (player, playerNumber) => {
    firebase.database().ref().child(playerNumber).set({
      name: player,
      token: token,
    });
  };

  //captures text input for user name
  const handleChange = (event, playerNumber) => {
    if (playerNumber === "one") {
      setPlayerOneName(event.target.value);
    }
    if (playerNumber === "two") {
      setPlayerTwoName(event.target.value);
    }
  };

  //variable to determine if playerOne exists in firebase AND that the tokens match from firebase and local state (used to route player one and player two to different areas)
  const isPlayerOne = playerOne && playerOne.token === token;

  //given time for states to set before component unmounts and goes to next
  const delayForUnmount = () => {
    setTimeout(() => props.history.push("/RocketLobbyTwo"), 150);
  };

  return (
    <>
      {/* for playerOne (or ths first person to show up), show this screen */}
      {!playerOne && (
        <>
          <section className="gameStartSection">
            <h1>Battle Rockets</h1>
            <div className="gameStartContainer wrapper">
              <h2>Let's play a game!</h2>
              <h2>Enter your name to start</h2>
              <label className="visually-hidden" for="playerone">
                enter player one
              </label>
              <input
                id="playerone"
                type="text"
                onChange={(event) => handleChange(event, "one")}
                value={playerOneName}
              ></input>
              <button
                onClick={() => {
                  handleIsPlayerReady(playerOneName, "playerOne");
                  setPlayerOneName("");
                  captureTheToken(token);
                  delayForUnmount();
                }}
              >
                Player One START
              </button>
            </div>
          </section>
          <Footer />
        </>
      )}
      {/* Once playerOne has entered, page will ask for player two to enter */}
      {playerOne && !isPlayerOne && (
        <>
          <section className="gameStartSection">
            <h1>Battle Rockets</h1>
            <div className="gameStartContainer wrapper">
              <h2>Player One has already entered the game.</h2>
              <h2>Waiting for player two...</h2>
              <label className="visually-hidden" for="playertwo">
                enter player two
              </label>
              <input
                id="playertwo"
                type="text"
                onChange={(event) => handleChange(event, "two")}
                value={playerTwoName}
              ></input>
              <button
                onClick={() => {
                  handleIsPlayerReady(playerTwoName, "playerTwo");
                  setPlayerTwoName("");
                  captureTheToken(token);
                  delayForUnmount();
                }}
              >
                Player Two START
              </button>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}

export default withRouter(GameStart);
