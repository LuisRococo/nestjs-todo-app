"use client";

import { CreatedAuthContext } from "@/context/authContext";
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useContext(CreatedAuthContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    if (logout) logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href={"/"} className="tw-grow">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MY TODO
            </Typography>
          </Link>
          {user && (
            <div>
              <div>
                <Button
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  style={{ textTransform: "none" }}
                >
                  <FaUserCircle className="tw-text-4xl" />
                  <p className="tw-ml-2">{user.firstName}</p>
                </Button>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          )}

          {!user && (
            <div>
              <Link href={"/login"}>
                <Button sx={{ color: "white" }}>Login</Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
