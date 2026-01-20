// import React from 'react'
import {List, ListItem, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {} from "../../stylesheet/CartPreview.css"
import { useCart } from '../../context/useCart';

const CartPreview = () => {

     const { cartItems, removeFromCart } = useCart();

    // const [dense, setDense] = React.useState(false);
    // const [secondary, setSecondary] = React.useState(false);

    // function generate(element: React.ReactElement) {
    // return [0, 1, 2].map((value) =>
    //     React.cloneElement(element, {
    //     key: value,
    //     })
    // );
    // }

   return (
    <div className="cart-preview_wrapper">
        <div className="cart-preview_container">
            {cartItems.length === 0 ? (
                <p className="empty-cart-message" >Your cart is empty</p>
                ) : (
                <List dense>
                    {cartItems.map(item => (
                        <ListItem
                        key={item.id}
                        secondaryAction={
                            <IconButton edge="end"  aria-label="delete" onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.id);
                            }}>
                            <DeleteIcon />
                            </IconButton>
                        }
                        >
                        <ListItemText
                            primary={item.title}
                            secondary={`Quantity: ${item.quantity} | Price: $${item.price * item.quantity}`}
                        />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    </div>
  );
}

export default CartPreview