import React from 'react';
import { Settings, Power, HelpCircle, Folder, User, FileText, Gamepad2 } from 'lucide-react';

const StartMenu = ({ isOpen, onClose, onProgramClick, onShutDown }) => {
    if (!isOpen) return null;

    const menuItems = [
        { id: 'showcase', label: 'Projects', icon: <Folder size={20} color="#ffd700" /> },
        { id: 'about', label: 'About Me', icon: <User size={20} color="#0000ff" /> },
        { id: 'creditscore', label: 'Credit Score', icon: <FileText size={20} color="#00ff00" /> },
        { id: 'doom', label: 'Doom', icon: <Gamepad2 size={20} color="#ff0000" /> },
        { id: 'credits', label: 'Credits', icon: <FileText size={20} color="#ffffff" /> },
        { divider: true },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} color="#808080" /> },
        { id: 'help', label: 'Help', icon: <HelpCircle size={20} color="#0000ff" /> },
        { divider: true },
        { id: 'shutdown', label: 'Shut Down...', icon: <Power size={20} color="#ff0000" /> },
    ];

    return (
        <div
            className="win95-outset start-menu"
            style={{
                position: 'fixed',
                bottom: '40px',
                left: '2px',
                width: '200px',
                zIndex: 10000,
                display: 'flex',
            }}
        >
            <div className="start-menu-sidebar">
                <div className="start-menu-sidebar-text">Antigravity <span>2026</span></div>
            </div>
            <div className="start-menu-content" style={{ flex: 1, padding: '2px' }}>
                {menuItems.map((item, index) => (
                    item.divider ? (
                        <div key={`div-${index}`} className="start-menu-divider" />
                    ) : (
                        <div
                            key={item.id}
                            className="start-menu-item"
                            onClick={() => {
                                if (item.id === 'shutdown') {
                                    onShutDown();
                                } else {
                                    onProgramClick(item.id);
                                }
                                onClose();
                            }}
                        >
                            <div className="start-menu-item-icon">{item.icon}</div>
                            <div className="start-menu-item-label">{item.label}</div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default StartMenu;
