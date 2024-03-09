import React from "react";

interface MenuItemProps {
  key: number;
  text: string;
  isSelected: boolean;
  onHover: () => void;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, isSelected, onHover, onClick }) => {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onClick}
      className="flex justify-center items-center gap-[8px] animate-pulse cursor-pointer">
      <span className={`text-lg transition ease-in ${isSelected ? 'opacity-100' : '!opacity-0'}`}>{"> "}</span>
      <span>{text}</span>
    </div>
  )
}

export default MenuItem
