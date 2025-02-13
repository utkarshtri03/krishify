import React from "react";
import CrossIcon from "../assets/CrossIcon";

const MoveModal = ({ isOpen, onClose, renameValue, setRenameValue, onRename }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white shadow-lg rounded-lg  w-[500px]">
        <div className="border-b border-b-[#EFEFEF] p-6 flex justify-between">
        <h2 className="text-lg font-semibold">Move {renameValue || 'Territory'}</h2>
        <button onClick={onClose}>
        <CrossIcon/>
        </button>
        </div>
       

        <div className="mt-4 px-6">
          <label className="text-sm font-medium">
            {renameValue || 'Territory'} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            className="w-full border border-[#CCCCCC] rounded-lg p-2 mt-1"
          />
        </div>

        <div className="flex justify-end mt-6 space-x-4 p-4 border-t border-t-[#EEEEEE]">
          <button onClick={onClose} className="text-red-500 font-medium">
            Cancel
          </button>
          <button onClick={onRename} className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveModal;
