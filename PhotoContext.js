import { createContext, useContext, useState } from 'react';

const PhotosContext = createContext();

export function PhotosProvider({ children }) {
  const [photos, setPhotos] = useState([]);

  const addPhoto = (uri) => setPhotos((prev) => [uri, ...prev]);

  return (
    <PhotosContext.Provider value={{ photos, addPhoto }}>
      {children}
    </PhotosContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotosContext);
}