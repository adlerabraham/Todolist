//PascalCassing
function Message() {
    const name = 'Adler';
    if (name)
        return <h1>Hi {name}</h1>
    return <h1>Hi everyone</h1>;
}

export default Message;