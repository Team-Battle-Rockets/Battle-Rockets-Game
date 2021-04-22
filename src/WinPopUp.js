import firebase from "./firebase";
import { useHistory } from "react-router-dom";
function WinPopUp({ data }) {
  const history = useHistory();
  const removeEverything = () => {
    firebase.database().ref("playerOne").set(false);
    firebase.database().ref("playerTwo").set(false);
    firebase.database().ref("isGameOver").set(false);
    firebase.database().ref("turn").set("playerOne");
    firebase.database().ref("status").set("");
    firebase.database().ref("winner").set("");
  };
  return (
    <div className="winPop">
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
