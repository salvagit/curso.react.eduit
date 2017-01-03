import {createStore} from 'redux';

let id = 0;
function todo(state={}, action){
  switch(action.type){
    case 'ADD_TODO':
    return {
      title: action.title,
      status: false,
      id: id++
    }
    break;
    default:
    return state;
  }
}
function todos(state=[], action){
  switch(action.type){
    case 'ADD_TODO':
      return [...state, todo(null, action)];
    break;

    case 'REMOVE_TODO':
    return [...state.slice(0, actionindex)
      .concat(state.slice(index+1))
    ];

    break;
    default:
    return state;
  }
}


module.exports = createStore(todos);
