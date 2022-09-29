import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit, inSubmiting }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    const { value } = event.currentTarget;
    setInputValue(value.toLowerCase());
  };

  const resetInput = () => {
    setInputValue('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return Notify.warning(`Please enter a search query`, {
        backOverlay: true,
        timeout: 1500,
        position: 'center-center',
        fontSize: '34px',
        width: '500px',
        clickToClose: true,
      });
    }
    onSubmit(inputValue);
    resetInput();
  };

  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={handleSubmit}>
        <button type="submit" className={style.button} disabled={inSubmiting}>
          <span className={style.buttonLabel}>Search</span>
        </button>

        <input
          value={inputValue}
          name="input"
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  inSubmiting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
