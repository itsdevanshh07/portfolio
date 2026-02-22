import { useState, useCallback } from 'react';

export const useWindowManager = (initialApps = []) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(100);

    const openWindow = useCallback((appId, title, content) => {
        setWindows(prev => {
            // If window already open, just focus it
            const existing = prev.find(w => w.id === appId);
            if (existing) {
                focusWindow(appId);
                return prev;
            }

            const newWindow = {
                id: appId,
                title,
                content,
                zIndex: zIndexCounter + 1,
                isMinimized: false,
                isMaximized: false,
                position: { x: 50 + (prev.length * 20), y: 50 + (prev.length * 20) }
            };

            setZIndexCounter(prev => prev + 1);
            setActiveWindowId(appId);
            return [...prev, newWindow];
        });
    }, [zIndexCounter]);

    const focusWindow = useCallback((id) => {
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                const newZ = zIndexCounter + 1;
                setZIndexCounter(newZ);
                return { ...w, zIndex: newZ, isMinimized: false };
            }
            return w;
        }));
    }, [zIndexCounter]);

    const closeWindow = useCallback((id) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const toggleMinimize = useCallback((id) => {
        setWindows(prev => prev.map(w => {
            if (w.id === id) {
                const nextMinimized = !w.isMinimized;
                if (!nextMinimized) {
                    setActiveWindowId(id);
                } else if (activeWindowId === id) {
                    setActiveWindowId(null);
                }
                return { ...w, isMinimized: nextMinimized };
            }
            return w;
        }));
    }, [activeWindowId]);

    const toggleMaximize = useCallback((id) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        ));
    }, []);

    const updatePosition = useCallback((id, x, y) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, position: { x, y } } : w
        ));
    }, []);

    return {
        windows,
        activeWindowId,
        openWindow,
        focusWindow,
        closeWindow,
        toggleMinimize,
        toggleMaximize,
        updatePosition
    };
};
