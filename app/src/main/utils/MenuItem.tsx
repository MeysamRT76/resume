import React from "react";

interface MenuItemProps {
  text: string;
  isSelected: boolean;
  onHover: () => void;
  onClick: () => void;
  arrowLeft: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ text, isSelected, onHover, onClick, arrowLeft=false }) => {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onClick}
      className="flex justify-center items-center gap-[8px] animate-pulse cursor-pointer">
      <span className={`text-lg transition ease-in -mt-[2px] ${isSelected ? 'opacity-100' : '!opacity-0'}`}>{ arrowLeft ? "< ": "> "}</span>
      <span>{text}</span>
    </div>
  )
}

export default MenuItem
