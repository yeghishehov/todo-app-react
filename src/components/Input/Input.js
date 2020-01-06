import React from "react";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoValue: "",
      placeholder: "Add Todo"
    };
  }

  onInputChange = ({ target: { value } }) => {
    console.groupCollapsed("ON_INPUT_CHANGE");
    console.log(`value: ${value}`);
    console.groupEnd();
    this.setState({
      todoValue: value
    });
  };

  handleSubmit = () => {
    this.props.onTodoAdd(this.state.todoValue);
    this.setState({
      todoValue: ""
    });
  };

  handleKeyDown = e => {
    if (e.key === 'Enter'){
      this.handleSubmit();
    }
  }

  render() {
    const { placeholder, todoValue } = this.state;

    return (
      <div>
        <input
          autoFocus
          className="input"
          placeholder={placeholder}
          value={todoValue}
          onChange={this.onInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className="addBtn" onClick={this.handleSubmit}> <i className="fa fa-plus-circle"> </i></button>
        
      </div>
    );
  }
}
