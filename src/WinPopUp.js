import firebase from "./firebase";
import { useHistory } from "react-router-dom";

function WinPopUp({ data }) {

  // this function is attached to a button that clears all results from the database.
  const history = useHistory();
  const removeEverything = () => {
    firebase.database().ref("playerOne").set(false);
    firebase.database().ref("playerTwo").set(false);
    firebase.database().ref("isGameOver").set(false);
    firebase.database().ref("turn").set("playerOne");
    firebase.database().ref("status").set(null);
    firebase.database().ref("winner").set("");
  };
  return (
    //window pops up to announce winner and to redirect you to the starting home page
    <div className="winPop">
      {/* this displays the winner to both users. */}
      <h2 className="win">{data.winner} is the winner!</h2>
      <button
        className="winButt"
        onClick={() => {
          removeEverything();
          history.push("/");
          window.location.reload(false);
        }}
      >
        Play Again!
      </button>
    </div>
  );
}
export default WinPopUp;
