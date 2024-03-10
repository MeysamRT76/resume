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
  result: React.ComponentType;
}

export const commandsList: Record<string, commandType> = {
  whoami: {
    key: 1,
    name: "whoami",
    description: "ddd",
    result: HelpCommand,
  },
  ls: {
    key: 2,
    name: "ls",
    description: "ls",
    result: HelpCommand,
  },
  help: {
    key: 1,
    name: "help",
    description: "ddd",
    result: HelpCommand,
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
        { command in commandsList ? (
          <React.Fragment>
            {React.createElement(commandsList[command].result, {})}
          </React.Fragment>
        ) : (
          <UnsupportedCommand />
        )}
      </div>
    </div>
  )
}

export default Command
