import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { useCart } from '../../context/useCart';

interface ProductCardProps {
  id: string;
  img: string;
  altImg: string;
  title: string;
  text: string;
  typePlant: string;
  price: number;
}

const ProductCard = ({ id, img, altImg, title, text, typePlant, price }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();

  const springProps = useSpring({
    transform: hovered ? 'scale(1.02) translateY(-5px)' : 'scale(1) translateY(0)',
    boxShadow: hovered
      ? '0px 10px 20px rgba(0, 0, 0, 0.15)'
      : '0px 4px 10px rgba(0, 0, 0, 0.05)',
    // Dodajemy config, żeby animacja była płynniejsza
    config: { tension: 300, friction: 20 }
  });

  const handleAddToCart = () => {
    addToCart({ id, img, title, price });
  };

  return (
    <animated.div 
      style={{
        ...springProps,
        // ZMIANA 1: Przenosimy stałą szerokość i border-radius na wrapper animacji!
        width: '100%',
        maxWidth: '320px', 
        borderRadius: '16px',
        margin: '0 auto'
      }} 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card sx={{
        // ZMIANA 2: Karta wypełnia teraz wrappera w 100%
        width: '100%', 
        minHeight: 450,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        // Usuwamy domyślny cień karty, bo mamy już cień animowany na wrapperze
        boxShadow: 'none' 
      }}>
        <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          <CardMedia
            component="img"
            image={img}
            alt={altImg}
            sx={{
              height: 240,
              objectFit: 'cover',
            }}
          />
          <CardContent sx={{ 
            textAlign: 'center', 
            padding: '20px',
            flexGrow: 1 
          }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {title || 'Zielona roślina'}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {text}
            </Typography>

            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>
              Typ: {typePlant}
            </Typography>

            <Typography variant="h6" color="text.primary" sx={{ mt: 1, fontWeight: 700 }}>
              {price} PLN
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <IconButton 
            aria-label="add to cart" 
            color="success" 
            onClick={handleAddToCart}
            sx={{ 
              backgroundColor: '#f0fdf4',
              '&:hover': { backgroundColor: '#dcfce7' }
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </animated.div>
  );
};

export default ProductCard;