import { useState, useEffect } from "react";
import firebase from "./firebase";
import "./App.css";
import GameBoard from "./GameBoard";

const WaitingRoom = ({data, localToken}) => {
    console.log(data);
    console.log(localToken);
    console.log("test!")
const boards = {
    playerOne : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    playerTwo : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
  }

  // this function is used to randomly rotate rockets and place them randomly on the gameboard, and in the gameboard array.
  const placeRockets = (rocket, gameBoard, player) => {
    const gameLogic = {};
    if (player === "playerOne") {
      gameBoard = boards.playerOne;
      gameLogic.playerOneGrid = gameBoard;
    }
    if (player === "playerTwo") {
      gameBoard = boards.playerTwo;
      gameLogic.playerTwoGrid = gameBoard;
    }
    // getting random value from ship direction array to see if ship will be pointed horizontally or vertically, why showing how many jumps its position will take in the array. If it's horizontal, it will increment by one, and if vertical, it will increment by 7 (the width of the board).
    let direction;
    let randomDirection = Math.floor(Math.random() * rocket.directions.length);
    let currentDirection = rocket.directions[randomDirection];
    if (randomDirection === 0) {
      direction = 1;
    }
    if (randomDirection === 1) {
      direction = 7;
    }
    // find a random start point for each rocketship
    let randomStart = Math.abs(Math.floor(Math.random() * gameBoard.length - rocket.directions[0].length * direction));

    // make sure that squares we're placing rockets into aren't occupied
    const isTaken = currentDirection.some((index) => gameBoard[randomStart + index] !== 0);
    // if current rocket is at the 6th spot in the array row (the far right edge), it can still register, but if it's higher that that it can't be placed on the board
    const atRightEdge = currentDirection.some((index) => (randomStart + index) % 7 === 6);
    // if current rocket is at the 1st spot in the array row (row 0, the far left edge), it can still register, but if it's lower than that it can't be placed on the board
    const atLeftEdge = currentDirection.some((index) => (randomStart + index) % 7 === 0);
    // if the rocket position meets all these conditions by not being in a taken space, and not being over the left or right edge of the board, it can be placed on the board
    if (!isTaken && !atRightEdge && !atLeftEdge) {
      currentDirection.forEach((index) => {
        gameBoard[randomStart + index] = rocket.name;
      });
    // once the rocket has found its position, update the game board in firebase to enable two player play.
    const dbRef = firebase.database().ref();
    dbRef.update(gameLogic);

      // if none of the conditions above are met to properly place a rocket on the gameboard, the process is repeated until successful.
    } else {
      placeRockets(rocket, gameBoard);
    }
    
  };


  if (localToken) {
    const playerOne = data.playerOne.token === localToken;
    const playerTwo = data.playerTwo.token === localToken;

    if (playerOne) {
      placeRockets(data.playerOne.rocketSelected[0], boards, "playerOne");
      placeRockets(data.playerOne.rocketSelected[1], boards, "playerOne");
      placeRockets(data.playerOne.rocketSelected[2], boards, "playerOne");
    }
    if (playerTwo) {
      placeRockets(data.playerTwo.rocketSelected[0], boards, "playerTwo");
      placeRockets(data.playerTwo.rocketSelected[1], boards, "playerTwo");
      placeRockets(data.playerTwo.rocketSelected[2], boards, "playerTwo");
    }
  }







    return(
        <h1>return something</h1>
    )
}

export default WaitingRoom;