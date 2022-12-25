import PropTypes from 'prop-types';

import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import {
  Header,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleValueChange = event => {
    setImageName(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast('Введіть назву картинки');
      return;
    }
    onSubmit(imageName);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FaSearch size={32} />

          <ButtonLabel>Search</ButtonLabel>
        </SearchFormButton>

        <Input
          type="text"
          name="imageName"
          value={imageName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
