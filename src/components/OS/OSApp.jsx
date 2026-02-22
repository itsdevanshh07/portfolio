import React, { useState, useEffect } from 'react';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import { useWindowManager } from '../../hooks/useWindowManager';
import { Folder, FileText, Gamepad2, User, Terminal } from 'lucide-react';
import ShowcaseApp from './ShowcaseApp';

const OSApp = () => {
    const {
        windows,
        activeWindowId,
        openWindow,
        focusWindow,
        closeWindow,
        toggleMinimize,
        toggleMaximize
    } = useWindowManager();

    const [selectedIconId, setSelectedIconId] = useState(null);

    useEffect(() => {
        handleIconDoubleClick('showcase');
    }, []);

    const icons = [
        { id: 'showcase', label: 'My Showcase', icon: <Folder color="#ffd700" fill="#ffd700" size={32} /> },
        { id: 'about', label: 'About Me', icon: <User color="#0000ff" size={32} /> },
        { id: 'doom', label: 'Doom', icon: <Gamepad2 color="#ff0000" size={32} /> },
        { id: 'creditscore', label: 'Credit Score', icon: <FileText color="#00ff00" size={32} /> },
        { id: 'terminal', label: 'Terminal', icon: <Terminal color="#ffffff" size={32} /> },
        { id: 'credits', label: 'Credits', icon: <FileText color="#ffffff" size={32} /> },
    ];

    const handleIconDoubleClick = (id) => {
        const icon = icons.find(i => i.id === id);
        const title = id === 'showcase' ? 'Devansh Dhyani - Showcase 2022' : icon.label;
        openWindow(id, title, getWindowContent(id));
    };

    const handleShutDown = () => {
        window.parent.postMessage({ type: 'EXIT_OS' }, '*');
    };

    const getWindowContent = (id) => {
        switch (id) {
            case 'showcase':
                return <ShowcaseApp />;
            case 'about':
                return (
                    <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="win95-inset" style={{ width: '80px', height: '80px', background: '#808080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={48} color="#c0c0c0" />
                            </div>
                            <div>
                                <h2 style={{ margin: 0 }}>Devansh Dhyani</h2>
                                <p style={{ margin: '5px 0', color: '#404040' }}>Software Engineer</p>
                                <p style={{ fontSize: '12px', margin: 0, color: '#666' }}>Dehradun, India</p>
                            </div>
                        </div>

                        <div className="win95-inset" style={{ padding: '15px', background: '#e0e0e0', marginBottom: '20px' }}>
                            <p style={{ margin: 0 }}>
                                I'm Devansh Dhyani, a pre-final year B.Tech CSE student (2027) at Dev Bhoomi Uttarakhand University.
                                I'm a Full Stack (MERN) Developer and Data Science enthusiast with a passion for building
                                interactive web experiences using Three.js and Anime.js. I bridge the gap between robust
                                backend logic and immersive frontend design.
                            </p>
                        </div>

                        <h3 style={{ borderBottom: '2px solid #808080', paddingBottom: '5px' }}>🎓 Education</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <strong>B.Tech in Computer Science & Engineering</strong><br />
                            Dev Bhoomi Uttarakhand University (2023 – 2027)<br />
                            CGPA: 8.0
                        </div>

                        <h3 style={{ borderBottom: '2px solid #808080', paddingBottom: '5px' }}>🧠 Skills</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                            <div>
                                <strong>Web & Full Stack</strong>
                                <ul style={{ fontSize: '12px', margin: '5px 0' }}>
                                    <li>HTML, CSS, JavaScript</li>
                                    <li>React.js, Node.js, Express.js</li>
                                    <li>MERN Stack</li>
                                    <li>Responsive Web Design</li>
                                </ul>
                            </div>
                            <div>
                                <strong>3D & Animation</strong>
                                <ul style={{ fontSize: '12px', margin: '5px 0' }}>
                                    <li>Three.js</li>
                                    <li>Anime.js</li>
                                </ul>
                            </div>
                            <div>
                                <strong>Data Science & Analytics</strong>
                                <ul style={{ fontSize: '12px', margin: '5px 0' }}>
                                    <li>Python</li>
                                    <li>Pandas, Matplotlib, Bokeh</li>
                                    <li>Data Analysis & Visualization</li>
                                    <li>Jupyter, JupyterLab</li>
                                </ul>
                            </div>
                            <div>
                                <strong>DevOps & Tools</strong>
                                <ul style={{ fontSize: '12px', margin: '5px 0' }}>
                                    <li>Git & GitHub</li>
                                    <li>Deployment Basics</li>
                                    <li>SDLC & Testing</li>
                                    <li>Visual Studio Code</li>
                                </ul>
                            </div>
                        </div>

                        <h3 style={{ borderBottom: '2px solid #808080', paddingBottom: '5px' }}>📜 Certifications</h3>
                        <ul style={{ fontSize: '12px' }}>
                            <li>IBM Certified: Applied Data Science Using Python</li>
                            <li>Web Development Fundamentals</li>
                        </ul>
                    </div>
                );
            case 'doom':
                return (
                    <div style={{ background: 'black', color: '#00ff00', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: 'monospace' }}>
                        <iframe
                            src="https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1"
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="DOOM"
                        />
                    </div>
                );
            case 'terminal':
                return (
                    <div style={{ background: 'black', color: '#00ff00', height: '100%', padding: '10px', fontFamily: 'monospace', overflow: 'auto' }}>
                        <div>Devansh OS [Version 1.0.2022]</div>
                        <div>(c) 2022 Devansh Dhyani. All rights reserved.</div>
                        <div style={{ marginTop: '10px' }}>C:\&gt; _</div>
                    </div>
                );
            case 'creditscore':
                return (
                    <div style={{ padding: '20px', background: '#f0f0f0', height: '100%' }}>
                        <h2 style={{ color: '#008000', marginBottom: '20px' }}>Equifax Credit Report</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#008000' }}>824</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>EXCELLENT</div>
                            </div>
                            <div style={{ width: '150px', height: '10px', background: 'linear-gradient(to right, red, yellow, green)', borderRadius: '5px' }}>
                                <div style={{ width: '4px', height: '20px', background: 'black', position: 'relative', left: '85%', top: '-5px' }}></div>
                            </div>
                        </div>
                        <div className="win95-inset" style={{ padding: '15px', background: 'white' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Summary</h4>
                            <div style={{ fontSize: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>Payment History: <span style={{ color: 'green' }}>Excellent</span></div>
                                <div>Credit Usage: <span style={{ color: 'green' }}>12%</span></div>
                                <div>Credit Age: <span style={{ color: 'blue' }}>8 Years</span></div>
                                <div>Total Accounts: <span style={{ color: 'blue' }}>14</span></div>
                            </div>
                        </div>
                    </div>
                );
            case 'credits':
                return (
                    <div style={{ padding: '20px' }}>
                        <h2>System Credits</h2>
                        <p style={{ marginTop: '10px' }}>This portfolio was built using modern web technologies while honoring the classic aesthetics of the 90s.</p>
                        <ul style={{ fontSize: '13px', lineHeight: '1.6' }}>
                            <li><strong>Engine:</strong> React 19 + Vite</li>
                            <li><strong>3D Graphics:</strong> Three.js & R3F</li>
                            <li><strong>Animations:</strong> Framer Motion</li>
                            <li><strong>Icons:</strong> Lucide React</li>
                        </ul>
                    </div>
                );
            default:
                return <div>Empty Window</div>;
        }
    };

    return (
        <div className="os-root" onClick={() => setSelectedIconId(null)} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <div className="desktop" style={{ height: 'calc(100% - 40px)', position: 'relative' }}>
                {icons.map(icon => (
                    <DesktopIcon
                        key={icon.id}
                        {...icon}
                        isSelected={selectedIconId === icon.id}
                        onClick={setSelectedIconId}
                        onDoubleClick={handleIconDoubleClick}
                    />
                ))}

                {windows.map(win => (
                    <Window
                        key={win.id}
                        {...win}
                        isActive={activeWindowId === win.id}
                        onClose={closeWindow}
                        onMinimize={toggleMinimize}
                        onMaximize={toggleMaximize}
                        onFocus={() => focusWindow(win.id)}
                    >
                        {win.content}
                    </Window>
                ))}
            </div>

            <Taskbar
                openWindows={windows}
                activeWindowId={activeWindowId}
                onTaskbarClick={focusWindow}
                onProgramClick={handleIconDoubleClick}
                onShutDown={handleShutDown}
            />
        </div>
    );
};

export default OSApp;
