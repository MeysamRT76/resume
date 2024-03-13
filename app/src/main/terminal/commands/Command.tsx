import React from "react";
import HelpCommand from "./HelpCommand.tsx";
import UnsupportedCommand from "./UnsupportedCommand.tsx";

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
    result: HelpCommand,
  },
  ls: {
    key: 2,
    name: "ls",
    description: "List of my skills.",
    result: HelpCommand,
  },
  where: {
    key: 2,
    name: "where",
    description: "Where was I working before?",
    result: HelpCommand,
  },
  jobs: {
    key: 2,
    name: "jobs",
    description: "What am I working on?",
    result: HelpCommand,
  },
  contact: {
    key: 2,
    name: "contact",
    description: "How to contact me.",
    result: HelpCommand,
  },
  help: {
    key: 3,
    name: "help",
    description: "Commands list and description.",
    result: HelpCommand,
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
          <UnsupportedCommand />
        )}
      </div>
    </div>
  )
}

export default Command
