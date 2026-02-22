import React from 'react';

const DesktopIcon = ({ id, label, icon, onDoubleClick, isSelected, onClick }) => {
    return (
        <div
            className={`desktop-icon ${isSelected ? 'selected' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                onClick(id);
            }}
            onDoubleClick={() => onDoubleClick(id)}
        >
            <div className="desktop-icon-img">
                {icon}
            </div>
            <div className="desktop-icon-label">
                {label}
            </div>
        </div>
    );
};

export default DesktopIcon;
