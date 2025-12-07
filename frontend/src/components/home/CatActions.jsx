// components/CatActions.jsx
import { useState } from "react";

// ICON-URI
import feedIcon from "../../assets/ramen.svg";
import drinkIcon from "../../assets/sparkling-drink.svg";
import sleepIcon from "../../assets/bed.svg";
import playIcon from "../../assets/play.svg";
import washIcon from "../../assets/cold-water.svg";

// SPRITE-URI pentru animații
import catDefault from "../../assets/cat.png";
import eat1 from "../../assets/eat/eat_1.png";
import eat2 from "../../assets/eat/eat_2.png";
import drinkSprite from "../../assets/drink/drink.png";
import catSleep from "../../assets/sleep/sleep.png";

const CatActions = ({ onAction }) => {
  const [catSprite, setCatSprite] = useState(catDefault);
  const [isBusy, setIsBusy] = useState(false);

  const actions = [
    { id: "feed", icon: feedIcon, label: "FEED" },
    { id: "drink", icon: drinkIcon, label: "DRINK" },
    { id: "sleep", icon: sleepIcon, label: "SLEEP" },
    { id: "play", icon: playIcon, label: "PLAY" },
    { id: "wash", icon: washIcon, label: "WASH" },
  ];

  const handleAction = (actionId) => {
    if (isBusy) return;

    setIsBusy(true);
    console.log(`🐱 Cat Action: ${actionId}`);

    // FEED
    if (actionId === "feed") {
      setCatSprite(eat1);
      setTimeout(() => {
        setCatSprite(eat2);
        setTimeout(() => {
          setCatSprite(catDefault);
          setIsBusy(false);
          onAction?.("feed");
        }, 700);
      }, 700);
    }

    // DRINK
    if (actionId === "drink") {
      setCatSprite(drinkSprite);
      setTimeout(() => {
        setCatSprite(catDefault);
        setIsBusy(false);
        onAction?.("drink");
      }, 700);
    }

    // SLEEP
    if (actionId === "sleep") {
      setCatSprite(catSleep);
      setTimeout(() => {
        setCatSprite(catDefault);
        setIsBusy(false);
        onAction?.("sleep");
      }, 1200);
    }
  };

  return (
    <div className="cat-display">
      <div className="cat-sprite">
        <img src={catSprite} alt="cat" />
      </div>

      <div className="action-buttons">
        {actions.map((action) => (
          <button
            key={action.id}
            className={`action-btn ${isBusy ? "disabled" : ""}`}
            onClick={() => handleAction(action.id)}
            disabled={isBusy}
          >
            <img className="action-icon" src={action.icon} alt={action.label} />
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CatActions;
