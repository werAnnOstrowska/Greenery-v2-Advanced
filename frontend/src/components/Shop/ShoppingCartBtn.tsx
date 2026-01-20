import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Badge } from "@mui/material";
import { badgeClasses } from '@mui/material/Badge';
// import { DisplaySettings } from "@mui/icons-material";
import CartPreview from "./CartPreview";
import { useState } from "react";
import { useCart } from "../../context/useCart";


const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;

  }
`;

const ShoppingCartBtn = () => {

  const [hovered, setHovered] = useState(false);

  const {cartItems} = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
        {/* <Link to="/shoppingCart"> */}
            <IconButton aria-label="shopping cart" component={Link} to="/shoppingcart">
            <ShoppingCartIcon fontSize="small" />
              <CartBadge aria-label="badge" badgeContent={totalItems} color="success" overlap="circular" invisible={totalItems === 0}/>
            </IconButton>
        {/* </Link> */}

        {hovered &&  (
        <div style={{
          position: "absolute",
          // top: "100%",
           right: "calc(50% - 19vw)",
          zIndex: 999
            }}>
              <CartPreview />
            </div>
        )}

    </div>
  )
}

export default ShoppingCartBtn