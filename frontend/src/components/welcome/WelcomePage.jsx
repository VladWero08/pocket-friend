import { Link } from "react-router-dom";
import "./WelcomePage.scss";

import eggImage from "../../assets/egg-welcome.png"; 

function WelcomePage({ onStart, onLogin }) {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="game-title">GAME NAME</h1>
        <p className="game-subtitle">Body text here</p>

        <div className="egg-display">
          <img src={eggImage} alt="Mystery Egg" className="floating-egg" />
        </div>

        <div className="button-group">
          <Link to="/register">
            <button className="btn-primary" onClick={onStart}>
              START
            </button>
          </Link>
          
          <Link to="/log-in">
            <button className="btn-secondary" onClick={onLogin}>
              LOG IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;