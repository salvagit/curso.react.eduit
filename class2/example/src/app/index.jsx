import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';

class App extends React.Component {
  
  render() {
    return (
      <h1>Hola Mundo, somos react</h1>
    );
  }
}

const appRender = ()=>render(<App />,
document.getElementById('app')
);

appRender();
