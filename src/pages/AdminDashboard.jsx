import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Table, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Activity, 
    Users, 
    Database, 
    Zap, 
    ShieldAlert, 
    ArrowLeft, 
    TrendingUp, 
    DownloadCloud,
    Globe,
    Cpu,
    MessagesSquare
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';

// Simulated Telemetry Data
const connectionData = [
  { name: '08:00', sessions: 400, pulses: 2400 },
  { name: '10:00', sessions: 300, pulses: 1398 },
  { name: '12:00', sessions: 2000, pulses: 9800 },
  { name: '14:00', sessions: 2780, pulses: 3908 },
  { name: '16:00', sessions: 1890, pulses: 4800 },
  { name: '18:00', sessions: 2390, pulses: 3800 },
  { name: '20:00', sessions: 3490, pulses: 4300 },
];

const libraryDistribution = [
  { name: 'PDFs', value: 456, color: '#5C7CFA' },
  { name: 'Images', value: 312, color: '#22D3EE' },
  { name: 'Code', value: 218, color: '#94A3B8' },
  { name: 'Others', value: 154, color: '#334155' },
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    return (
        <div className="landing-bg min-vh-100 text-white pb-5">
            {/* Header / Command HUD */}
            <nav className="py-4 border-bottom border-white border-opacity-5 sticky-top bg-black bg-opacity-80 backdrop-blur">
                <Container className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <Button variant="link" className="text-secondary p-0 me-2" onClick={() => navigate('/workspace')}>
                            <ArrowLeft size={20} />
                        </Button>
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-cobalt p-2 rounded-3 shadow-glow">
                                <ShieldAlert size={20} className="text-white" />
                            </div>
                            <h4 className="fw-bold tracking-tighter m-0">Admin <span className="text-cobalt">Intelligence</span></h4>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <Badge bg="transparent" className="border border-cobalt border-opacity-30 text-cobalt px-3 py-2 mono smaller uppercase tracking-widest">
                            Watcher Mode Active
                        </Badge>
                        <Button variant="outline-danger" size="sm" className="rounded-pill px-4 border-opacity-20" onClick={() => navigate('/workspace')}>
                            Terminate Hub
                        </Button>
                    </div>
                </Container>
            </nav>

            <Container className="py-5">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Live Telemetry Overview */}
                    <Row className="gy-4 mb-5">
                        <Col lg={3} md={6}>
                            <Card className="glass-card p-4 border-0 h-100 shadow-lg">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="bg-cobalt bg-opacity-10 p-2 rounded-3">
                                        <Users size={20} className="text-cobalt" />
                                    </div>
                                    <TrendingUp size={16} className="text-success" />
                                </div>
                                <h2 className="fw-bold mb-1">2.4k</h2>
                                <p className="text-secondary smaller mono uppercase tracking-widest m-0">Active Students</p>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}>
                            <Card className="glass-card p-4 border-0 h-100 shadow-lg">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="bg-cyan bg-opacity-10 p-2 rounded-3">
                                        <Zap size={20} className="text-cyan" />
                                    </div>
                                    <div className="smaller text-success mono">+12%</div>
                                </div>
                                <h2 className="fw-bold mb-1">892</h2>
                                <p className="text-secondary smaller mono uppercase tracking-widest m-0">Live Pulse Rooms</p>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}>
                            <Card className="glass-card p-4 border-0 h-100 shadow-lg">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="bg-secondary bg-opacity-10 p-2 rounded-3">
                                        <Database size={20} className="text-secondary" />
                                    </div>
                                    <div className="smaller text-secondary mono">4.2TB</div>
                                </div>
                                <h2 className="fw-bold mb-1">54.2k</h2>
                                <p className="text-secondary smaller mono uppercase tracking-widest m-0">Library Assets</p>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}>
                            <Card className="glass-card p-4 border-0 h-100 shadow-lg border-bottom border-cobalt border-3">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="bg-cobalt bg-opacity-10 p-2 rounded-3">
                                        <Activity size={20} className="text-cobalt" />
                                    </div>
                                    <div className="pulse pulse-green"></div>
                                </div>
                                <h2 className="fw-bold mb-1">0.4ms</h2>
                                <p className="text-secondary smaller mono uppercase tracking-widest m-0">P2P Avg Latency</p>
                            </Card>
                        </Col>
                    </Row>

                    {/* Charts Section */}
                    <Row className="gy-4 mb-5">
                        <Col lg={8}>
                            <Card className="glass-card p-4 border-0 shadow-lg overflow-hidden">
                                <div className="d-flex justify-content-between align-items-center mb-5">
                                    <div>
                                        <h5 className="fw-bold m-0">Global Session Flux</h5>
                                        <p className="text-secondary smaller mono m-0">Real-time P2P vs Session Initialization</p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <Badge bg="cobalt" className="px-3">Pulses</Badge>
                                        <Badge bg="secondary" className="px-3 bg-opacity-20 text-secondary border border-white border-opacity-5">Sessions</Badge>
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: 350 }}>
                                    <ResponsiveContainer>
                                        <AreaChart data={connectionData}>
                                            <defs>
                                                <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#5C7CFA" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#5C7CFA" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis 
                                                dataKey="name" 
                                                stroke="#94A3B8" 
                                                fontSize={12} 
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis 
                                                stroke="#94A3B8" 
                                                fontSize={12} 
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: '#111', 
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="pulses" 
                                                stroke="#5C7CFA" 
                                                strokeWidth={3}
                                                fillOpacity={1} 
                                                fill="url(#colorPulse)" 
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="sessions" 
                                                stroke="#94A3B8" 
                                                strokeDasharray="5 5"
                                                fill="transparent" 
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="glass-card p-4 border-0 shadow-lg h-100">
                                <h5 className="fw-bold mb-4 text-center">Library Composition</h5>
                                <div style={{ width: '100%', height: 250 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={libraryDistribution}
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {libraryDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: '#111', 
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="d-flex flex-column gap-3 mt-4">
                                    {libraryDistribution.map(item => (
                                        <div key={item.name} className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center gap-2">
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }}></div>
                                                <span className="smaller text-secondary">{item.name}</span>
                                            </div>
                                            <span className="mono smaller fw-bold">{item.value} units</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    {/* Regional & Activity Grid */}
                    <Row className="gy-4">
                        <Col lg={6}>
                            <Card className="glass-card p-4 border-0 shadow-lg">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
                                        <Globe size={18} className="text-secondary" /> Edge Nodes Status
                                    </h5>
                                    <div className="smaller mono text-secondary">Active: 12 Nodes</div>
                                </div>
                                <div className="d-flex flex-column gap-4">
                                    {[
                                        { node: 'North America (East)', load: 78, status: 'Optimal' },
                                        { node: 'Europe (Frankfurt)', load: 92, status: 'High Load' },
                                        { node: 'Asia Pacific (Singapore)', load: 45, status: 'Optimal' },
                                        { node: 'South America (Sao Paulo)', load: 12, status: 'Low Load' },
                                    ].map(item => (
                                        <div key={item.node}>
                                            <div className="d-flex justify-content-between smaller mb-2">
                                                <span className="text-secondary">{item.node}</span>
                                                <span className={`mono ${item.load > 90 ? 'text-danger' : 'text-cyan'}`}>{item.status}</span>
                                            </div>
                                            <ProgressBar 
                                                now={item.load} 
                                                className="bg-black bg-opacity-30" 
                                                variant={item.load > 90 ? 'danger' : 'cyan'} 
                                                style={{ height: 6 }} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card className="glass-card p-4 border-0 shadow-lg">
                                <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                                    <MessagesSquare size={18} className="text-secondary" /> Recent Laboratory Logs
                                </h5>
                                <div className="d-flex flex-column gap-3">
                                    {[
                                        { id: 'SYS-09', action: 'Library Synchronization', user: 'ADMIN-91', time: '2m ago' },
                                        { id: 'USR-22', action: 'P2P Pulse Initiated', user: 'Student_99', time: '4m ago' },
                                        { id: 'SEC-01', action: 'Credential Rotation Success', user: 'KEY_ROTATOR', time: '6m ago' },
                                        { id: 'NET-44', action: 'Bi-Directional Drop Complete', user: 'Lab_Helper', time: '10m ago' },
                                    ].map(log => (
                                        <div key={log.id} className="p-3 prism-surface rounded-4 d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="mono smaller text-cobalt opacity-50">{log.id}</div>
                                                <div>
                                                    <div className="fw-bold smaller">{log.action}</div>
                                                    <div className="smaller text-secondary mono" style={{ fontSize: '0.6rem' }}>Triggered by {log.user}</div>
                                                </div>
                                            </div>
                                            <div className="smaller mono text-secondary opacity-50">{log.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </motion.div>
            </Container>

            <style>
                {`
                .backdrop-blur {
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                .shadow-glow {
                    box-shadow: 0 0 15px rgba(92, 124, 250, 0.4);
                }
                .text-cyan { color: #22D3EE !important; }
                .progress-bar.bg-cyan { background-color: #22D3EE !important; }
                `}
            </style>
        </div>
    );
};

export default AdminDashboard;
