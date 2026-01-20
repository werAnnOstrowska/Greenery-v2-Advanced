import { useEffect, useState, useRef } from "react";
import type { UnsplashImage } from "../../types";  
import imagesDownload from "../../api";
import ProductListBase from "./ProductListBase";
import withLoading from "../HOC/withLoading";
import {} from "../../stylesheet/ProductList.css"


const ProductListWithLoading = withLoading(ProductListBase);

const ProductList = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [error, setError] = useState<string | null>(null); // Nowy stan na błąd
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchImages = async () => {
      console.log("Fetching started...");
      try {
        const result = await imagesDownload();
        console.log("Result received:", result);
        setImages(result);
      } catch (err) {
        console.log("Catch block triggered!");
        setError("Failed to load products...");
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  // Jeśli jest błąd, wyświetlamy komunikat zamiast listy
  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>{error}</div>;
  }

  return (
    <ProductListWithLoading
      images={images}
      isLoading={images.length === 0}
    />
  );
};

export default ProductList;
