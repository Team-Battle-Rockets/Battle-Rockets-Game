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
    <div className="winPop">
      {/* this displays the winner to both users. */}
      <h2 className="win">{data.winner} is the winner!</h2>
      <form>
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
      </form>
    </div>
  );
}
export default WinPopUp;
