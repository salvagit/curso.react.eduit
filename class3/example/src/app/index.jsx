import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';
import {todo} from './reducers/index.jsx';

class Title extends React.Component {
  render(){
    return (
      <h1>{this.props.value}</h1>
    );
  }
}


function TodoItem(props){
}

class Todos extends React.Component{
  render(){
    return (
      <ul>
        {this.props.todos.map(t=> (<li key={t.id}>{t.title}</li>) )}
      </ul>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Title value="hola a todos" />
        <Todos todos={this.props.todos} />
      </div>
    );
  }
}

const appRender = ()=>render(<App todos={todo.getState()} />,
  document.getElementById('app')
);

todo.subscribe(()=> appRender());

todo.dispatch({type:'ADD_TODO', title: 'Task 1'});
todo.dispatch({type:'ADD_TODO', title: 'Task 2'});
todo.dispatch({type:'ADD_TODO', title: 'Task 3'});
