import React from "react";
import BackBlueIcon from "../assets/BackBlueIcon";

const Breadcrumb = ({ items = [], onClick, onBack }) => {

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-600  h-[72px] border-b border-b-[#DDDDDD] pr-4 pl-8 bg-[#FFFFFF]">
      {/* "← Groups" as a clickable link */}
      <span className="text-[#1C73E8] text-[14px] font-normal cursor-pointer hover:underline flex flex-row items-center" onClick={onBack} >
        <BackBlueIcon/>
        <span className="text-[#1C73E8] text-[14px] font-normal cursor-pointer hover:underline ml-[5px]">Groups</span> 
      </span>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.id}>
            <span className="mx-1 text-gray-400">{">"}</span>
            <span
              className={isLast ? "font-medium text-[14px] text-[#444444]" : "font-medium text-[14px] text-[#1C73E8] cursor-pointer hover:underline"}
              onClick={() => !isLast && onClick(item)}
            >
              {item.name}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
