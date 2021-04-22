import { useState, useEffect } from "react";
import firebase from "./firebase";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WinPopUp from "./WinPopUp";
// adding images for tokens in grid
import falcon1 from "./images/falcon1.svg";
import falcon9 from "./images/falcon9.svg";
import falconHeavy from "./images/falconHeavy.svg";
import starship from "./images/starship.svg";
function GameBoard({ data, localToken }) {
  // initializing stateful variables for the player Grids.
  const [boardPlayerOne, setBoardPlayerOne] = useState(data.playerOne.grid);
  const [boardPlayerTwo, setBoardPlayerTwo] = useState(data.playerTwo.grid);
  const [whichPlayer, setWhichPlayer] = useState("playerOne");
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState(`${data.playerOne.name}'s turn`);
  const [winner, setWinner] = useState("");
  //determine which player in order to submit the rocket selection to the appropriate branch in firebase
  //also capture user name to display on screen
  useEffect(() => {
    if (localToken) {
      const playerOne = data.playerOne.token === localToken;
      const playerTwo = data.playerTwo.token === localToken;
      if (playerOne) {
        setWhichPlayer("playerOne");
        setUserName(data.playerOne.name);
      }
      if (playerTwo) {
        setWhichPlayer("playerTwo");
        setUserName(data.playerTwo.name);
      }
    }
  }, [data, localToken]);
  // this boolean is placed so that that the component isn't rendered until both players have selected their rockets, the rockets have been placed in their respective grids, and updated in state.
  let readyToGo = false;
  if (boardPlayerOne && boardPlayerTwo) {
    readyToGo = true;
  }
  // game logic is handled inside this function that is triggered when the user clicks on any square.
  const handleClick = (event, index, player) => {
    let status;
    // this checks in firebase to see if the game is over. If not, it continues through the function.
    if (!data.isGameOver) {
      // this makes a connection to the database for whomever is the current player.
      const dbRef = firebase.database().ref(`/${player}`);
      // this variable gathers the value mapped into the button, which corresponds to a point in the array
      const cell = event.target.value;
      // initializing a score variable and stores the array from firebase into a variable. The score is the total number of the length of your ships.
      let score = data[player].score;
      const boardCopy = data[player].grid;
      // if a cell has already been pressed by a player, it will have one of these icons, and nothing will happen.
      if (cell === "💥" || cell === "🟡") {
        // if the user clicks an empty cell, the conditions below are run.
      } else {
        // values not occupied by a ship in the array are denoted with a 0, which is a miss.
        if (cell === "0") {
          boardCopy[index] = "🟡";
          status = `${data[player].name} misses.`;
        } else {
          // anything else in the array grid is a ship, and counts as one hit, which is marked into the array at the corresponding index, and 1 is subtracted from the total score.
          boardCopy[index] = "💥";
          status = `${data[player].name} hits!`;
          score = score - 1;
        }
        // this object updates firebase with the results of the turn for the corresponding player.
        const turnResult = {
          grid: boardCopy,
          score: score,
        };
        dbRef.update(turnResult);
      }
    }
    // this determines who will take the next turn, and updates that in firebase
    const dbRef = firebase.database().ref();
    const update = {};
    update.turn = player;
    update.status = status;
    dbRef.update(update);
  };
  // this useEffect opens a listener to firebase, and updates the state of the player grids when the array grids are updated in firebase
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      setBoardPlayerOne(response.val().playerOne.grid);
      setBoardPlayerTwo(response.val().playerTwo.grid);
      setStatus(response.val().status);
      // THIS IS WHEN A WINNER IS FOUND
      let winner;
      if (
        response.val().playerOne.score === 0 ||
        response.val().playerTwo.score === 0
      ) {
        if (response.val().playerOne.score === 0) {
          winner = response.val().playerOne.name;
        } else if (response.val().playerTwo.score === 0) {
          winner = response.val().playerTwo.name;
        }
        const dbRef = firebase.database().ref();
        const update = {};
        update.winner = winner;
        update.isGameOver = true;
        dbRef.update(update);
        // game is over: direct to pop up component to display winner}
      }
    });
  }, []);
  return (
    <>
      <Navbar />
      <section className="gameBackground">
        <div className="wrapper">
          {readyToGo ? (
            <div className="GameScreen">
              {data.isGameOver ? <WinPopUp data={data} /> : null}
              {/* TOP LEFT CORNER - PLAYER ONE ATTACKS PLAYER TWO HERE*/}
              <p className="playerName">{userName}</p>
              {whichPlayer === "playerOne" && (
                <div className="container">
                  <p className="status">{data.status}</p>
                  <div>
                    <p className="whosBoard">Opponents Board</p>
                    <div className="grid boardPlayerOne">
                      {boardPlayerTwo.map((value, index) => {
                        const cellValue =
                          value === 0
                            ? null
                            : value === "Falcon 1"
                            ? null
                            : value === "Falcon 9"
                            ? null
                            : value === "Falcon Heavy"
                            ? null
                            : value === "Starship"
                            ? null
                            : value;
                        return (
                          <button
                            key={index}
                            onClick={
                              data.turn === "playerOne"
                                ? (event) =>
                                    handleClick(event, index, "playerTwo")
                                : null
                            }
                            value={boardPlayerTwo[index]}
                          >
                            {cellValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="whosBoard">Players Board</p>
                    {/* BOTTOM LEFT CORNER - PLAYER ONE TRACKS THEIR STATUS HERE*/}
                    <div className="grid mirrorPlayerOne">
                      {boardPlayerOne.map((value, index) => {
                        const cellValue =
                          value === 0 ? null : value === "Falcon 1" ? (
                            <img src={falcon1} alt="Falcon 1 rocket"></img>
                          ) : value === "Falcon 9" ? (
                            <img src={falcon9} alt="Falcon 1 rocket"></img>
                          ) : value === "Falcon Heavy" ? (
                            <img src={falconHeavy} alt="Falcon 1 rocket"></img>
                          ) : value === "Starship" ? (
                            <img src={starship} alt="Falcon 1 rocket"></img>
                          ) : (
                            value
                          );
                        return (
                          <button key={index} value={boardPlayerOne[index]}>
                            {cellValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {whichPlayer === "playerTwo" && (
                <div className="container">
                  <p className="status">{data.status}</p>
                  <div>
                    <p className="whosBoard">Opponents Board</p>
                    <p className="whosBoardText">
                      Click Square to Attack your Opponent
                    </p>
                    {/* TOP RIGHT CORNER - PLAYER TWO ATTACKS PLAYER ONE HERE*/}
                    <div className="grid boardPlayerTwo">
                      {boardPlayerOne.map((value, index) => {
                        const cellValue =
                          value === 0
                            ? null
                            : value === "Falcon 1"
                            ? null
                            : value === "Falcon 9"
                            ? null
                            : value === "Falcon Heavy"
                            ? null
                            : value === "Starship"
                            ? null
                            : value;
                        return (
                          <button
                            key={index}
                            onClick={
                              data.turn === "playerTwo"
                                ? (event) =>
                                    handleClick(event, index, "playerOne")
                                : null
                            }
                            value={boardPlayerOne[index]}
                          >
                            {cellValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {/* BOTTOM RIGHT CORNER - PLAYER TWO TRACKS THEIR STATUS */}
                  <div>
                    <p className="whosBoard">Players Board</p>
                    <p className="whosBoardText">
                      Where Your Rockets have Been Hit
                    </p>
                    <div className="grid mirrorPlayerTwo">
                      {boardPlayerTwo.map((value, index) => {
                        const cellValue =
                          value === 0 ? null : value === "Falcon 1" ? (
                            <img src={falcon1} alt="Falcon 1 rocket"></img>
                          ) : value === "Falcon 9" ? (
                            <img src={falcon9} alt="Falcon 1 rocket"></img>
                          ) : value === "Falcon Heavy" ? (
                            <img src={falconHeavy} alt="Falcon 1 rocket"></img>
                          ) : value === "Starship" ? (
                            <img src={starship} alt="Falcon 1 rocket"></img>
                          ) : (
                            value
                          );
                        return (
                          <button key={index} value={boardPlayerTwo[index]}>
                            {cellValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
}
export default GameBoard;
