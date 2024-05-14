import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuItem from "../utils/MenuItem.tsx";

interface HelpPageProps {
  stateSetter: (state: string) => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ stateSetter }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [showGithubLink, setShowGithubLink] = useState(false);
  const [firstComplete, setFirstComplete] = useState(false);

  const text: string = "Interact with the terminal to read my resume. I hope you enjoy it.";
  const text2: string = "If you would like to have a similar website, you can get it from my Github. don't forget to give it a star.";
  const typingSpeed: number = 30;
  const sectionDelay: number = 300;

  const helpPageContent = {
    default: {
      transition: { duration: 0.1 }
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      stateSetter('HomePage');
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);


  const typeText = (text:string, setter: React.Dispatch<React.SetStateAction<string>>, callback: () => void) => {
    let index = 0;
    const length = text.length;
    const intervalId = setInterval(() => {
      setter(text.slice(0, index + 1));
      index++;
      if (index === length) {
        clearInterval(intervalId);
        setTimeout(callback, sectionDelay);
      }
    }, typingSpeed);
    return intervalId;
  }

  useEffect(() => {
    // type first text
    const intervalId = typeText(text, setDisplayedText, () => setFirstComplete(true))
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // type second text
    if (!firstComplete) return;
    const intervalId = typeText(text2, setDisplayedText2, () => setShowGithubLink(true))
    return () => clearInterval(intervalId);
  }, [firstComplete]);

  return (
    <motion.div
      variants={ helpPageContent }
      animate={ "default" }
      className="h-full flex flex-col gap-[34px] justify-center items-center select-none text-glow transition ease-in w-full">

      <div className="mx-[16px] items-center transition ease-in w-fit min-w-[300px] max-w-[500px] text-xl">
        { displayedText }<br /><br />
        { displayedText2 }
        <a className={ "transition ease-in text-white " + (showGithubLink ? 'opacity-100' : 'opacity-0') }
           target="_blank" href="https://github.com/MeysamRT76/resume">GitHub</a>
      </div>

      <MenuItem text="Back"
                isSelected={ true }
                onHover={ () => null }
                arrowLeft={ true }
                onClick={ () => stateSetter('HomePage') } />

    </motion.div>
  )
}

export default HelpPage
