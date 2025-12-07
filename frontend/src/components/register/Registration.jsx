import { useState } from "react";
import AccountInfo from "./AccountInfo";
import Personalities from "./Personalities";

function Registration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    name: "",
    email: "",
    password: "",
    personality: ""
  });

  const handleOnComplete = () => {
    // TO DO: make an API call and create a new account with the data
  }

  const handleAccountInfoNext = (accountData) => {
    setFormData(prev => ({
      ...prev,
      ...accountData
    }));
    setStep(2);
  };

  const handlePersonalityNext = (personality) => {
    const completeData = {
      ...formData,
      personality: personality
    };
    setFormData(completeData);
    handleOnComplete();
  };

  return (
    <>
      {step === 1 && <AccountInfo onNext={handleAccountInfoNext} />}
      {step === 2 && <Personalities onNext={handlePersonalityNext} />}
    </>
  );
}

export default Registration;