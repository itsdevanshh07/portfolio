import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Window = ({
  id,
  title,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isActive,
  zIndex,
  isMaximized,
  isMinimized,
  position
}) => {
  const nodeRef = useRef(null);

  if (isMinimized) return null;

  return (
    <AnimatePresence>
      <Draggable
        nodeRef={nodeRef}
        handle=".win95-title-bar"
        onStart={onFocus}
        position={isMaximized ? { x: 0, y: 0 } : undefined}
        disabled={isMaximized}
      >
        <motion.div
          ref={nodeRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`window-container win95-outset ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''}`}
          style={{
            zIndex,
            position: 'absolute',
            width: isMaximized ? '100%' : '600px',
            height: isMaximized ? 'calc(100% - 40px)' : '400px',
            display: 'flex',
            flexDirection: 'column'
          }}
          onMouseDown={onFocus}
        >
          <div className="win95-title-bar" onDoubleClick={() => onMaximize(id)}>
            <div className="win95-title-bar-text">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {title}
              </span>
            </div>
            <div className="win95-title-bar-controls">
              <button className="win95-control-btn" onClick={(e) => { e.stopPropagation(); onMinimize(id); }}>
                <Minus size={12} />
              </button>
              <button className="win95-control-btn" onClick={(e) => { e.stopPropagation(); onMaximize(id); }}>
                <Square size={10} />
              </button>
              <button className="win95-control-btn close" onClick={(e) => { e.stopPropagation(); onClose(id); }}>
                <X size={12} />
              </button>
            </div>
          </div>
          <div className="window-content" style={{ flex: 1, overflow: 'auto', background: 'white' }}>
            {children}
          </div>
        </motion.div>
      </Draggable>
    </AnimatePresence>
  );
};

export default Window;
