import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux';


let id =0;
function todo(state={}, action){
  switch (action.type) {
    case 'ADD_TODO':
        return {
          title: action.title,
          finish: false,
          timer: 0,
          id: id++
        }
      break;
    case 'TOGGLE_TODO':
    console.log(state.id, action.id);
      if(state.id !== action.id) return state;
      else return Object.assign({},
          state,
          {finish: !state.finish}
        );

    default:

  }
}

function todos(state=[], action){
  switch (action.type) {
    case 'ADD_TODO':
        return [...state, todo(null, action)];
      break;
    case 'REMOVE_TODO':
        return [state.slice(0, action.index).concat(index+1)];
      break;
    case 'TOGGLE_TODO':
    console.log(' le action> ' , action);
        return state.map( t=> todo(t, action));
      break;
    default:
      return state;
  }
}


let todoStore = createStore(todos);

todoStore.subscribe((state)=>{
  console.log('------------------------------------------------');
  todoStore.getState()
  .forEach(e=> console.log(e));

});


class Clock extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        currentTime: new Date().getSeconds()
      }
    }

    render(){
      return (
        <h2>{this.state.currentTime}</h2>
      )
    }

    componentDidMount(){
      this.intervalId = setInterval(()=> this.setState({currentTime: new Date().getSeconds()}), 1000);
    }
}

class FormTodo extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeField = this.changeField.bind(this);
        this.state = {
          title: ''
        };
    }

    changeField(evt){
      let own = {};
      own[evt.target.id] = evt.target.value;
      this.setState(own);
    }

    handleSubmit(evt){
      evt.preventDefault();
      if(this.state.title.trim()==='') return;
      todoStore.dispatch({type: 'ADD_TODO', title: this.state.title});
      this.setState({title:''});
    }

    render(){
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title: <input type="text" id='title' value={this.state.title} onChange={this.changeField} />
          </label>
          <input type="submit" value="Add" />
        </form>
      )
    }


}


class TodoItem extends React.Component{
  constructor(props){
      super(props);
      this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(){
    todoStore.dispatch({type:'TOGGLE_TODO', id: this.props.todo.id});
  }

  render(){
    const itemStyle = {
      color: this.props.todo.finish === true ? '#000000' : '#ff0000'
    };

    return (
      <li onClick={this.toggleItem} style={itemStyle } >
        {this.props.todo.title}
      </li>
    );
  }
}

class TodosList extends React.Component{

  render(){
    let list = '';
    return (
      <ul>
        {this.props.todos.map((t)=>{
          return <TodoItem key={t.id} todo={t} />
        })}
      </ul>
    );
  }
}


function Title(props){
  return (
    <h1>{props.value}</h1>
  )
}

class App extends React.Component {

  render() {
    return (
      <div>
      <Title value="relojes magicos"/>
      <Clock />
      <FormTodo />
      <TodosList todos={todoStore.getState()} />
      </div>
    );
  }
}

const appRender = ()=>render(<App />,
document.getElementById('app')
);

appRender();

todoStore.subscribe(()=> appRender())
