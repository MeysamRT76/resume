import { commandsList } from "./base/Command.tsx";

const Help = () => {
  return (
    <pre>
      Commands list and description:<br /><br />
      { Object.entries(commandsList).map(([key, { name, description }]) => (
        <div key={ key }>
          { name } - { description }<br />
        </div>
      )) }
    </pre>
  )
}

export default Help
