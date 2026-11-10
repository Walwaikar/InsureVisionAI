export default function Field({ label, error, bad, children }) {
  return <label className={'f' + (bad ? ' bad' : '')}><span>{label}</span>{children}<small>{error}</small></label>
}
