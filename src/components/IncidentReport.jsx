const factorsFor = incident => incident.real || incident.simulated
  ? [
      { factor: 'Speed above limit', responsible: 'Demo analysis rule', description: `Recorded at ${incident.sp} km/h against a ${incident.lim} km/h limit` },
      { factor: 'Signal Violation', responsible: 'Other Vehicle', description: `Signal recorded as ${incident.signal || 'Red'} in the deterministic demo scenario` },
      { factor: 'Late Braking', responsible: 'Your Vehicle', description: incident.braking || 'Minor braking delay' },
    ]
  : [{ factor: 'Analysis unavailable', responsible: 'Not assessed', description: 'This placeholder incident has no stored analysis.' }]

export function buildIncidentReport(incident) {
  const userFault = incident.real ? 35 : incident.simulated ? incident.userFault : null
  return {
    report_type: 'Simulated incident report',
    generated_at: new Date().toISOString(),
    incident: {
      id: incident.id, date: incident.d, location: incident.loc, severity: incident.sev,
      speed_kmh: incident.sp, speed_limit_kmh: incident.lim,
      braking: incident.braking || 'Not recorded', signal: incident.signal || 'Not recorded', impact: incident.impact || 'Not recorded',
    },
    analysis: {
      user_fault_percentage: userFault,
      other_vehicle_fault_percentage: userFault == null ? null : 100 - userFault,
      confidence: incident.real ? 87 : incident.simulated ? incident.confidence : null,
      factors: factorsFor(incident),
      disclaimer: 'This simulated demonstration is not a legal determination of fault. This report has not been submitted to an insurer.',
    },
  }
}

export default function IncidentReport({ incident, onClose }) {
  if (!incident) return null
  const report = buildIncidentReport(incident)
  const download = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob), a = document.createElement('a')
    a.href = url; a.download = `${incident.id}-demo-report.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <div className="report-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <section className="report-modal card" role="dialog" aria-modal="true" aria-labelledby="report-title">
        <div className="row" style={{ justifyContent: 'space-between' }}><div><span className="pill dm">Simulated report</span><h2 id="report-title" style={{ marginTop: 10 }}>Incident report</h2></div><button className="tg" aria-label="Close report" onClick={onClose}>×</button></div>
        <p className="muted">{incident.id} · {incident.d}</p>
        <div className="grid g2 report-facts">
          <div><small className="muted">Location</small><div>{incident.loc}</div></div><div><small className="muted">Severity</small><div>{incident.sev}</div></div>
          <div><small className="muted">Speed / limit</small><div>{incident.sp} / {incident.lim} km/h</div></div><div><small className="muted">Signal · braking · impact</small><div>{incident.signal || '—'} · {incident.braking || '—'} · {incident.impact || '—'}</div></div>
        </div>
        <h3 style={{ marginTop: 22 }}>Responsibility estimate</h3>
        {report.analysis.user_fault_percentage == null ? <p className="muted">No analysis is stored for this placeholder incident.</p> : <p>You {report.analysis.user_fault_percentage}% · Other vehicle {report.analysis.other_vehicle_fault_percentage}% · Confidence {report.analysis.confidence}%</p>}
        <h3>Contributing factors</h3>
        <ul>{report.analysis.factors.map(f => <li key={f.factor}><b>{f.factor}</b> — {f.responsible}: {f.description}</li>)}</ul>
        <p className="note">{report.analysis.disclaimer || 'This placeholder report has no analysis. No data is sent to an insurer.'}</p>
        <div className="row"><button className="btn" onClick={download}>Download JSON report</button><button className="btn g" onClick={() => window.print()}>Print report</button></div>
      </section>
    </div>
  )
}
