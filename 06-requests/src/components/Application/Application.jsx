import { useEffect, useState } from 'react';

import Loader from 'components/Loader/Loader';
import Gallery from 'components/Gallery/Gallery';
import { getImages } from 'services/api';
import SelectCounty from 'components/SelectCounty/SelectCounty';

const STATUSES = {
  idle: 'IDLE',
  pending: 'PENDING',
  success: 'SUCCESS',
  error: 'ERROR',
};

const Application = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUSES.idle);
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  const handleSelect = ({ target: { value } }) => {
    setCount(value);
    setStatus(STATUSES.pending);
    setError('');
  };

  useEffect(() => {
    if (count !== 0) {
      async function getImagesForGallery() {
        try {
          const { data } = await getImages(count);
          setStatus(STATUSES.success);
          setImages((prev) => [...prev, ...data.message]);
        } catch (error) {
          setStatus(STATUSES.error);
          setError(error.message);
        } finally {
          setCount(0);
        }
      }
      getImagesForGallery();
    }
  }, [count]);

  return (
    <>
      {status === STATUSES.pending && <Loader />}
      {status === STATUSES.error && <h2>ERROR</h2>}
      {status === STATUSES.error && <h2>{error}</h2>}
      {(status === STATUSES.success ||
        status === STATUSES.idle) && (
        <SelectCounty
          handleSelect={handleSelect}
          value={count}
        />
      )}
      <Gallery images={images} />
    </>
  );
};

export default Application;
