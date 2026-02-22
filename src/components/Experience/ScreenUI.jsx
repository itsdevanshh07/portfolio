import React from 'react';

const ScreenUI = () => {
    return (
        <div className="screen-ui" style={{
            width: '100%',
            height: '100%',
            background: '#1a1a1a',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            overflowY: 'auto',
            userSelect: 'text'
        }}>
            <header style={{ borderBottom: '1px solid #333', paddingBottom: '20px' }}>
                <h1 style={{ fontSize: '32px', margin: 0 }}>Devansh Dhyani</h1>
                <p style={{ opacity: 0.6 }}>Software Engineer</p>
            </header>

            <nav style={{ display: 'flex', gap: '20px' }}>
                <button className="nav-btn">About</button>
                <button className="nav-btn">Portfolio</button>
                <button className="nav-btn">Contact</button>
            </nav>

            <section style={{ flex: 1 }}>
                <h2>Welcome to my workspace</h2>
                <p>
                    I specialize in building immersive digital experiences that live at the intersection of design and engineering.
                </p>
                <div style={{
                    background: '#222',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}>
                    <h3>Latest Projects</h3>
                    <ul>
                        <li>Retro OS Simulation</li>
                        <li>3D Workspace Portal</li>
                        <li>WebGL Shader Experiments</li>
                    </ul>
                </div>
            </section>

            <footer style={{ marginTop: 'auto', opacity: 0.4, fontSize: '12px' }}>
                © 2022 Devansh Dhyani. Built with React Three Fiber.
            </footer>

            <style>{`
        .nav-btn {
          background: #333;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .nav-btn:hover {
          background: #444;
        }
        .screen-ui::-webkit-scrollbar {
          width: 8px;
        }
        .screen-ui::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

export default ScreenUI;
