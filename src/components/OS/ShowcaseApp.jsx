import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

const ShowcaseApp = () => {
    const [activeTab, setActiveTab] = useState('home');

    const renderHome = () => (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            color: 'black',
            fontFamily: '"Times New Roman", Times, serif',
            position: 'relative'
        }}>
            <h1 style={{ fontSize: '72px', margin: '0', fontWeight: '900', textAlign: 'center', letterSpacing: '-2px' }}>Devansh Dhyani</h1>
            <h2 style={{ fontSize: '32px', margin: '0 0 40px 0', fontWeight: 'bold', textAlign: 'center' }}>Software Engineer | Full Stack Developer</h2>

            <div style={{ display: 'flex', gap: '30px', fontSize: '18px', marginTop: '20px' }}>
                <button onClick={() => setActiveTab('about')} style={styles.navLink}>ABOUT</button>
                <button onClick={() => setActiveTab('experience')} style={styles.navLink}>EXPERIENCE</button>
                <button onClick={() => setActiveTab('projects')} style={styles.navLink}>PROJECTS</button>
                <button onClick={() => setActiveTab('contact')} style={styles.navLink}>CONTACT</button>
            </div>

            <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '12px', color: '#000' }}>
                © Copyright 2026 Devansh Dhyani
            </div>
        </div>
    );

    const renderSidebar = () => (
        <div style={{
            width: '200px',
            borderRight: '1px solid #808080',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>Devansh</h2>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900' }}>Dhyani</h2>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Showcase '26</p>
            </div>

            <button onClick={() => setActiveTab('home')} style={activeTab === 'home' ? styles.sidebarLinkActive : styles.sidebarLink}>HOME</button>
            <button onClick={() => setActiveTab('about')} style={activeTab === 'about' ? styles.sidebarLinkActive : styles.sidebarLink}>ABOUT</button>
            <button onClick={() => setActiveTab('experience')} style={activeTab === 'experience' ? styles.sidebarLinkActive : styles.sidebarLink}>EXPERIENCE</button>
            <button onClick={() => setActiveTab('projects')} style={activeTab === 'projects' ? styles.sidebarLinkActive : styles.sidebarLink}>PROJECTS</button>
            <button onClick={() => setActiveTab('contact')} style={activeTab === 'contact' ? styles.sidebarLinkActive : styles.sidebarLink}>CONTACT</button>
        </div>
    );

    const renderAbout = () => (
        <div style={styles.contentArea}>
            <h1 style={styles.contentTitle}>Welcome</h1>
            <h2 style={styles.contentSubtitle}>I'm Devansh Dhyani</h2>

            <p style={styles.paragraph}>
                I'm a Results-driven B.Tech Computer Science student (3rd Year, SGPA 8.3) with hands-on experience in full-stack development, data analytics, and AI integration.
                Currently studying at Dev Bhoomi Uttarakhand University, I bridge the gap between robust backend logic and immersive frontend design.
            </p>

            <p style={styles.paragraph}>
                Thank you for taking the time to check out my portfolio. I really hope you enjoy
                exploring it as much as I enjoyed building it. If you have any questions or
                comments, feel free to contact me using <button onClick={() => setActiveTab('contact')} style={styles.inlineLink}>this form</button> or shoot me an email at
                <a href="mailto:undhyani07@gmail.com" style={styles.inlineLink}>undhyani07@gmail.com</a>
            </p>

            <div style={styles.resumeBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '40px' }}>📄</div>
                    <div>
                        <h3 style={{ margin: 0 }}>Looking for my resume?</h3>
                        <a href="#" style={styles.inlineLink}>Click here to download it!</a>
                    </div>
                </div>
            </div>

            <h2 style={styles.sectionHeader}>About Me</h2>
            <p style={styles.paragraph}>
                I specialize in Full Stack development (MERN) and AI integration. My technical toolkit includes Java (DSA), JavaScript, Python, React.js, Next.js, and Three.js.
                I have a proven ability to build production-ready applications and am passionate about data analytics and forensic technology.
            </p>
            <p style={styles.paragraph}>
                Beyond coding, I enjoy performing data cleaning, analysis, and modeling. I have experience collaborating with cross-functional teams to optimize platform performance and user experience.
            </p>
        </div>
    );

    const renderContact = () => (
        <div style={styles.contentArea}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h1 style={styles.contentTitle}>Contact</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.socialIcon}><Github size={24} /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.socialIcon}><Linkedin size={24} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" style={styles.socialIcon}><Twitter size={24} /></a>
                </div>
            </div>

            <p style={styles.paragraph}>
                I am currently a student (Expected Graduation 2027), however if you have any opportunities, feel free to reach out -
                I would love to chat! You can reach me via my personal email, or fill out the form below!
            </p>

            <p style={styles.paragraph}>
                <strong>Email:</strong> <a href="mailto:undhyani07@gmail.com" style={styles.inlineLink}>undhyani07@gmail.com</a>
            </p>

            <form style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>* Your name:</label>
                    <input type="text" placeholder="Name" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>* Email:</label>
                    <input type="email" placeholder="Email" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Company (optional):</label>
                    <input type="text" placeholder="Company" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>* Message:</label>
                    <textarea placeholder="Message" style={styles.textarea}></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <button type="button" style={styles.submitBtn}>Send Message</button>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>All messages get forwarded straight to my personal email</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'red' }}>* = required</p>
                    </div>
                </div>
            </form>
        </div>
    );

    const renderExperience = () => (
        <div style={styles.contentArea}>
            <h1 style={styles.contentTitle}>Experience</h1>

            <div style={styles.experienceItem}>
                <h3 style={{ margin: '0' }}>Technical Support Executive & Frontend Developer</h3>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>EdTech Startup | 2026 – Present</p>
                <ul style={styles.list}>
                    <li>Developed responsive UI components using React/Next.js, HTML, CSS, and JavaScript.</li>
                    <li>Collaborated with backend teams to integrate APIs and optimize platform performance.</li>
                    <li>Provided technical support and resolved platform issues, improving user experience.</li>
                </ul>
            </div>

            <div style={styles.experienceItem}>
                <h3 style={{ margin: '0' }}>Data Analytics Intern</h3>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Deloitte | June 2025 – October 2025</p>
                <ul style={styles.list}>
                    <li>Performed data cleaning, analysis, and modeling using Python and advanced spreadsheet tools.</li>
                    <li>Developed data visualizations and structured reports simulating real client projects.</li>
                    <li>Gained exposure to log analysis, web security fundamentals, and computer networking.</li>
                </ul>
            </div>
        </div>
    );

    const renderProjects = () => (
        <div style={styles.contentArea}>
            <h1 style={styles.contentTitle}>Projects</h1>

            <div style={styles.experienceItem}>
                <h3 style={{ margin: '0' }}>AI-Integrated Job Portal</h3>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>MERN Stack (MongoDB, Express.js, React.js, Node.js)</p>
                <ul style={styles.list}>
                    <li>Built full-stack job portal with AI-based job-user matching, secure authentication, and recruiter management.</li>
                    <li>Implemented responsive UI, optimized REST APIs, and scalable database models.</li>
                </ul>
            </div>

            <div style={styles.experienceItem}>
                <h3 style={{ margin: '0' }}>EdTech Platform</h3>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Next.js + MERN Stack</p>
                <ul style={styles.list}>
                    <li>Developed modern EdTech platform with dynamic course pages and student dashboards.</li>
                    <li>Optimized for cross-device responsiveness and integrated real-time data updates.</li>
                </ul>
            </div>
        </div>
    );

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', background: 'white', color: 'black', fontFamily: '"Times New Roman", Times, serif' }}>
            {activeTab === 'home' ? renderHome() : (
                <>
                    {renderSidebar()}
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {activeTab === 'about' && renderAbout()}
                        {activeTab === 'experience' && renderExperience()}
                        {activeTab === 'projects' && renderProjects()}
                        {activeTab === 'contact' && renderContact()}

                        <div style={{ padding: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#666' }}>
                            Copyright 2026 Devansh Dhyani
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    navLink: {
        background: 'none',
        border: 'none',
        color: '#551a8b',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'bold',
        padding: 0
    },
    sidebarLink: {
        background: 'none',
        border: 'none',
        color: '#0000ee',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: '16px',
        textAlign: 'left',
        padding: '5px 0',
        fontFamily: 'inherit'
    },
    sidebarLinkActive: {
        background: 'none',
        border: 'none',
        color: '#551a8b',
        textDecoration: 'none',
        cursor: 'default',
        fontSize: '16px',
        textAlign: 'left',
        padding: '5px 0',
        fontWeight: 'bold',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    contentArea: {
        padding: '40px',
        maxWidth: '800px'
    },
    contentTitle: {
        fontSize: '64px',
        margin: '0 0 10px 0',
        fontWeight: '900'
    },
    contentSubtitle: {
        fontSize: '24px',
        margin: '0 0 30px 0',
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: '18px',
        lineHeight: '1.6',
        margin: '0 0 20px 0'
    },
    inlineLink: {
        color: '#0000ee',
        textDecoration: 'underline',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 'inherit'
    },
    resumeBox: {
        border: '1px solid #808080',
        padding: '20px',
        margin: '30px 0',
        background: '#f9f9f9'
    },
    sectionHeader: {
        fontSize: '28px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '10px',
        margin: '40px 0 20px 0'
    },
    socialIcon: {
        color: 'white',
        background: '#0077b5',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        textDecoration: 'none'
    },
    form: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
    },
    label: {
        fontWeight: 'bold',
        fontSize: '16px'
    },
    input: {
        padding: '8px',
        border: '1px solid #808080',
        fontSize: '16px',
        fontFamily: 'inherit'
    },
    textarea: {
        padding: '8px',
        border: '1px solid #808080',
        fontSize: '16px',
        fontFamily: 'inherit',
        minHeight: '150px',
        resize: 'vertical'
    },
    submitBtn: {
        background: '#c0c0c0',
        border: '2px solid',
        borderTopColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        padding: '8px 20px',
        cursor: 'pointer',
        fontSize: '16px',
        fontFamily: 'inherit'
    },
    experienceItem: {
        marginBottom: '30px',
        borderLeft: '4px solid #c0c0c0',
        paddingLeft: '15px'
    },
    list: {
        fontSize: '16px',
        margin: '10px 0',
        paddingLeft: '20px',
        lineHeight: '1.6'
    }
};

export default ShowcaseApp;
