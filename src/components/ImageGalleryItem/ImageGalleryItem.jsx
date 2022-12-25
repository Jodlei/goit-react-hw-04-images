import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const ImageGelleryItem = ({ webformatURL, id, tags, toggleModal }) => {
  return (
    <ImageItem onClick={() => toggleModal(id)}>
      {/* <LazyLoadImage
        alt={tags}
        src={webformatURL} // use normal <img> attributes as props
        height={'260px'}
        effect="blur"
      /> */}
      <Image src={webformatURL} alt={tags} />
    </ImageItem>
  );
};

ImageGelleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
