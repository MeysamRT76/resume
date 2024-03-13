import {commandsList} from "./Command.tsx";

const HelpCommand = () => {
  return (
    <pre>
      Commands list and description<br />
      {Object.entries(commandsList).map(([key, { name, description }]) => (
        <div key={key}>
          {name} - {description}<br />
        </div>
      ))}
    </pre>
  )
}

export default HelpCommand
