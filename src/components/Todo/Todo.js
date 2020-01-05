import React from "react";

import Input from "../Input/Input";

import "./todo.css";
import FilteringOptions from "../FilteringOptions/FilteringOptions";

const FILTER_STATES = {
  all: "All",
  active: "active",
  completed: "completed"
};

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = localStorage.getItem('state') 
              ? JSON.parse(localStorage.getItem('state')) 
              : {
                  todos: [],
                  currentId: 1,
                  filter: FILTER_STATES.all
                };
  }

  onTodoAdd = todoValue => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        { id: state.currentId, name: todoValue, isComplete: false }
      ],
      currentId: state.currentId + 1
    }));
  };

  onTodoSelect = activeId => {
    this.setState(state => ({
      todos: state.todos.map(todo =>
        todo.id === activeId
          ? { ...todo, isComplete: !todo.isComplete, isEdit: false }
          : todo
      )
    }));
  };

  onTodoEdit = activeId => {
    this.setState(state => ({
      todos: state.todos.map(todo =>
        todo.id === activeId ? { ...todo, isEdit: true } : todo
      )
    }));
  };

  onItemInputChange = (id, e) => {
    const { value } = e.target;

    this.setState(state => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, name: value } : todo
      )
    }));
  };

  onItemKeyPress = (id, e) => {
    const isEnter = e.key === "Enter";

    this.setState(state => ({
      todos: state.todos.map(todo =>
        todo.id === id
          ? { ...todo, isEdit: isEnter ? false : todo.isEdit }
          : todo
      )
    }));
  };

  onItemDelete = id => {
    this.setState(state => ({
      todos: state.todos.filter(todo =>
        todo.id !== id
      )
    }));
  }

  onFilter = filter => {
    this.setState({
      filter
    });
  };

  getFilteredTodos = (todos, filter) => {
    let normalizedTodos = todos;

    if (filter === FILTER_STATES.completed) {
      normalizedTodos = todos.filter(todo => todo.isComplete);
    } else if (filter === FILTER_STATES.active) {
      normalizedTodos = todos.filter(todo => !todo.isComplete);
    }

    return normalizedTodos;
  };

  render() {
    const { todos, filter } = this.state;
    const normalizedTodos = this.getFilteredTodos(todos, filter);
    localStorage.setItem('state', JSON.stringify(this.state));

    return (
      <div>
        <h1>Todo</h1>
        <Input onTodoAdd={this.onTodoAdd} />
        <section>
          <ul>
            {normalizedTodos.map(({ name, id, isComplete, isEdit }) => (
              <li key={id} className={isComplete ? "checked" : ""}>
                <button onClick={e => this.onItemDelete(id)}>
                  <i className="fa fa-trash"></i> 
                </button>
                <input type="checkbox" onClick={() => this.onTodoSelect(id)} defaultChecked = {isComplete ? "checked" : ""}/>

                {isEdit ? (
                  <input
                    value={name}
                    onChange={e => this.onItemInputChange(id, e)}
                    onKeyDown={e => this.onItemKeyPress(id, e)}
                  />
                ) : (
                    <span onClick={() => this.onTodoEdit(id)}>{name}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
        <FilteringOptions filter={filter} onFilter={this.onFilter} />
      </div>
    );
  }
}
