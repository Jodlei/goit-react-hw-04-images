import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { getDataFromApi } from './services/API';

import { Container } from './Container/Container.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIdx, setModalImageIdx] = useState(null);

  useEffect(() => {
    if (query) {
      setStatus('loading');
      getDataFromApi(query, page).then(response => updateState(response));
    }
  }, [query, page]);
  const updateState = resp => {
    const { totalHits, hits } = resp.data;
    const normData = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
      return { id, webformatURL, largeImageURL, tags };
    });
    if (hits.length === 0) {
      setStatus('idle');
      toast('По вашому запиту не знайдено жодного зображення');
      return;
    }
    // if (images.length + 12 >= totalHits) {
    //   setStatus('idle');
    //   toast('Більше немає зображень по вашому запиту');
    //   return;
    // }
    setImages(prevImages => {
      return [...prevImages, ...normData];
    });
    setStatus('resolved');
  };

  const handleFormSubmit = imageName => {
    setQuery(imageName);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = id => {
    setShowModal(!showModal);
    setModalImageIdx(images.findIndex(el => el.id === id));
  };

  const { largeImageURL, tags } = images[modalImageIdx] ?? '';

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />

      {images.length !== 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {status === 'loading' && <Loader />}

      {status === 'resolved' && <Button loadMore={loadMore} />}

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1500}
        closeOnClick
        theme="dark"
      />
    </Container>
  );
};
