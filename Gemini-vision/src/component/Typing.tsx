import { TypeAnimation } from "react-type-animation";

const Typing = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with your OWN AI",
        1000,
        "Built with Gemini AI",
        2000,
        "Your own conversational AI chatbot 🤖",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #51538f",
      }}
      repeat={Infinity}
    ></TypeAnimation>
  );
};

export default Typing;
