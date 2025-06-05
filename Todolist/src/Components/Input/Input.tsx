import './input.css';
import React, { ChangeEventHandler } from 'react';

function Input(
    value: string,
    onChange: ChangeEventHandler,
) {
    return (
        <div className='inputWapper' style={{}}>
            <input
                placeholder='Enter item'
                value={value}
                onChange={onChange}
                className='inputField'
            />
        </div>)
}

export default Input;