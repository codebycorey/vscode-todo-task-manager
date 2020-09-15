import React, { useEffect } from 'react';
import './App.css';

import { VSCodeMessage } from './lib/VSCodeMessage';

export default function App() {
    useEffect(() => {
        return VSCodeMessage.onMessage((message) => console.log('app', message));
    });
    return (
        <h1>Hello World</h1>
    );
}

;
