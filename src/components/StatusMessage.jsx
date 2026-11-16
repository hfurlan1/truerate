// StatusMessage: one message box, reused for three situations.
// Props:
//  type -> "loading", "error" or "empty"
//  text -> the message to show

function StatusMessage({ type, text }) {
    // The type is added to the CSS class (for example "status error"),
    // so the error message can have its own red style in App.css
    return <p className={'status ' + type}>{text}</p>
}

export default StatusMessage