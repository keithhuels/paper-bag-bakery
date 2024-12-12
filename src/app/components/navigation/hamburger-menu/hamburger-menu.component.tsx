import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const HamburgerMenu = ({
  session,
}: {
  session: Session | null;
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setAnchorEl(null);
  };
  return (
    <div>
      <button id="hamburgerMenuButton" onClick={handleClick}>
        <FontAwesomeIcon
          style={{ fontSize: "30px" }}
          icon={faBars}
        ></FontAwesomeIcon>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem id="blog" onClick={handleClose}>
          <Link href={session ? "/blog" : "/login"}>Blog</Link>
        </MenuItem>
        <MenuItem id="services" onClick={handleClose}>
          <Link href={session ? "/services" : "/login"}>Services</Link>
        </MenuItem>
        <MenuItem id="contact" onClick={handleClose}>
          <Link href={session ? "/contact" : "/login"}>Contact</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HamburgerMenu;
