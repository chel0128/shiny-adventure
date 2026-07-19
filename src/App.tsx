import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Download,
  HeartHandshake,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const experienceTrend = [
  { month: 'Jan', score: 72, effort: 66 },
  { month: 'Feb', score: 74, effort: 68 },
  { month: 'Mar', score: 73, effort: 67 },
  { month: 'Apr', score: 76, effort: 70 },
  { month: 'May', score: 78, effort: 72 },
  { month: 'Jun', score: 81, effort: 76 },
  { month: 'Jul', score: 83, effort: 78 },
]

const journeyData = [
  { stage: 'Need arose', positive: 74, neutral: 19, negative: 7 },
  { stage: 'Find support', positive: 68, neutral: 21, negative: 11 },
  { stage: 'Wait & connect', positive: 52, neutral: 27, negative: 21 },
  { stage: 'Conversation', positive: 86, neutral: 10, negative: 4 },
  { stage: 'Resolution', positive: 77, neutral: 14, negative: 9 },
  { stage: 'Aftercare', positive: 63, neutral: 23, negative: 14 },
]

const reasonData = [
  { name: 'Fraud & security', value: 28, sentiment: 61 },
  { name: 'Everyday banking', value: 24, sentiment: 84 },
  { name: 'Cards & payments', value: 19, sentiment: 76 },
  { name: 'Mortgages', value: 16, sentiment: 88 },
  { name: 'Financial support', value: 13, sentiment: 69 },
]

const sentimentData = [
  { name: 'Positive', value: 68, color: '#287d65' },
  { name: 'Neutral', value: 21, color: '#d4ad66' },
  { name: 'Negative', value: 11, color: '#c76455' },
]

const metrics = [
  {
    label: 'Customer advocacy',
    value: '+42',
    unit: 'NPS',
    change: '+6 pts',
    positive: true,
    note: 'Customers willing to recommend',
    spark: [41, 43, 42, 47, 49, 48, 52],
  },
  {
    label: 'Experience score',
    value: '83',
    unit: '/ 100',
    change: '+3.8%',
    positive: true,
    note: 'Quality across the full journey',
    spark: [67, 69, 72, 71, 75, 78, 83],
  },
  {
    label: 'First-contact resolution',
    value: '76%',
    unit: '',
    change: '+2.1%',
    positive: true,
    note: 'Needs resolved without repeat contact',
    spark: [70, 71, 73, 72, 74, 75, 76],
  },
  {
    label: 'Customer effort',
    value: '2.1',
    unit: '/ 5',
    change: '−0.4',
    positive: true,
    note: 'Lower effort is better',
    spark: [31, 29, 30, 27, 25, 23, 21],
  },
]

const insights = [
  {
    title: 'Aftercare is the next loyalty lever',
    detail: '14% negative sentiment after the call is driven by unclear next steps and missing confirmations.',
    tag: 'Journey opportunity',
    impact: 'High',
  },
  {
    title: 'Fraud customers need more reassurance',
    detail: 'Resolution remains strong, but confidence scores trail the average by 17 points after fraud calls.',
    tag: 'Emerging theme',
    impact: 'High',
  },
  {
    title: 'Empathy is lifting mortgage advocacy',
    detail: 'Customers mentioning “understood” are 2.4× more likely to recommend after mortgage conversations.',
    tag: 'What’s working',
    impact: 'Scale',
  },
]

type NavItemProps = {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  )
}

function MiniSparkline({ data, inverse = false }: { data: number[]; inverse?: boolean }) {
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 88
      const min = Math.min(...data)
      const max = Math.max(...data)
      const y = 30 - ((value - min) / Math.max(max - min, 1)) * 24
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg className="sparkline" viewBox="0 0 88 34" aria-hidden="true">
      <polyline points={points} fill="none" stroke={inverse ? '#287d65' : '#287d65'} strokeWidth="2.5" />
    </svg>
  )
}

function App() {
  const [range, setRange] = useState('Last 30 days')
  const [section, setSection] = useState('Overview')
  const [mobileNav, setMobileNav] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">CP</div>
          <div>
            <strong>Customer Pulse</strong>
            <span>Executive intelligence</span>
          </div>
          <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <nav>
          <p className="nav-heading">Experience</p>
          <NavItem icon={<LayoutDashboard size={19} />} label="Overview" active={section === 'Overview'} onClick={() => setSection('Overview')} />
          <NavItem icon={<HeartHandshake size={19} />} label="Customer journey" active={section === 'Customer journey'} onClick={() => setSection('Customer journey')} />
          <NavItem icon={<MessageSquareText size={19} />} label="Voice of customer" active={section === 'Voice of customer'} onClick={() => setSection('Voice of customer')} />
          <NavItem icon={<Sparkles size={19} />} label="Experience insights" active={section === 'Experience insights'} onClick={() => setSection('Experience insights')} />
          <p className="nav-heading secondary">People & trust</p>
          <NavItem icon={<Users size={19} />} label="Colleague impact" />
          <NavItem icon={<ShieldCheck size={19} />} label="Customer care" />
        </nav>

        <div className="sidebar-callout">
          <div className="pulse-icon"><Sparkles size={16} /></div>
          <strong>Experience brief ready</strong>
          <p>Your weekly executive summary has 4 new recommendations.</p>
          <button>Open briefing <ChevronRight size={15} /></button>
        </div>

        <div className="profile">
          <div className="avatar">AM</div>
          <div>
            <strong>Alex Morgan</strong>
            <span>Chief Customer Officer</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </aside>

      {mobileNav && <div className="overlay" onClick={() => setMobileNav(false)} />}

      <main>
        <header className="topbar">
          <div className="mobile-brand">
            <button onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={22} /></button>
            <div className="brand-mark small">CP</div>
          </div>
          <div className={`global-search ${searchOpen ? 'open' : ''}`}>
            <Search size={18} />
            <input aria-label="Search dashboard" placeholder="Search insights, journeys, themes…" />
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <button className="icon-button mobile-search" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <Search size={19} />
            </button>
            <button className="icon-button" aria-label="Help"><CircleHelp size={19} /></button>
            <div className="notification-wrap">
              <button className="icon-button" onClick={() => setNotifications(!notifications)} aria-label="Notifications">
                <Bell size={19} /><span className="notification-dot" />
              </button>
              {notifications && (
                <div className="notification-popover">
                  <strong>2 experience signals</strong>
                  <p>Fraud-call confidence has declined 4 points this week.</p>
                  <p>Mortgage advocacy reached a 6-month high.</p>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Executive experience overview</p>
              <h1>The customer story, end to end.</h1>
              <p className="subtitle">See how every conversation shapes confidence, loyalty and financial wellbeing.</p>
            </div>
            <div className="heading-actions">
              <label className="select-wrap">
                <span className="sr-only">Date range</span>
                <select value={range} onChange={(event) => setRange(event.target.value)}>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last quarter</option>
                  <option>Year to date</option>
                </select>
                <ChevronDown size={16} />
              </label>
              <button className="export-button"><Download size={17} /> Export brief</button>
            </div>
          </section>

          <div className="context-row">
            <span><span className="live-dot" /> Experience signals updated 12 minutes ago</span>
            <span className="divider" />
            <span>Retail Banking · All customer segments · All channels</span>
          </div>

          <section className="metric-grid">
            {metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <div className="metric-label">{metric.label}<CircleHelp size={14} /></div>
                <div className="metric-main">
                  <div><strong>{metric.value}</strong><span>{metric.unit}</span></div>
                  <MiniSparkline data={metric.spark} inverse={metric.label === 'Customer effort'} />
                </div>
                <div className="metric-footer">
                  <span className={metric.positive ? 'positive-change' : 'negative-change'}>
                    {metric.label === 'Customer effort' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                    {metric.change}
                  </span>
                  <span>vs previous period</span>
                </div>
                <p>{metric.note}</p>
              </article>
            ))}
          </section>

          <section className="dashboard-grid primary-grid">
            <article className="panel experience-panel">
              <div className="panel-heading">
                <div>
                  <p className="panel-kicker">Experience momentum</p>
                  <h2>Customer confidence is building</h2>
                </div>
                <div className="legend">
                  <span><i className="green" /> Experience score</span>
                  <span><i className="gold" /> Ease of journey</span>
                </div>
              </div>
              <div className="chart-summary">
                <strong>+11 pts</strong>
                <span>since January, led by more human conversations and stronger resolution</span>
              </div>
              <div className="trend-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={experienceTrend} margin={{ top: 12, right: 5, left: -22, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#287d65" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#287d65" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e6df" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7a7a73', fontSize: 12 }} />
                    <YAxis domain={[50, 90]} axisLine={false} tickLine={false} tick={{ fill: '#99978f', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e1ded4', boxShadow: '0 8px 25px rgba(33,45,39,.1)' }} />
                    <Area type="monotone" dataKey="score" name="Experience" stroke="#287d65" strokeWidth={3} fill="url(#scoreFill)" />
                    <Area type="monotone" dataKey="effort" name="Ease" stroke="#d4ad66" strokeWidth={2} fill="transparent" strokeDasharray="5 4" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="panel sentiment-panel">
              <div className="panel-heading">
                <div>
                  <p className="panel-kicker">Voice of customer</p>
                  <h2>How customers feel</h2>
                </div>
                <button className="text-link">Explore themes <ChevronRight size={15} /></button>
              </div>
              <div className="sentiment-content">
                <div className="donut-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentData} dataKey="value" innerRadius={54} outerRadius={72} paddingAngle={3} stroke="none">
                        {sentimentData.map((item) => <Cell key={item.name} fill={item.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="donut-center"><strong>68%</strong><span>positive</span></div>
                </div>
                <div className="sentiment-list">
                  {sentimentData.map((item) => (
                    <div key={item.name}>
                      <span><i style={{ background: item.color }} />{item.name}</span>
                      <strong>{item.value}%</strong>
                    </div>
                  ))}
                </div>
              </div>
              <blockquote>“I felt listened to, not rushed. Jamie explained what would happen next.”</blockquote>
              <p className="quote-meta">Mortgage customer · Verified feedback</p>
            </article>
          </section>

          <section className="panel journey-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">End-to-end journey</p>
                <h2>Where the experience gains — and loses — trust</h2>
              </div>
              <button className="text-link">View journey detail <ChevronRight size={15} /></button>
            </div>
            <div className="journey-layout">
              <div className="journey-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={journeyData} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 4 }} barSize={18}>
                    <CartesianGrid horizontal={false} stroke="#eeece6" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="stage" type="category" width={108} axisLine={false} tickLine={false} tick={{ fill: '#5c5d57', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: '#f6f5f1' }} contentStyle={{ borderRadius: 10, border: '1px solid #e1ded4' }} />
                    <Bar dataKey="positive" name="Positive" stackId="a" fill="#287d65" radius={[4, 0, 0, 4]} />
                    <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#d4ad66" />
                    <Bar dataKey="negative" name="Negative" stackId="a" fill="#c76455" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="friction-card">
                <span className="friction-tag">Biggest friction point</span>
                <div className="friction-score">21% <ArrowUpRight size={18} /></div>
                <h3>Waiting to connect</h3>
                <p>Uncertainty—not simply wait duration—is the strongest driver of negative sentiment.</p>
                <div className="recommendation">
                  <Sparkles size={16} />
                  <span><strong>Recommended action</strong> Set clearer expectations and offer proactive callbacks.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-grid lower-grid">
            <article className="panel reasons-panel">
              <div className="panel-heading">
                <div>
                  <p className="panel-kicker">Needs & outcomes</p>
                  <h2>Why customers reach out</h2>
                </div>
                <span className="small-note">% of conversations</span>
              </div>
              <div className="reason-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reasonData} margin={{ top: 2, right: 0, bottom: 0, left: -28 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#686963', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#99978f', fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e1ded4' }} />
                    <Bar dataKey="value" name="Conversation share" radius={[5, 5, 0, 0]} fill="#264f47">
                      {reasonData.map((_, index) => <Cell key={index} fill={index === 0 ? '#c76455' : '#4f8175'} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="reason-note"><ShieldCheck size={17} /><span><strong>92% safeguarded</strong> of vulnerable customer needs were identified and supported appropriately.</span></div>
            </article>

            <article className="panel insights-panel">
              <div className="panel-heading">
                <div>
                  <p className="panel-kicker">Decision intelligence</p>
                  <h2>What deserves attention</h2>
                </div>
                <span className="ai-badge"><Sparkles size={13} /> Synthesised</span>
              </div>
              <div className="insight-list">
                {insights.map((insight, index) => (
                  <button className="insight-row" key={insight.title}>
                    <span className={`insight-number n${index + 1}`}>0{index + 1}</span>
                    <span className="insight-copy">
                      <span className="insight-meta">{insight.tag} · {insight.impact} impact</span>
                      <strong>{insight.title}</strong>
                      <span>{insight.detail}</span>
                    </span>
                    <ChevronRight size={18} />
                  </button>
                ))}
              </div>
            </article>
          </section>

          <footer>
            <span>Customer Pulse combines feedback, conversation intelligence, journey and service data.</span>
            <span>Data through 18 July 2026 · <button>Methodology</button></span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
