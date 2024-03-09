import React, {useEffect, useRef} from "react";
import {motion} from "framer-motion";

interface TerminalProps {
  state: string,
  stateSetter: (state: string) => void,
  dragRef: React.RefObject<HTMLDivElement>
}

const Terminal: React.FC<TerminalProps> = ({ state, stateSetter, dragRef }) => {
  const textRef: React.RefObject<HTMLInputElement> = useRef(null);
  const terminalContent = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    }
  };

  useEffect(() => {
    setTimeout(()  => {
      textRef.current?.focus();
    }, 100)
  }, [state]);


  return (
    <motion.div
      className="rounded-[8px] w-[500px] sm:w-[600px] lg:w-[700px] lg:h-[500px] mx-[16px] bg-black/100 h-[400px] flex flex-col overflow-hidden border-[0.1px] border-[#dadada] border-opacity-40"
      variants={terminalContent}
      dragConstraints={dragRef}
      drag
      onClick={() => textRef.current?.focus()}
    >
      <motion.div className="bg-[#dadada] h-[28px] w-full flex justify-center items-center relative">
        <span className="text-black text-sm !drop-shadow-none">meysam-rajaei -zsh - 79x34</span>
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
      <div className="h-full px-[4px] py-[2px] text-sm">
        Last login: Thu Mar 7 23:37:14 | -help for commands lists
        <div className="w-full h-fit flex gap-[8px]">
              <span className="w-fit whitespace-nowrap">
                meysam-rajaei@MacBook ~ $
              </span>
          <input ref={state === "Terminal" ? textRef : null} maxLength={20} type="text"
                 className="bg-transparent focus:ring-0 focus:outline-none w-full" />
        </div>
      </div>
    </motion.div>
  )
}

export default Terminal
