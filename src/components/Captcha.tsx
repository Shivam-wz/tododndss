import React, { useState, useEffect } from "react";

const Captcha: React.FC<{ onCaptchaChange: (value: string) => void, onCaptchaGenerated: (value: number) => void }> = ({ onCaptchaChange, onCaptchaGenerated }) => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    onCaptchaGenerated(n1 + n2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCaptchaChange(e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        Solve: {num1} + {num2} = ?
      </div>
      <input
        type="text"
        placeholder="Enter answer"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Captcha;
