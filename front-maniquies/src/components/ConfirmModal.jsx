function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>

        <div className="modal-actions">
          <button onClick={onConfirm}>
            Sí
          </button>

          <button onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal