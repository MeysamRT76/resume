import React, {useCallback, useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Command, {commandsList} from "./commands/base/Command.tsx";

interface TerminalProps {
  state: string,
  stateSetter: (state: string) => void,
  dragRef: React.RefObject<HTMLDivElement>
}

const Terminal: React.FC<TerminalProps> = ({ state, stateSetter, dragRef }) => {
  const textRef: React.RefObject<HTMLInputElement> = useRef(null);
  const [commandsHistory, setCommandsHistory] = useState(['help'])
  const [commandText, setCommandText] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [fullScreenTerminal, setFullScreenTerminal] = useState<boolean>(false)
  const [commandIndex, setCommandIndex] = useState<number | undefined>(undefined)

  const commands = Object.keys(commandsList);

  const terminalContent = {
    fullScreen: {
      width: "100dvw",
      height: "100dvh",
      transition: { duration: 0.1 }
    },
    default: {
      width: "500px",
      height: "400px",
      transition: { duration: 0.1 }
    }
  };

  const handleArrowUpOrDown = useCallback((arrowUp: boolean) => {
    const len = commandsHistory.length
    if (arrowUp) {
      if (commandIndex === undefined) {
        setCommandIndex(len - 1)
      } else if (commandIndex > 0) {
        // @ts-ignore
        setCommandIndex(index => (index - 1))
      }
    } else {
     if (commandIndex !== undefined && commandIndex < len) {
        // @ts-ignore
       setCommandIndex(index => (index + 1))
      }
    }
  }, [commandsHistory, commandIndex])

  useEffect(() => {
    const command = commandIndex !== undefined ? commandsHistory[commandIndex] : '';
    setCommandText(command || '');
  }, [commandIndex]);

  useEffect(() => {
    setTimeout(() => {
      textRef.current?.focus();
      textRef.current?.scrollIntoView();
    }, 100)
  }, [state, commandsHistory, fullScreenTerminal]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
    } else if (event.key === "Enter") {
      textRef.current?.scrollIntoView();
      setSuggestions([])
      setCommandIndex(undefined)
      setCommandText(command => {
        const normalCommand = command.trim()
        if (normalCommand.length) {
          setCommandsHistory(currentHistory => [...currentHistory, normalCommand]);
        }
        return ''
      })
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault()
      handleArrowUpOrDown(event.key === "ArrowUp")
    }
  }, [commandsHistory, commandIndex]);

  const autocomplete = useCallback(() => {
    const filteredCommands = commands.filter((command) =>
      command.startsWith(commandText)
    )
    setSuggestions(filteredCommands);
    filteredCommands.length === 1 && setCommandText(filteredCommands[0])
  }, [commands, commandText])

  const handleKeyDownTerminal: React.KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    event.key === 'Tab' && autocomplete()
  }, [autocomplete]);

  const handleMinimizeBtn = useCallback(() => {
    stateSetter('HomePage')
  }, [])

  const handleExitBtn = useCallback(() => {
    setCommandsHistory(['help'])
    setCommandText('')
    setSuggestions([])
    setCommandIndex(undefined)
    setFullScreenTerminal(false)
    stateSetter('HomePage')
  }, [])

  const handleMaximizeBtn = useCallback(() => {
    setFullScreenTerminal((preValue) => (!preValue))
  }, [])

  useEffect(() => {
    const len = commandsHistory.length
    if (commandsHistory[len-1] === "exit") {
      handleExitBtn()
    } else if (commandsHistory[len-1] === "clear") {
      setCommandsHistory([])
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [commandsHistory, commandIndex]);

  return (
    <motion.div
      className={"rounded-[8px] bg-black/100 flex flex-col border-[0.1px] border-[#dadada] border-opacity-40 " +
        (fullScreenTerminal ? "w-full h-full" : "mx-[16px] w-[500px] sm:w-[600px] lg:w-[700px] h-[400px] lg:h-[500px]")}
      variants={terminalContent}
      animate={fullScreenTerminal ? "fullScreen" : "default"}
      dragConstraints={dragRef}
      drag={!fullScreenTerminal}
      onClick={() => textRef.current?.focus()}
    >
      <motion.div className="bg-[#dadada] rounded-t-[8px] h-[28px] w-full flex justify-center items-center relative">
        <span className="text-black text-sm !drop-shadow-none">meysam-rajaei -zsh</span>
        <div className="flex gap-[8px] absolute left-[7px] group text-black text-[12px]">
          <div className="flex justify-center items-center rounded-full w-[13px] h-[13px] bg-red-600"
               onClick={() => handleExitBtn()}>
            <span className="hidden group-hover:block">x</span>
          </div>
          <div className="flex justify-center items-center rounded-full w-[13px] h-[13px] bg-yellow-500"
               onClick={() => handleMinimizeBtn()}>
            <span className="hidden group-hover:block">-</span>
          </div>
          <div className="flex justify-center items-center rounded-full w-[13px] h-[13px] bg-green-600"
               onClick={() => handleMaximizeBtn()}>
            <span className="hidden group-hover:block">x</span>
          </div>
        </div>
      </motion.div>
      <div className="h-full w-full flex flex-col px-[4px] py-[2px] text-sm gap-[8px] overflow-y-auto">
        {commandsHistory.map((item: string, index: number) => (
          <Command command={item} key={index} />
        ))}

        <div className="w-full h-fit flex gap-[8px]">
          <span className="w-fit whitespace-nowrap text-white">
            $
          </span>
          <input ref={state === "Terminal" ? textRef : null} maxLength={20} type="text" value={commandText}
                 onChange={(e) => setCommandText(e.target.value)} onKeyDown={handleKeyDownTerminal}
                 className="bg-transparent focus:ring-0 focus:outline-none w-full font-bold" />
        </div>
        {suggestions.length > 1 && (
          <div className="flex gap-[30px]">
            {suggestions.map(item => (
              <span>{item}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Terminal
