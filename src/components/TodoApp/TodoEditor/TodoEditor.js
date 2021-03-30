import { Component } from 'react';

import s from './TodoEditor.module.css';

class TodoEditor extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      error: false,
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onResetMessage = this.onResetMessage.bind(this);
    this.onNotification = this.onNotification.bind(this);
  }

  handleChangeInput(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.message.trim()) {
      this.props.onAddTodo(this.state.message);
      this.onNotification(
        'success',
        'Ви успішно добавили нову таску',
        'Все ок',
      );
    } else {
      this.onNotification(
        'danger',
        'Ви нічого не ввели в поле. Спробуйте ще',
        'Помилка',
      );
    }
    this.onResetMessage();
  };

  onResetMessage() {
    this.setState({ message: '' });
  }

  onNotification(type, message, title) {
    this.props.store.addNotification({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
  }

  render() {
    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <div className={s.taskInputWrap}>
          <p>Add new Task</p>
          <textarea
            className={s.textarea}
            onChange={this.handleChangeInput}
            value={this.state.message}
            placeholder="Введіть текст вашої нової таски"
          ></textarea>
        </div>

        <button type="submit" disabled={!this.state.message} className={s.btn}>
          Добавити таску
        </button>
      </form>
    );
  }
}

export default TodoEditor;
