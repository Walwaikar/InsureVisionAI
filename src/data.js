// Demo data. Swap these for calls to the FastAPI backend (/api/v1/...) later.
export const INC = [
  { id: 'INC-24012234', loc: 'MG Road Junction, Bangalore', d: '22 Jan 2026, 14:45', sev: 'Minor', sp: 48, lim: 40, st: 'Analyzed', real: true },
  { id: 'INC-24012301', loc: 'Indiranagar 100ft Road', d: '24 Jan 2026, 09:20', sev: 'Moderate', sp: 62, lim: 50, st: 'Pending' },
  { id: 'INC-24012355', loc: 'Silk Board Flyover', d: '26 Jan 2026, 18:05', sev: 'Minor', sp: 35, lim: 40, st: 'Analyzed' },
  { id: 'INC-24012410', loc: 'Hebbal Junction', d: '28 Jan 2026, 07:40', sev: 'Severe', sp: 74, lim: 60, st: 'Reported' }]
export const SV = [
  { n: 'Apollo Hospital', t: 'hospital', r: 4.7, km: 2.1, m: 8, x: 62, y: 24, c: '#E5484D', i: 'cross' },
  { n: 'MG Road Auto Care', t: 'mechanic', r: 4.4, km: 1.2, m: 6, x: 26, y: 62, c: '#F59E0B', i: 'wrench' },
  { n: '24/7 Towing Service', t: 'towing', r: 4.5, km: 3.0, m: 12, x: 78, y: 58, c: '#0FB5A6', i: 'tow' },
  { n: 'Manipal Hospital', t: 'hospital', r: 4.6, km: 4.2, m: 14, x: 18, y: 22, c: '#E5484D', i: 'cross' },
  { n: 'Express Roadside Assist', t: 'rescue', r: 4.3, km: 2.8, m: 10, x: 55, y: 80, c: '#4338CA', i: 'bolt' }]
export const NEAR = SV.reduce((a, b) => a.km < b.km ? a : b).n
export const CARDS = [
  ['Incident replay', 'alert', 'Simulated sensor event', '48 km/h', 'linear-gradient(150deg,#4338CA,#7C5CFF)'],
  ['Fault analysis', 'chart', 'Who contributed, and by how much', '65 / 35', 'linear-gradient(150deg,#0B7F78,#0FB5A6)'],
  ['Insurance desk', 'shield', 'Policies kept in one place', '1 active', 'linear-gradient(150deg,#1E2A78,#4338CA)'],
  ['Nearby help', 'pin', 'Hospitals, garages, towing', '5 listed', 'linear-gradient(150deg,#B45309,#F59E0B)'],
  ['Emergency SOS', 'bolt', 'Demo request, never a dispatch', '1 tap', 'linear-gradient(150deg,#C2262C,#FF6A5F)'],
  ['Sarathi assistant', 'chat', 'Plain answers after a crash', '24/7', 'linear-gradient(150deg,#312E81,#0FB5A6)']]
export const PROV = ['ICICI Lombard', 'HDFC ERGO', 'Bajaj Allianz', 'Tata AIG']
export const COV = ['Comprehensive', 'Third-party', 'Zero depreciation']
export const SAFETY_TIPS = [
  { tip: 'Keep at least three seconds between you and the vehicle ahead.', category: 'Following distance' },
  { tip: 'Slow down before entering a junction and check every direction.', category: 'Junction safety' },
  { tip: 'Wear a seat belt on every trip, including short rides.', category: 'Seat belts' },
  { tip: 'Avoid using your phone while driving; pull over before responding.', category: 'Distraction' },
  { tip: 'Use indicators early so other road users can anticipate your turn.', category: 'Signalling' },
  { tip: 'Increase your following distance in rain or on slippery roads.', category: 'Weather' },
  { tip: 'Check mirrors and blind spots before changing lanes.', category: 'Lane changes' },
  { tip: 'Never drive after drinking alcohol or using impairing substances.', category: 'Impairment' },
  { tip: 'At night, reduce speed when visibility or road lighting is poor.', category: 'Visibility' },
  { tip: 'Check tyre condition and pressure regularly, especially before long trips.', category: 'Vehicle checks' },
]
export const sevClass = s => s === 'Severe' ? 'er' : s === 'Moderate' ? 'wr' : 'ok'
const BOT = [
  [/accident|crash|after/, 'First move somewhere safe and switch on hazard lights. Check everyone for injuries and call 112 if anyone is hurt. Photograph the scene, swap details, then tell your insurer.'],
  [/insur|policy|claim/, 'Keep your policy number handy and notify your insurer soon after the incident. Share your report and photos when they ask.'],
  [/police|112|ambul/, 'For injuries, danger or blocked roads call 112. This app cannot contact emergency services for you.'],
  [/hospital|doctor|medical/, 'Open Nearby help to see demo hospitals. For anything urgent, call 112 first.'],
  [/tow|garage|mechanic/, 'Nearby help lists demo towing and garages. Confirm availability by phone before you rely on them.'],
  [/fault|analysis|blame/, 'The sample analysis weighs speed, signal and braking with simple rules. It is a demonstration and not a legal decision.'],
  [/report|download/, 'Open an incident and review its report. Nothing is sent to an insurer from this prototype.']]
// Rule-based replies. Keep this module separate so an AI provider can replace it later.
export const reply = q => (BOT.find(b => b[0].test(q.toLowerCase())) || [0, 'I can help with accident steps, insurance, towing, hospitals, fault analysis and reports. I don\u2019t replace emergency services or legal advice.'])[1]
const ACTS = { insur: ['Open Insurance', '/insurance'], hospital: ['See Nearby help', '/services'], tow: ['See Nearby help', '/services'], report: ['Open Incidents', '/incidents'], fault: ['Open Incidents', '/incidents'] }
export const actionFor = q => { const k = Object.keys(ACTS).find(k => q.toLowerCase().includes(k)); return k ? ACTS[k] : null }
