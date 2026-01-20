import { Grid, Flex } from "@radix-ui/themes";
import ProductCard2 from "./ProductCard";
import ShoppingCartBtn from "./ShoppingCartBtn";
import Filters from "./Filters";
import type { UnsplashImage } from "../../types";
import { useMemo, useState } from "react";
import { mapImagesToProducts, filterProductsByType } from "./productFilters";

type Props = {
  images: UnsplashImage[];
};

const ProductListBase = ({ images }: Props) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const allProducts = useMemo(() => mapImagesToProducts(images), [images]);

  const filteredProducts = useMemo(() => 
    filterProductsByType(allProducts, activeFilter), 
    [allProducts, activeFilter]
  );

  return (
    <div className="products-container" style={{ padding: '20px', width: '100%' }}>
      {/* Zmieniamy direction na "column", żeby wszystko było jedno pod drugim */}
      <Flex direction="column" gap="4" align="center" style={{ width: '100%' }}>
        
        {/* Sekcja filtrów - teraz będzie na górze, wyśrodkowana */}
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <Filters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        {/* Guzik koszyka - teraz centralnie pod filtrami */}
        <div className="cart-icon">
          <ShoppingCartBtn />
        </div>
        {/* <pre data-testid="debug-products">{JSON.stringify(filteredProducts, null, 2)}</pre> */}
        {/* Grid produktów - wyśrodkowany */}
        <Grid 
          columns={{ initial: '1', sm: '2', md: '3' }} 
          gap="5" 
          style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '20px',
            // Zapewnia, że karty wewnątrz grida są poprawnie rozmieszczone
            justifyItems: 'center' 
          }}>
          {filteredProducts.map((product) => (
            <ProductCard2
              key={product.id}
              id={product.id}
              img={product.urls.small}
              altImg={product.alt_description ?? "Plant image"}
              title={
                product.description
                  ? product.description.split(" ").slice(0, 2).join(" ")
                  : "Zielona roślina"
              }
              text="Piękna roślina do Twojego wnętrza"
              typePlant={product.type}
              price={product.price}
            />
          ))}
        </Grid>

        {filteredProducts.length === 0 && (
          <p>Nie znaleziono roślin w tej kategorii.</p>
        )}
      </Flex>
    </div>
  );
};
export default ProductListBase;