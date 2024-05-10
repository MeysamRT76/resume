import { Fragment } from "react";

const History = () => {
  const histories: string[] = JSON.parse(import.meta.env.VITE_HISTORY || []);

  return (
    <div className="text-justify text-[14px]">
      { histories.map((history: string, index: number) => (
        <Fragment key={ index }>
          <p>{ history }</p><br />
        </Fragment>
      )) }
    </div>
  )
}

export default History

