import React from 'react';
import { Container, Row, Col, Button, Card, Badge, ListGroup } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Users,
    Zap,
    Database,
    Activity,
    ShieldCheck,
    DownloadCloud,
    Terminal,
    MessagesSquare,
    ChevronRight,
    Search,
    Globe
} from 'lucide-react';
import Logo from '../assets/logo.svg';

const LandingPage = () => {
    return (
        <div className="landing-bg min-vh-100 text-white overflow-hidden pb-5">
            {/* Header / Nav Hud */}
            <nav className="py-4 border-bottom border-white border-opacity-5">
                <Container className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <img src={Logo} alt="Logo" width="32" className="glow-filter" />
                        <span className="fw-bold tracking-tighter fs-5">StudySync <span className="text-cobalt">Drop</span></span>
                    </div>
                    <Button as={Link} to="/workspace" variant="outline-cyan" size="sm" className="text-white rounded-pill px-4">
                        Launch Workspace
                    </Button>
                </Container>
            </nav>

            {/* Hero Section */}
            <header className="py-5 mb-5 mt-lg-5 position-relative">
                <Container>
                    <Row className="align-items-center gy-5">
                        <Col lg={7}>
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Badge bg="cobalt" className="rounded-pill px-3 py-2 text-white mb-4 mono smaller tracking-widest uppercase">
                                    V2.0 Persistent Collaboration
                                </Badge>
                                <h1 className="display-2 fw-bold tracking-tighter mb-4 shiny-text">
                                    Collective Intelligence, <br />
                                    <span className="text-cobalt">Decoupled.</span>
                                </h1>
                                <p className="lead text-secondary mb-5 pe-lg-5">
                                    StudySync Drop is a high-performance P2P collaboration ecosystem.
                                    Synchronize files, notes, and datasets across study groups with zero latency and full-duplex transit.
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <Button as={Link} to="/workspace" className="btn-prism btn-lg px-5 py-3 d-flex align-items-center gap-2">
                                        Initialize Workspace <Zap size={20} />
                                    </Button>
                                    {/* <Button href="#technology" variant="glass" className="btn-lg px-5 py-3 text-white border-white border-opacity-10">
                                        Explore Protocol
                                    </Button> */}
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg={5}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="position-relative"
                            >
                                <div className="hero-visualization glass-card p-4 p-md-5">
                                    <div className="d-flex justify-content-between align-items-center mb-5">
                                        <div className="pulse pulse-green"></div>
                                        <div className="smaller mono text-secondary uppercase tracking-widest text-secondary">Operational HUD</div>
                                    </div>
                                    <div className="d-flex flex-column gap-4">
                                        <div className="viz-beam-container">
                                            <div className="viz-node bg-cobalt"><Users size={20} /></div>
                                            <div className="viz-line-animated"></div>
                                            <div className="viz-node bg-cyan"><DownloadCloud size={20} /></div>
                                        </div>
                                        <div className="viz-status-grid">
                                            <div className="status-item">
                                                <small className="mono d-block text-secondary opacity-50">Latency</small>
                                                <span className="fw-bold fs-4 text-cobalt">0.4ms</span>
                                            </div>
                                            <div className="status-item">
                                                <small className="mono d-block text-secondary opacity-50">Transit</small>
                                                <span className="fw-bold fs-4 text-cyan text-cyan">100MB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hero-glow"></div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </header>

            {/* Informative Stats */}
            <section className="py-5 bg-white bg-opacity-05">
                <Container>
                    <Row className="text-center gy-4">
                        <Col md={3}>
                            <h3 className="fw-bold text-cobalt mb-0">99.9%</h3>
                            <small className="text-secondary mono uppercase tracking-widest">Uptime Pulse</small>
                        </Col>
                        <Col md={3}>
                            <h3 className="fw-bold text-cyan mb-0">P2P</h3>
                            <small className="text-secondary mono uppercase tracking-widest">Core Architecture</small>
                        </Col>
                        <Col md={3}>
                            <h3 className="fw-bold text-cobalt mb-0">Zero</h3>
                            <small className="text-secondary mono uppercase tracking-widest">Signup Friction</small>
                        </Col>
                        <Col md={3}>
                            <h3 className="fw-bold text-cyan mb-0">Multi</h3>
                            <small className="text-secondary mono uppercase tracking-widest">File Bi-Direction</small>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Detailed Protocol Sections */}
            <section id="technology" className="py-5 mt-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold tracking-tight">Synchronized Discovery</h2>
                        <p className="text-secondary lead mx-auto" style={{ maxWidth: '600px' }}>
                            StudySync operates on a twin-engine storage and transit model, bridging ephemeral P2P speed with persistent cloud stability.
                        </p>
                    </div>

                    <Row className="gy-5">
                        <Col lg={6}>
                            <Card className="glass-card h-100 p-4 p-md-5 border-0 shadow-lg">
                                <div className="d-inline-block p-3 rounded-4 bg-cobalt bg-opacity-10 mb-4">
                                    <Zap size={32} className="text-cobalt" />
                                </div>
                                <h3 className="fw-bold mb-4">The Pulse Protocol</h3>
                                <p className="text-secondary mb-4 leading-relaxed">
                                    Our proprietary peer-to-peer transit layer utilizes a full-duplex WebRTC handshake. Files are beamed directly between participants in the room, bypassing central servers to ensure 100% data privacy and line-speed transfer rates.
                                </p>
                                <ListGroup variant="flush" className="bg-transparent border-0">
                                    <ListGroup.Item className="bg-transparent text-secondary border-white border-opacity-5 px-0 py-3 d-flex align-items-center gap-3">
                                        <div className="bg-cobalt p-1 rounded-circle"><ShieldCheck size={14} className="text-white" /></div>
                                        <span>End-to-end peer encryption</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-secondary border-white border-opacity-5 px-0 py-3 d-flex align-items-center gap-3">
                                        <div className="bg-cobalt p-1 rounded-circle"><ShieldCheck size={14} className="text-white" /></div>
                                        <span>Direct memory-to-memory streaming</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-secondary border-0 px-0 py-3 d-flex align-items-center gap-3">
                                        <div className="bg-cobalt p-1 rounded-circle"><ShieldCheck size={14} className="text-white" /></div>
                                        <span>Support for multi-file Bi-directional drop</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card className="glass-card h-100 p-4 p-md-5 border-0 shadow-lg border-top border-cyan border-opacity-20 border-3">
                                <div className="d-inline-block p-3 rounded-4 bg-cyan bg-opacity-10 mb-4">
                                    <Database size={32} className="text-cyan" />
                                </div>
                                <h3 className="fw-bold mb-4">Persistent Libraries</h3>
                                <p className="text-secondary mb-4 leading-relaxed">
                                    Beyond real-time transfers, StudySync integrates a persistent "Study Library" powered by Supabase. Files committed to the library are persisted in the cloud, allowing peers to access shared knowledge even long after the session originator has left.
                                </p>
                                <ListGroup variant="flush" className="bg-transparent border-0">
                                    <ListGroup.Item className="bg-transparent text-secondary border-white border-opacity-5 px-0 py-3 d-flex align-items-center gap-3">
                                        <div className="bg-cyan p-1 rounded-circle"><Globe size={14} className="text-black" /></div>
                                        <span>Worldwide edge CDN delivery</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-secondary border-white border-opacity-5 px-0 py-3 d-flex align-items-center gap-3">
                                        <div className="bg-cyan p-1 rounded-circle"><Globe size={14} className="text-black" /></div>
                                        <span>Automatic file metadata synchronization</span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="bg-transparent text-secondary border-0 px-0 py-3 d-flex align-items-center gap-3">
                                        <div className="bg-cyan p-1 rounded-circle"><Globe size={14} className="text-black" /></div>
                                        <span>50MB Individual per-file persistent limit</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Collaborative HUD Feature Grid */}
            <section className="py-5 bg-black bg-opacity-20">
                <Container>
                    <Row className="gy-4">
                        <Col md={4}>
                            <div className="p-4 prism-surface rounded-5 border-0 hover-lift h-100">
                                <Users className="text-cobalt mb-3" />
                                <h5 className="fw-bold">Dynamic Directory</h5>
                                <p className="small text-secondary m-0">Real-time peer tracking with unique session identity verification to prevent naming collisions.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="p-4 prism-surface rounded-5 border-0 hover-lift h-100">
                                <MessagesSquare className="text-cyan mb-3" />
                                <h5 className="fw-bold">Study Sessions Logs</h5>
                                <p className="small text-secondary m-0">Synchronized study notes and interaction history with high-fidelity, chat-integrated HUD.</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="p-4 prism-surface rounded-5 border-0 hover-lift h-100">
                                <Terminal className="text-cobalt mb-3" />
                                <h5 className="fw-bold">Seamless Handshake</h5>
                                <p className="small text-secondary m-0">Just a Group ID. No account required, no tracking, just collaborative synchronization.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Final CTA */}
            <section className="py-5 mt-5">
                <Container className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="display-4 fw-bold mb-4 tracking-tighter">Ready to <span className="text-cobalt">Sync?</span></h2>
                        <p className="text-secondary lead mb-5 mx-auto" style={{ maxWidth: '500px' }}>
                            Initialize your study group ID and experience the future of decentralized academic collaboration.
                        </p>
                        <Button as={Link} to="/workspace" className="btn-prism btn-lg px-5 py-3 shadow-lg">
                            Launch Study Room V2 <ChevronRight size={20} className="ms-1" />
                        </Button>
                    </motion.div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-5 border-top border-white border-opacity-5 text-center mt-5">
                <Container>
                    <div className="d-flex flex-column align-items-center gap-3">
                        <img src={Logo} alt="Logo" width="24" className="opacity-50" />
                        <p className="text-secondary small mono mb-0">StudySync Drop © 2026. A P2P Laboratory Case Study.</p>
                    </div>
                </Container>
            </footer>

            <style>
                {`
                .landing-bg {
                    background: radial-gradient(circle at 10% 20%, #0a0a0a 0%, #000 100%);
                }
                .text-cobalt { color: #5C7CFA !important; }
                .text-cyan { color: #22D3EE !important; }
                .bg-cobalt { background: #5C7CFA !important; }
                .bg-cyan { background: #22D3EE !important; }
                .border-cyan { border-color: #22D3EE !important; }
                
                .viz-beam-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                }
                .viz-node {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 0 20px rgba(92, 124, 250, 0.2);
                    z-index: 2;
                }
                .viz-line-animated {
                    flex-grow: 1;
                    height: 2px;
                    background: linear-gradient(90deg, #5C7CFA, #22D3EE);
                    position: relative;
                    margin: 0 -10px;
                    opacity: 0.3;
                }
                .viz-line-animated::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 100%;
                    background: white;
                    filter: blur(4px);
                    animation: beam 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes beam {
                    0% { left: 0%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                .hero-visualization {
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                }
                .hero-glow {
                    position: absolute;
                    width: 140%;
                    height: 140%;
                    background: radial-gradient(circle, rgba(92, 124, 250, 0.1) 0%, transparent 60%);
                    top: -20%;
                    left: -20%;
                    z-index: -1;
                    filter: blur(40px);
                }
                .btn-glass {
                    backdrop-filter: blur(10px);
                    background: rgba(255,255,255,0.02);
                }
                .btn-glass:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: white !important;
                }
                .viz-status-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                .prism-surface {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(92, 124, 250, 0.3);
                }
                .shiny-text {
                    background: linear-gradient(to right, #fff 20%, #5C7CFA 40%, #5C7CFA 60%, #fff 80%);
                    background-size: 200% auto;
                    color: #fff;
                    background-clip: text;
                    text-fill-color: transparent;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shine 5s linear infinite;
                }
                @keyframes shine {
                    to { background-position: 200% center; }
                }
                `}
            </style>
        </div>
    );
};

export default LandingPage;
