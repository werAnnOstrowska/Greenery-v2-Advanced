// import axios from "axios";
import type { UnsplashImage } from "./types"


// export type UnsplashImage = {
//   id: string;
//   description: string | null;
//   alt_description: string | null;
//   urls: {
//     raw: string;
//     full: string;
//     regular: string;
//     small: string;
//     thumb: string;
//   };
// };

const imagesDownload = async (): Promise<UnsplashImage[]> => {
  const clientId = import.meta.env.VITE_UNSPLASH_CLIENT_ID;
  const url = "https://api.unsplash.com/search/photos?query=potted+plant&per_page=9&orientation=portrait";

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${clientId}`,
    },
  });

  if (!response.ok) throw new Error('Network response was not ok');
  
  const data = await response.json();
  return data.results;
};

export default imagesDownload;