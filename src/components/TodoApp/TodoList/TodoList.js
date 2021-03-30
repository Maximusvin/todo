import { Component } from 'react';
import s from './TodoList.module.css';
import { GrFormClose } from 'react-icons/gr';
import { FiCheck } from 'react-icons/fi';
import { BsPencil } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';

const TodoList = ({
  todos,
  filter,
  onDelete,
  onCompleted,
  onUpdate,
  onUpdateText,
}) => {
  return (
    <>
      {todos.length ? (
        <ul className={s.list}>
          {todos.map(({ id, text, completed, onUpdateTodo }) => (
            <li key={id} className={completed ? s.itemCompleted : s.item}>
              {onUpdateTodo ? (
                <UpdateTodo
                  key={text + id}
                  text={text}
                  id={id}
                  onUpdateText={onUpdateText}
                />
              ) : (
                <p>{text}</p>
              )}

              <div className={s.controls}>
                <button
                  type="button"
                  className={s.btnUpdate}
                  onClick={() => onUpdate(id)}
                >
                  <BsPencil className={s.iconCheck} />
                </button>

                <button
                  type="button"
                  className={completed ? s.btnCheckCompleted : s.btnCheck}
                  onClick={() => onCompleted(id)}
                >
                  <FiCheck className={s.iconCheck} />
                </button>

                <button
                  type="button"
                  className={s.btn}
                  onClick={() => onDelete(id)}
                >
                  <GrFormClose className={s.icon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.notification}>
          Таски по запиту " {filter} " не знайдено
        </p>
      )}
    </>
  );
};

class UpdateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onUpdateText(this.props.id, this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.formUpdate}>
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleInputChange}
          className={s.inputUpdateTodo}
        />
        <button type="submit" className={s.btnUpdateText}>
          <AiFillPlusCircle className={s.iconUpdate} />
        </button>
      </form>
    );
  }
}

export default TodoList;
