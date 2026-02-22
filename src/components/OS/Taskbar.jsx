import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import StartMenu from './StartMenu';

const Taskbar = ({ openWindows, activeWindowId, onTaskbarClick, onProgramClick, onShutDown }) => {
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="taskbar">
            <button
                className={`win95-button start-button ${isStartOpen ? 'active' : ''}`}
                onClick={() => setIsStartOpen(!isStartOpen)}
            >
                <Monitor size={16} />
                Start
            </button>

            <StartMenu
                isOpen={isStartOpen}
                onClose={() => setIsStartOpen(false)}
                onProgramClick={onProgramClick}
                onShutDown={onShutDown}
            />

            <div className="taskbar-divider"></div>

            <div style={{ display: 'flex', gap: '5px', flex: 1 }}>
                {openWindows.map(win => (
                    <div
                        key={win.id}
                        className={`win95-button taskbar-item ${activeWindowId === win.id ? 'active' : ''}`}
                        onClick={() => onTaskbarClick(win.id)}
                    >
                        {win.title}
                    </div>
                ))}
            </div>

            <div className="tray">
                <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
    );
};

export default Taskbar;
