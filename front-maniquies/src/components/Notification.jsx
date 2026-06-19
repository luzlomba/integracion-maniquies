function Notification({ message, onClose }) {
  if (!message) return null

  return (
    <div className="notification">
      <span>{message}</span>
      <button onClick={onClose}>✕</button>
    </div>
  )
}

export default Notification