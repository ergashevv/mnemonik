import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useFlashCardsContext } from "../../../context/FlashCardsContext";
import "./Start.css";

const Start = () => {
  const { setCountDown } = useFlashCardsContext();

  const handleCountDown = (e: ChangeEvent<HTMLInputElement>) => {
    setCountDown(+e.target.value);
  };

  return (
    <div className="settings">
      <div className="container">
        <form className="time-settings">
          <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
          <input
            type="number"
            onChange={handleCountDown}
            placeholder="Standart vaqt 5 soniya"
          />
        </form>
        <div className="start-button">
          <Link to="/flash-cards/recall">
            <button>Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
