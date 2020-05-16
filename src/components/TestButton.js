import React, { useState } from 'react';
import User from './user.js'

export default function TestButton() {
    const submitForm = (e) => {
        e.preventDefault();
        let user = new User('s', 'ss', 'sss');
        user.apply('8C8cOXjIuzGj1RC5OZd4');
    }

    return (
        <form onSubmit={submitForm}>
            <button type="submit">TEST</button>
        </form>
    );
}
