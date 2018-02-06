import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Demo from './App';
import registerServiceWorker from './registerServiceWorker';

function App(props) {
    return (
        <main>
            <Demo />
        </main>        
    )
}

ReactDOM.render(React.createElement(App), document.getElementById('root'))
registerServiceWorker();
