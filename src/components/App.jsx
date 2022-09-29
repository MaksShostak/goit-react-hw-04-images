import { Loader } from './Loader/Loader';
import { useEffect, useState } from 'react';
import ButtonBootstrap from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { getPixabayPhoto } from '../services/Api/Api';
import Modal from './Modal';
import { ImageGallery } from './ImageGallery';
// const body = document.querySelector('body');
export const App = () => {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const [notFaund, setNotFaund] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (input) {
      (async () => {
        try {
          setLoading(true);
          const image = await getPixabayPhoto(page, input);
          if (!image.length) {
            setNotFaund(true);
          } else {
            setItems(prev => [...prev, ...image]);
          }
        } catch (error) {
          setError(true);
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [page, input]);

  useEffect(() => {
    const scrollLength = items.length * 260;
    if (scrollLength) {
      window.scrollTo({
        top: scrollLength,
        behavior: 'smooth',
      });
    }
  }, [items.length]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const heandleSubmit = inputValue => {
    if (inputValue === input && page === 1) {
      return;
    }
    setPage(1);
    setInput(inputValue.trim());
    setItems([]);
    setNotFaund(false);
  };

  const openModal = component => {
    setIsOpen(true);
    setSelected(component);
    // body.classList.add('not_scroll');
  };

  const closeModal = () => {
    setIsOpen(false);
    // body.classList.remove('not_scroll');
  };

  return (
    <>
      <Searchbar onSubmit={heandleSubmit} inSubmiting={loading} />
      {isOpen && <Modal modalClose={closeModal} modalimg={selected} />}
      {items.length ? (
        <ImageGallery value={items} modalOpen={openModal} />
      ) : notFaund ? (
        <>
          <p
            style={{
              textAlign: 'center',
              color: 'red',
              fontSize: '30px',
            }}
          >
            Nothing was found for your query : "{input}", please try another
            search term
          </p>
          <img
            style={{
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            src="https://www.bazos.cz/img/1/559/156779559.jpg?t=1661281603"
            alt="Russian warship goes to hell"
            width={600}
          />
        </>
      ) : null}
      {loading && (
        <Loader
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {items.length > 0 && !loading && <ButtonBootstrap onClick={loadMore} />}
      {error && (
        <p>Something went wrong, please reload the page and try again</p>
      )}
    </>
  );
};
