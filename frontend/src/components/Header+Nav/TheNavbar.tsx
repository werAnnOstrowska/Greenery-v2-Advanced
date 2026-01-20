import NavbarButton from "./NavbarButton"
import {Flex} from "@radix-ui/themes"
import {} from "../../stylesheet/TheNavbar.css"

const TheNavbar = () => {
  return (
    <div className="navbar-container">
        <Flex justify="center" align="center" gap="6">
            <div className="circle"></div>
            <NavbarButton text="Homepage" route="/"/>
            <NavbarButton text="Shop" route="/shop"/>
            <NavbarButton text="About us" route="/aboutus"/>
            <div className="circle"></div>
        </Flex>
    </div>
  )
}

export default TheNavbar