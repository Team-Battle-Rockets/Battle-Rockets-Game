import { useState, useEffect } from "react";
import ScriptTag from 'react-script-tag';
import firebase from "./firebase";
import "./App.css";
import WinPopUp from "./WinPopUp";
import placeRockets from "./placeRockets";

function GameBoard({data, localToken}) {

  // if (localToken) {
  //   const playerOne = data.playerOne.token;
    // const playerTwo = data.playerTwo.token === localToken;

    // if (playerOne) {
    //   placeRockets(data.playerOne.rocketSelected[0], boards.playerOne, "playerOne");
    //   placeRockets(data.playerOne.rocketSelected[1], boards.playerOne, "playerOne");
    //   placeRockets(data.playerOne.rocketSelected[2], boards.playerOne, "playerOne");
    // }
    // if (playerTwo) {
    //   placeRockets(data.playerTwo.rocketSelected[0], boards.playerTwo, "playerTwo");
    //   placeRockets(data.playerTwo.rocketSelected[1], boards.playerTwo, "playerTwo");
    //   placeRockets(data.playerTwo.rocketSelected[2], boards.playerTwo, "playerTwo");
  //   }
  // }

  
  const [boardPlayerOne, setBoardPlayerOne] = useState(data.playerOne.grid);
  const [boardPlayerTwo, setBoardPlayerTwo] = useState(data.playerTwo.grid);
  const [playerOneScore, setPlayerOneScore] = useState(10);
  const [playerTwoScore, setPlayerTwoScore] = useState(10);
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  let readyToGo = false;
  if (boardPlayerOne && boardPlayerTwo) {
    readyToGo = true;
  }

  // useEffect(() => {

    

  // }, []);

  // initializing gameboard as an object with two arrays to use for game logic, and also to pass to firebase for two player integration
  
// useEffect( () => {
//   const boards = {
//     playerOne : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
//     playerTwo : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
//   }

//   // this function is used to randomly rotate rockets and place them randomly on the gameboard, and in the gameboard array.
//   const placeRockets = (rocket, gameBoard, player) => {
//     const gameLogic = {};
//     if (player === "playerOne") {
//       gameBoard = boards.playerOne;
//       gameLogic.playerOneGrid = gameBoard;
//     }
//     if (player === "playerTwo") {
//       gameBoard = boards.playerTwo;
//       gameLogic.playerTwoGrid = gameBoard;
//     }
//     // getting random value from ship direction array to see if ship will be pointed horizontally or vertically, why showing how many jumps its position will take in the array. If it's horizontal, it will increment by one, and if vertical, it will increment by 7 (the width of the board).
//     let direction;
//     let randomDirection = Math.floor(Math.random() * rocket.directions.length);
//     let currentDirection = rocket.directions[randomDirection];
//     if (randomDirection === 0) {
//       direction = 1;
//     }
//     if (randomDirection === 1) {
//       direction = 7;
//     }
//     // find a random start point for each rocketship
//     let randomStart = Math.abs(Math.floor(Math.random() * gameBoard.length - rocket.directions[0].length * direction));

//     // make sure that squares we're placing rockets into aren't occupied
//     const isTaken = currentDirection.some((index) => gameBoard[randomStart + index] !== 0);
//     // if current rocket is at the 6th spot in the array row (the far right edge), it can still register, but if it's higher that that it can't be placed on the board
//     const atRightEdge = currentDirection.some((index) => (randomStart + index) % 7 === 6);
//     // if current rocket is at the 1st spot in the array row (row 0, the far left edge), it can still register, but if it's lower than that it can't be placed on the board
//     const atLeftEdge = currentDirection.some((index) => (randomStart + index) % 7 === 0);
//     // if the rocket position meets all these conditions by not being in a taken space, and not being over the left or right edge of the board, it can be placed on the board
//     if (!isTaken && !atRightEdge && !atLeftEdge) {
//       currentDirection.forEach((index) => {
//         gameBoard[randomStart + index] = rocket.name;
//       });
//     // once the rocket has found its position, update the game board in firebase to enable two player play.
//     const dbRef = firebase.database().ref();
//     dbRef.update(gameLogic);

//       // if none of the conditions above are met to properly place a rocket on the gameboard, the process is repeated until successful.
//     } else {
//       placeRockets(rocket, gameBoard);
//     }
    
//   };


//   if (localToken) {
//     const playerOne = data.playerOne.token === localToken;
//     const playerTwo = data.playerTwo.token === localToken;

//     if (playerOne) {
//       setWhichPlayer("playerOne");
//       placeRockets(data.playerOne.rocketSelected[0], boards, "playerOne");
//       placeRockets(data.playerOne.rocketSelected[1], boards, "playerOne");
//       placeRockets(data.playerOne.rocketSelected[2], boards, "playerOne");
//     }
//     if (playerTwo) {
//       setWhichPlayer("playerTwo");
//     }
//   }

//     // placeRockets(data.playerTwo.rocketSelected[0], boards, "playerTwo");
//     // placeRockets(data.playerTwo.rocketSelected[1], boards, "playerTwo");
//     // placeRockets(data.playerTwo.rocketSelected[2], boards, "playerTwo");


// }, [data, localToken])



  


  // this useEffect takes the values of the player one and player two arrays that are in firebase, and uses them to set state for both player boards. They need to be in firebase first in order to enable two-player play, because they'll both be working from the same DB.
  // useEffect( () => {
  //   const dbRef = firebase.database().ref();
  //   const gameLogic = {
  //     playerOne : {
  //       grid: boardPlayerOne
  //     },
  //     playerTwo : {
  //       grid: boardPlayerTwo
  //     },
  //     playerOneScore: playerOneScore,
  //     playerTwoScore: playerTwoScore,
  //     isPlayerOneTurn: playerOneTurn,
  //     isGameOver: isGameOver,
  //   };
  //   dbRef.update(gameLogic);

  // }, [] )

  // game logic is handled inside this function that is triggered when the user clicks on any square
  const handleClick = (event, index, player) => {
    console.log(player)
    console.log(data.isPlayerOneTurn)
      if (!data.isGameOver) {
        // this variable gathers the value mapped into the button, which corresponds to a point in the array
        const cell = event.target.value;
        // creating copies of both arrays that will be used to set the updated states of the game board and mirror
        if (player === "playerOne") {
          const boardCopy = [...boardPlayerTwo];
          if (cell === "🚀" || cell === "⭕️") {
          } else {
            if (cell === "0") {
              boardCopy[index] = "⭕️";
            } else {
              boardCopy[index] = "🚀";
              setPlayerOneScore(playerOneScore - 1);
            }
            
            // this sets the state of the board for player two.
            setBoardPlayerTwo(boardCopy);
            // switch from player to player
            setPlayerOneTurn(false);
          }
        } else {
          const boardCopy = [...boardPlayerOne];
          if (cell === "🚀" || cell === "⭕️") {
          } else {
            if (cell === "0") {
              boardCopy[index] = "⭕️";
            } else {
              boardCopy[index] = "🚀";
              setPlayerTwoScore(playerTwoScore - 1);
            }
            // this sets the state of the board for player two.
            setBoardPlayerOne(boardCopy);
            // switch from player to player
            setPlayerOneTurn(true);
          }
        }
      }
    // const winPopUp = document.querySelector(".win");
    // const winButton = document.querySelector(".winButt");

    // if (playerOneScore === 0 || playerTwoScore === 0) {
    //   setIsGameOver(true);
    //   // game is over: direct to pop up component to display winner
    //   WinPopUp();
    //   winPopUp.classList.remove("hidden");
    //   winButton.classList.remove("hidden");
    // }

    // const gameLogic = {
    //   playerOneGrid: boardPlayerOne,
    //   playerTwoGrid: boardPlayerTwo,
    //   playerOneScore: playerOneScore,
    //   playerTwoScore: playerTwoScore,
    //   isPlayerOneTurn: playerOneTurn,
    //   isGameOver: isGameOver,
    // };
    // dbRef.update(gameLogic);
  };




  // this useEffect checks if there is a game winner and updates firebase with the game results after every player click.
  // useEffect( () => {
  //   const dbRef = firebase.database().ref();
  //   const winPopUp = document.querySelector(".win");
  //   const winButton = document.querySelector(".winButt");

  //   if (playerOneScore === 0 || playerTwoScore === 0) {
  //     setIsGameOver(true);
  //     // game is over: direct to pop up component to display winner
  //     WinPopUp();
  //     winPopUp.classList.remove("hidden");
  //     winButton.classList.remove("hidden");
  //   }

  //   const gameLogic = {
  //     playerOne : {
  //       grid: boardPlayerOne
  //     },
  //     playerTwo : {
  //       grid: boardPlayerTwo
  //     },
  //     playerOneScore: playerOneScore,
  //     playerTwoScore: playerTwoScore,
  //     isPlayerOneTurn: playerOneTurn,
  //     isGameOver: isGameOver,
  //   };
  //   dbRef.update(gameLogic);

  // }, [boardPlayerOne, boardPlayerTwo, playerOneScore, playerTwoScore, playerOneTurn, isGameOver])

  //   const dbRef = firebase.database().ref();
  //   const gameLogic = {
  //     playerOneGrid: boardPlayerOne,
  //     playerTwoGrid: boardPlayerTwo,
  //     playerOneScore: playerOneScore,
  //     playerTwoScore: playerTwoScore,
  //     isPlayerOneTurn: playerOneTurn,
  //     isGameOver: isGameOver,
  //   };
  //   dbRef.set(gameLogic);
  // }, [handleClickPlayerOne, handleClickPlayerTwo]);

  return (
    <div>
      {readyToGo ? <div className="GameScreen">
      {/* TOP LEFT CORNER - PLAYER ONE ATTACKS PLAYER TWO HERE*/}
      <div className="container">
        <div className="grid boardPlayerOne">
          {boardPlayerTwo.map((value, index) => {
            const playerTurn = playerOneTurn ? false : true;
            return (
              <button
                key={index}
                onClick={(event) => handleClick(event, index, "playerOne")}
                value={boardPlayerTwo[index]}
                disabled={playerTurn}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* TOP RIGHT CORNER - PLAYER TWO ATTACKS PLAYER ONE HERE*/}
        <div className="grid boardPlayerTwo">
          {boardPlayerOne.map((value, index) => {
            const playerTurn = playerOneTurn ? true : false;
            return (
              <button
                key={index}
                onClick={(event) => handleClick(event, index, "playerTwo")}
                value={boardPlayerOne[index]}
                disabled={playerTurn}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container">
        {/* BOTTOM LEFT CORNER - PLAYER ONE TRACKS THEIR STATUS HERE*/}
        <div className="grid mirrorPlayerOne">
          {boardPlayerOne.map((value, index) => {
            const cellValue = value === 0 ? null : value;
            return (
              <button key={index} value={boardPlayerOne[index]}>
                {cellValue}
              </button>
            );
          })}
        </div>

        {/* BOTTOM RIGHT CORNER - PLAYER TWO TRACKS THEIR STATUS */}
        <div className="grid mirrorPlayerTwo">
          {boardPlayerTwo.map((value, index) => {
            const cellValue = value === 0 ? null : value;
            return (
              <button key={index} value={boardPlayerTwo[index]}>
                {cellValue}
              </button>
            );
          })}
        </div>
      </div>
    </div> 
    : <h1>not ready.</h1> }
    </div>
    
  );
}

export default GameBoard;
