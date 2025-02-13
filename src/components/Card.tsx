import React, { useState, useRef } from "react";
import MoreOptions from "../assets/MoreOption";
import useClickOutside from "./useClickOutside";
import FolderIcon from "../assets/Folder";
import SettingIcon from "../assets/Setting";
import RegionIcon from "../assets/RegionIcon";
import Groups from "../assets/Groups";
import GroupRedIcon from "../assets/GroupRedIcon";

const hierarchyIcons = {
    "Community ": "/BlueArrow.png",
    "Market": "/YellowArrow.png",
    "teritory": "/YellowArrow.png",
    "Area": "/RedArrow.png",
  };

  const Card = ({ id, title, location, hierarchy = [], img, onRename, onMove, onClick , level}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    console.log(level, "level")

    const imageToShow = level === 3 ? <RegionIcon/> : level === 2 ? <GroupRedIcon/> : <FolderIcon/>
  
    useClickOutside(menuRef, () => setIsMenuOpen(false)); // Close menu on outside click
  
    return (
        <div
        className={`bg-white border border-gray-300 max-h-[179px] rounded-xl shadow-md p-4 flex items-center space-x-4 w-[368px]  transition-all duration-300 relative cursor-pointer 
          ${onClick ? "hover:bg-[#F2F7F2] hover:border-[#189D3B]" : ""}`}
        onClick={onClick ? onClick : undefined} 
      >
        { img ? <img src={img} className="w-12 h-12 mr-4" /> :  imageToShow}
        
        <div className="flex-1">
        {id &&  <p className="text-[#1C73E8] text-[12px] font-normal font-roboto">ID: {id}</p>}
          <h2 className="text-[18px] font-medium font-roboto">{title}</h2>
          {location && <p className="text-[14px] text-[#444444] font-roboto font-normal">{location}</p>}
          {hierarchy.length > 0 && (
            <div className="mt-2 space-y-1 text-[14px] text-[#444444]  font-roboto font-normal">
              {hierarchy.map((item, index) => {
                const levelName = item.split(" ")[0]; 
                const icon = hierarchyIcons[levelName] || "/RedArrow.png";
                if(!item) return null;
    return (
                  <p key={index} className="flex items-center">
                    <img src={icon} alt={levelName} className="w-3 h-3 mr-2" />
                    {item}
                  </p>
                );
              })}
            </div>
          )}
        </div>
  
        {/* More Options Button */}
        <div className="relative" onClick={(e) => e.stopPropagation()}> 
         <div className="flex flex-col space-y-1">
            {img &&
                 <button
                 className="text-gray-400 hover:text-gray-600"
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                 <SettingIcon/>
               </button>
            }
         <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MoreOptions />
          </button>
         </div>
  
          {/* Dropdown Menu */}
          {isMenuOpen && (
  <div
    ref={menuRef}
    className="absolute right-0 top-10 bg-white shadow-lg rounded-md w-32 z-[100] border border-gray-200"
  >
    <button
      className="w-full text-left text-[14px] font-normal font-roboto px-4 py-2 hover:bg-gray-100 "
      onClick={(e) => { e.stopPropagation(); onRename(); setIsMenuOpen(false); }}
    >
      Rename
    </button>
    <button
      className="w-full text-left text-[14px] font-normal font-roboto px-4 py-2 hover:bg-gray-100"
      onClick={(e) => { e.stopPropagation(); onMove(); setIsMenuOpen(false); }}
    >
      Move
    </button>
  </div>
)}

        </div>
      </div>
    );
  };
  

export default Card;
