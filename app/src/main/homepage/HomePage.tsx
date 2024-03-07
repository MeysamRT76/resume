import {useEffect, useRef, useState} from "react";

export default function HomePage() {
  const [selected, setSelected] = useState(1)
  const tickSound = useRef(new Audio("/src/assets/sounds/s1.wav")).current;
  const denySound = useRef(new Audio("/src/assets/sounds/denied.mp3")).current;
  const menuCount = 3;
  const handleHover = (index: number) => {
    if (selected === index) return;
    setSelected(index);
    tickSound.play().then();
  }

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === "ArrowUp") {
      setSelected(selected => {
        if (selected > 1) {
          tickSound.play().then()
          return selected - 1
        } else {
          denySound.play().then()
          return 1
        }
      });
    } else if (event.key === "ArrowDown") {
      setSelected(selected => {
        if (selected < menuCount) {
          tickSound.play().then()
          return selected + 1
        } else {
          denySound.play().then()
          return menuCount
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[32px] select-none fall">
      <span className="text-4xl animate-pulse cursor-not-allowed">
        Hello <span className="text-white">World!</span>
      </span>
      <div className="flex flex-col gap-[8px] items-center transition ease-in w-[130px]">
        <div className="flex justify-center items-center gap-[8px] animate-pulse cursor-pointer">
          <span
            className={"text-lg transition ease-in " + (selected === 1 ? "opacity-100" : "!opacity-0")}>{"> "}</span>
          <span onMouseEnter={() => handleHover(1)}>Terminal</span>
        </div>
        <div className="flex justify-center items-center gap-[8px] animate-pulse cursor-pointer">
          <span
            className={"text-lg transition ease-in " + (selected === 2 ? "opacity-100" : "!opacity-0")}>{"> "}</span>
          <span onMouseEnter={() => handleHover(2)}>Radar</span>
        </div>
        <div className="flex justify-center items-center gap-[8px] animate-pulse cursor-pointer">
          <span
            className={"text-lg transition ease-in " + (selected === 3 ? "opacity-100" : "!opacity-0")}>{"> "}</span>
          <span onMouseEnter={() => handleHover(3)}>Exit</span>
        </div>
      </div>
    </div>
  )
}
