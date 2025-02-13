import React, { useState, useEffect } from "react";
import PencilIcon from "../assets/PencilIcon";
import RenameModal from "./RenameModal";

const SubHeader = ({ tabs, setTabs, onTabClick }) => {
  const [selectedTab, setSelectedTab] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  // Sync selectedTab with tabs when they update
  useEffect(() => {
    if (tabs.length > 0 && !selectedTab) {
      setSelectedTab(tabs[0]);
      onTabClick(tabs[0]); // Ensure first tab triggers onTabClick
    }
  }, [tabs]);

  const openRenameModal = (tab) => {
    setRenameValue(tab);
    setIsModalOpen(true);
  };

  const handleRename = () => {
    setTabs(tabs.map((tab) => (tab === selectedTab ? renameValue : tab)));
    setSelectedTab(renameValue);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border-b border-b-[#EFEFEF] h-[72px] flex items-center px-4 pl-8 bg-[#FFFFFF]">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab);
                onTabClick(tab);
              }}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedTab === tab
                  ? "bg-[#F2F7F2] text-[#189D3B] border border-[#189D3B]"
                  : "bg-[#F7F7F7] text-[#777777]"
              }`}
            >
              <div className="pr-1">{tab}</div>
              {selectedTab === tab && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    openRenameModal(tab);
                  }}
                >
                  <PencilIcon />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rename Modal */}
      <RenameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        renameValue={renameValue}
        setRenameValue={setRenameValue}
        onRename={handleRename}
      />
    </>
  );
};

export default SubHeader;
