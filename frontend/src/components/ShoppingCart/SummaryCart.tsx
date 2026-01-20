import { 
  Button, List, ListItem, IconButton, ListItemText, 
  ListItemAvatar, Avatar, Box, Typography, TextField, 
  Container, Paper, Stack 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../../context/useCart';
import { useMemo } from "react";
import { useModalStore } from "./useModalStore";
import { useDiscountLogic } from "./discountPrice"; 
import { 
  calculateBaseTotal, 
  calculateTotalQuantity, 
  formatDisplayPrice, 
  getPlantImage 
} from "../ShoppingCart/cartCalculations";
import { useNavigate } from 'react-router-dom';

const SummaryCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, addToCart, decrementQuantity } = useCart();
  const openReserve = useModalStore(state => state.openReserve);
  const { applyDiscount, calculateFinalPrice, isDiscountApplied } = useDiscountLogic();

  const baseTotal = useMemo(() => calculateBaseTotal(cartItems), [cartItems]);
  const totalQuantity = useMemo(() => calculateTotalQuantity(cartItems), [cartItems]);
  const finalTotal = calculateFinalPrice(baseTotal);

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <IconButton onClick={() => navigate('/shop')} aria-label="back to shop">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">
            Order Summary ({totalQuantity} items)
          </Typography>
        </Stack>

        <List dense>
          {cartItems.map(item => (
            <ListItem 
              key={item.id} 
              sx={{ py: 2, borderBottom: '1px solid #eee' }}
              secondaryAction={
                <IconButton 
                  edge="end" 
                  aria-label="delete item" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar 
                  src={getPlantImage(item.img)} 
                  alt={item.title} 
                  variant="rounded" 
                  sx={{ width: 60, height: 60, mr: 2 }} 
                />
              </ListItemAvatar>
              
              <ListItemText 
                primary={<Typography fontWeight="bold">{item.title}</Typography>} 
                secondary={
                  <Box component="span">
                    <Typography variant="body2" color="text.primary">
                      Price: {formatDisplayPrice(item.price)}
                    </Typography>
                    
                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => decrementQuantity(item.id)}
                        aria-label="decrease quantity"
                        sx={{ border: '1px solid #ccc' }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      
                      <Typography sx={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>

                      <IconButton 
                        size="small" 
                        onClick={() => addToCart(item)}
                        aria-label="increase quantity"
                        sx={{ border: '1px solid #ccc' }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                } 
              />
            </ListItem>
          ))}
        </List>

        {cartItems.length === 0 && (
          <Typography align="center" sx={{ my: 4, color: 'text.secondary' }}>
            Your cart is empty.
          </Typography>
        )}

        <Box display="flex" flexDirection="column" alignItems="center" mt={3} gap={2}>
          <TextField
            label="DISCOUNT CODE"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => applyDiscount(e.target.value.toUpperCase())}
            helperText={isDiscountApplied ? "Discount applied! (-20%)" : "Try: PLANTS20"}
            color={isDiscountApplied ? "success" : "primary"}
          />

          <Box textAlign="center" sx={{ bgcolor: '#f9f9f9', p: 2, width: '100%', borderRadius: 1 }}>
            {isDiscountApplied && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                Old price: {formatDisplayPrice(baseTotal)}
              </Typography>
            )}
            <Typography variant="h5" fontWeight="bold" color={isDiscountApplied ? "success.main" : "text.primary"}>
              Total: {formatDisplayPrice(finalTotal)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} width="100%">
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={() => navigate('/shop')}
              sx={{ py: 1.5 }}
            >
              Shop More
            </Button>
            
            {cartItems.length > 0 && (
              <Button 
                aria-label="reserveBtn" 
                variant="contained" 
                color="success" 
                fullWidth 
                onClick={openReserve} 
                sx={{ py: 1.5 }}
              >
                Reserve Now
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default SummaryCart;