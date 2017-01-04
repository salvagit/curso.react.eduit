import {createStore} from 'redux';
import  { factoryTodos } from './todo.jsx';

function multipleTodos(state=[], action){
  switch(action.type){
    case 'ADD_LIST':
      return [...state, factoryTodos()];
    break;

    case 'ALTER_TODO':
      return state.map( (todos, index)=>{
          if(index!==action.index) return todos;
          todos.dispatch({action: 'ALTER_TODO', id: action.id});
          return factoryTodos(todos.getState());
      });

      return state;
    break;
    case 'REMOVE_TODO':
      return state.filter(t=> todo(t, action));
    break;
    default:
    return state;
  }
}

module.exports = createStore(multipleTodos);
