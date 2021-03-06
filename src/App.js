import { useState, useEffect } from "react";
import firebase from "./firebase";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

import "./App.css";

import GameStart from "./GameStart";
import RocketLobby from "./RocketLobby";
import GameBoard from "./GameBoard";

import star from "./images/star.png";

function App() {
  const [data, setData] = useState({});
  const [localAssignedToken, setLocalAssignedToken] = useState("");
  const history = useHistory();

  //pull from firebase what's in therethere
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      setData(response.val());
    });
  }, []);

  const { playerOne, playerTwo } = data;

  // button for clearing firebase, reset game and return to home screen
  const removeEverything = () => {
    firebase.database().ref("playerOne").set(false);
    firebase.database().ref("playerTwo").set(false);
    firebase.database().ref("isGameOver").set(false);
    firebase.database().ref("turn").set("playerOne");
  };

  //capture the local token number for player
  function captureTheToken(localToken) {
    setLocalAssignedToken(localToken);
  }

  return (
    <Router>
      <div>
        {/* Button for resetting the game */}
        <div className="starAbortContainer">
          <img
            src={star}
            alt="cartoon star icon"
            className="starAbort"
            onClick={() => {
              removeEverything();
              history.push("/");
              window.location.reload(false);
            }}
          />
        </div>

        {/* once both players have both entered the game, GameStart will hide */}
        {!playerTwo && (
          <GameStart
            playerOne={playerOne}
            playerTwo={playerTwo}
            captureTheToken={captureTheToken}
          />
        )}

        {/* Routing for Rocket lobbies */}
        <Route exact path="/" render={() => {}} />
        <Route
          exact
          path="/RocketLobbyOne"
          render={() => (
            <RocketLobby data={data} localToken={localAssignedToken} />
          )}
        />
        <Route
          exact
          path="/RocketLobbyTwo"
          render={() => (
            <RocketLobby data={data} localToken={localAssignedToken} />
          )}
        />

        {/* Routing for Game boards */}
        <Route
          exact
          path="/GameBoardOne"
          render={() => (
            <GameBoard data={data} localToken={localAssignedToken} />
          )}
        />
        <Route
          exact
          path="/GameBoardTwo"
          render={() => (
            <GameBoard data={data} localToken={localAssignedToken} />
          )}
        />
      </div>
    </Router>
  );
}

export default App;
