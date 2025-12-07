import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeEggPop.scss";

import eggDefault from "../../assets/egg-welcome.png";
import egg1 from "../../assets/egg/egg_1.png";
import egg2 from "../../assets/egg/egg_2.png";

function WelcomeEggPop() {
  const [eggSprite, setEggSprite] = useState(eggDefault);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const animationRef = useRef();

  // 🌟 ANIMATIE SMOOTH CU TRANSITIONS CSS
  const runEggAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Reset la default cu fade-in smooth
    setEggSprite(eggDefault);
    
    animationRef.current = setTimeout(() => {
      // Frame 1: Crack cu scale + shake
      setEggSprite(egg1);
      
      animationRef.current = setTimeout(() => {
        // Frame 2: Hatch complet cu bounce
        setEggSprite(egg2);
        
        animationRef.current = setTimeout(() => {
          setIsAnimating(false);
          navigate("/home")
        }, 800); // hold final frame mai mult
      }, 500);
    }, 400);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      runEggAnimation();
    }, 300);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="game-title">POCKET FRIEND</h1>

        {/* OU ANIMAT CU CSS TRANSITIONS */}
        <div className="egg-display">
          <img 
            src={eggSprite} 
            alt="Mystery Egg" 
            className={`floating-egg ${isAnimating ? 'animating' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}

export default WelcomeEggPop;
