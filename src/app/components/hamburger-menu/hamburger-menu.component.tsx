import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

const HamburgerMenu = ({
  session,
  items,
}: {
  session: Session | null;
  items: string[];
}): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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
        {items.map((item) => (
          <MenuItem id={item} key={item} onClick={handleClose}>
            <Link href={session ? `/${item.toLowerCase()}` : "/login"}>
              {item}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default HamburgerMenu;
