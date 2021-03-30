import s from './Filter.module.css';

const Filter = ({ onFilter, filter, onResetFilter }) => (
  <div className={s.filterWrap}>
    <h3>Фільтр</h3>
    <form className={s.form}>
      <input
        type="text"
        placeholder="Введіть перші літери"
        className={s.input}
        onChange={onFilter}
        value={filter}
      />
      <button
        type="button"
        onClick={onResetFilter}
        className={s.btn}
        disabled={!filter}
      >
        Очистити
      </button>
    </form>
  </div>
);

export default Filter;
