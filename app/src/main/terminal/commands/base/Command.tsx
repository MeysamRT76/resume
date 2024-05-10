import React from "react";
import Help from "../Help";
import Error from "../Error";
import Ls from "../Ls";
import Whoami from "../Whoami";
import History from "../History";

interface CommandProps {
  command: string,
}

interface commandType {
  key: number;
  name: string;
  description: string;
  result: React.ComponentType | null;
}

export const commandsList: Record<string, commandType> = {
  whoami: {
    key: 1,
    name: "whoami",
    description: "Description about me.",
    result: Whoami,
  },
  ls: {
    key: 2,
    name: "ls",
    description: "List of my skills.",
    result: Ls,
  },
  history: {
    key: 2,
    name: "history",
    description: "My History",
    result: History,
  },
  help: {
    key: 3,
    name: "help",
    description: "Commands list and description.",
    result: Help,
  },
  clear: {
    key: 4,
    name: "clear",
    description: "Clear terminal.",
    result: null,
  },
  exit: {
    key: 5,
    name: "exit",
    description: "Exit terminal.",
    result: null,
  }
}

const Command: React.FC<CommandProps> = ({ command }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="w-full h-fit flex gap-[8px] font-bold">
            <span className="w-fit whitespace-nowrap text-white">
              $
            </span>
        <span>{ command }</span>
      </div>
      <div className="w-full text-[12px]">
        { (command in commandsList) ? (
          <React.Fragment>
            {
              commandsList[command].result !== null
                ? React.createElement(commandsList[command].result as React.ComponentType, {})
                : null
            }
          </React.Fragment>
        ) : (
          <Error />
        )}
      </div>
    </div>
  )
}

export default Command
