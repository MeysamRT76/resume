import React, { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from '../utils/MenuItem.tsx';

interface HomePageProps {
  stateSetter: (state: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ stateSetter }) => {
  const [selected, setSelected] = useState(1);
  const tickSound = useRef(new Audio("/src/assets/sounds/s1.wav")).current;
  const denySound = useRef(new Audio("/src/assets/sounds/denied.mp3")).current;

  interface MenuItem {
    key: number;
    name: string;
    text: string;
    action: () => void;
  }

  const menuItems: Record<number, MenuItem> = {
    1: {
      key: 1,
      name: "terminal",
      text: "Terminal",
      action: () => {
        stateSetter('Terminal')
      }
    },
    2: {
      key: 2,
      name: "help",
      text: "Help",
      action: () => {
        stateSetter('Help')
      }
    },
    3: {
      key: 3,
      name: "exit",
      text: "Exit",
      action: () => {
        window.location.href = 'http://localhost';
      }
    }
  }

  const handleHover = useCallback((index: number) => {
    if (selected !== index) {
      setSelected(index);
      tickSound.play().then();
    }
  }, [selected, tickSound]);

  const handleClick = useCallback((index: number) => {
    setSelected(index);
    tickSound.play().then();
    menuItems[index].action();
  }, [tickSound]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      setSelected((prevSelected) => {
        const menuItemCount = Object.keys(menuItems).length;
        let newSelected = prevSelected;

        if (event.key === "ArrowUp") {
          newSelected = prevSelected > 1 ? prevSelected - 1 : 1;
        } else if (event.key === "ArrowDown") {
          newSelected = prevSelected < menuItemCount ? prevSelected + 1 : menuItemCount;
        }

        (newSelected !== prevSelected ? tickSound : denySound).play().then();

        return newSelected;
      });
    } else if (event.key === "Enter") {
      setSelected((prevSelected) => {
        tickSound.play().then();
        menuItems[prevSelected]?.action();
        return prevSelected;
      })
    }
  }, [selected, menuItems]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[32px] select-none text-glow">
      <span className="text-4xl animate-pulse cursor-not-allowed">
        Hello <span className="text-white">World!</span>
      </span>
      <div className="flex flex-col gap-[8px] items-center transition ease-in w-[130px]">
        { Object.values(menuItems).map((item) => (
          <MenuItem key={ item.key } text={ item.text } isSelected={ selected === item.key } arrowLeft={ false }
                    onHover={ () => handleHover(item.key) } onClick={ () => handleClick(item.key) } />
        )) }
      </div>
    </div>
  )
}

export default HomePage
