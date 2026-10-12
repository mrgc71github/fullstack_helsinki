const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification ${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {message}
    </div>
  )
}

export default Notification