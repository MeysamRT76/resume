import "./styles/main.scss";
import HomePage from "./homePage/HomePage.tsx";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion"
import Terminal from "./terminal/Terminal.tsx";
import HelpPage from "./helpPage/HelpPage.tsx";

export default function MainLayout() {
  const [state, setState] = useState('HomePage')

  const terminalContainer = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "flex",
      transition: {
        delayChildren: 0.1,
      }
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setState('HomePage')
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="container-noise">

      <div className="noise" />
      <div className="overlay" />

      <motion.div
        className="w-full h-full"
        variants={ terminalContainer }
        initial="visible"
        animate={ state === "HomePage" ? "visible" : "hidden" }>
        { state === "HomePage" && <HomePage stateSetter={ setState } /> }
      </motion.div>

      <motion.div
        className="w-full h-full"
        variants={ terminalContainer }
        initial="hidden"
        animate={ state === "Help" ? "visible" : "hidden" }>
        { state === "Help" && <HelpPage stateSetter={ setState } /> }
      </motion.div>

      <motion.div
        className="absolute top-0 w-full h-full justify-center items-center select-none bg-transparent z-10 overflow-hidden"
        variants={ terminalContainer }
        initial="hidden"
        animate={ state === "Terminal" ? "visible" : "hidden" }>
        <Terminal state={ state } stateSetter={ setState } />
      </motion.div>

    </div>
  )
}
