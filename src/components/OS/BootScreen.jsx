import React, { useState, useEffect } from 'react';

const BootScreen = ({ onComplete, externalProgress }) => {
    const [logs, setLogs] = useState([]);
    const [internalProgress, setInternalProgress] = useState(0);

    const bootLogs = [
        "Searching for boot record from IDE-0.. OK",
        "Verifying DMI Pool Data ........... Success",
        "Booting Antigravity OS 95...",
        "Loading system drivers...",
        "Initializing GUI...",
        "Welcome to Antigravity OS"
    ];

    useEffect(() => {
        let currentLog = 0;
        const logInterval = setInterval(() => {
            if (currentLog < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[currentLog]]);
                currentLog++;
            } else {
                clearInterval(logInterval);
                // Only complete if progress is 100%
                if (externalProgress === 100 || internalProgress === 100) {
                    setTimeout(onComplete, 1000);
                }
            }
        }, 400);

        const progressInterval = setInterval(() => {
            setInternalProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);

        return () => {
            clearInterval(logInterval);
            clearInterval(progressInterval);
        };
    }, [externalProgress, internalProgress, onComplete]);

    const displayProgress = externalProgress !== undefined ? Math.floor(externalProgress) : internalProgress;

    return (
        <div style={{
            backgroundColor: 'black',
            color: 'white',
            height: '100vh',
            width: '100vw',
            padding: '40px',
            fontFamily: 'monospace',
            fontSize: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
        }}>
            <div>
                {logs.map((log, i) => (
                    <div key={i} style={{ marginBottom: '5px' }}>{log}</div>
                ))}
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ marginBottom: '10px' }}>Loading System... {displayProgress}%</div>
                <div style={{
                    width: '100%',
                    height: '20px',
                    border: '2px solid white',
                    padding: '2px'
                }}>
                    <div style={{
                        width: `${displayProgress}%`,
                        height: '100%',
                        backgroundColor: 'white'
                    }} />
                </div>
            </div>
        </div>
    );
};

export default BootScreen;
