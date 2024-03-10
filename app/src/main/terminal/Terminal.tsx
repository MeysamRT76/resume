import React, {useCallback, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import HelpCommand from "./commands/HelpCommand.tsx";
import Command from "./commands/Command.tsx";

interface TerminalProps {
  state: string,
  stateSetter: (state: string) => void,
  dragRef: React.RefObject<HTMLDivElement>
}

const Terminal: React.FC<TerminalProps> = ({ state, stateSetter, dragRef }) => {
  const textRef: React.RefObject<HTMLInputElement> = useRef(null);
  const [commandsHistory, setCommandsHistory] = useState(['help'])
  const [commandText, setCommandText] = useState('')

  const terminalContent = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    }
  };

  useEffect(() => {
    setTimeout(() => {
      textRef.current?.focus();
    }, 100)
  }, [state]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setCommandText(command => {
        const normalCommand = command.trim()
        console.log(normalCommand)
        if (normalCommand.length) {
          setCommandsHistory(currentHistory => [...currentHistory, normalCommand]);
        }
        return ''
      })
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <motion.div
      className="rounded-[8px] w-[500px] sm:w-[600px] lg:w-[700px] lg:h-[500px] mx-[16px] bg-black/100 h-[400px] flex flex-col overflow-hidden border-[0.1px] border-[#dadada] border-opacity-40"
      variants={terminalContent}
      dragConstraints={dragRef}
      drag
      onClick={() => textRef.current?.focus()}
    >
      <motion.div className="bg-[#dadada] h-[28px] w-full flex justify-center items-center relative">
        <span className="text-black text-sm !drop-shadow-none">meysam-rajaei -zsh</span>
        <div className="flex gap-[8px] absolute left-[7px] group text-black text-[12px]">
          <div className="flex justify-center items-center rounded-full w-[13px] h-[13px] bg-red-600"
               onClick={() => stateSetter('HomePage')}>
            <span className="hidden group-hover:block">x</span>
          </div>
          <div className="flex justify-center items-center rounded-full w-[13px] h-[13px] bg-yellow-500">
            <span className="hidden group-hover:block">-</span>
          </div>
          <div className="flex justify-center items-center rounded-full w-[13px] h-[13px] bg-green-600">
            <span className="hidden group-hover:block">x</span>
          </div>
        </div>
      </motion.div>
      <div className="h-full w-full overlay-x-scroll flex flex-col px-[4px] py-[2px] text-sm gap-[8px]">
        {commandsHistory.map((item: string, index: number) => (
          <Command command={item} key={index} />
        ))}


        <div className="w-full h-fit flex gap-[8px]">
          <span className="w-fit whitespace-nowrap text-white">
            $
          </span>
          <input ref={state === "Terminal" ? textRef : null} maxLength={20} type="text" value={commandText}
                 onChange={(e) => setCommandText(e.target.value)}
                 className="bg-transparent focus:ring-0 focus:outline-none w-full font-bold" />
        </div>
      </div>
    </motion.div>
  )
}

export default Terminal
