import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import InputBase from "@mui/material/InputBase";
import Paper from '@mui/material/Paper';
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from "@mui/icons-material/Logout";

import clsx from "clsx";
import logo from "../assets/images/logo.svg";

import Routes from "./Routes";

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles({
  activeCategory: {
    color: "#0072E5 !important",
    backgroundColor: "#F0F7FF !important",
  },
  activeIcon: {
    color: "#0072E5 !important",
  },
  searchBar: {
    position: "relative",
    left: "16rem",

    ["@media (max-width: 1024px)"]: {
      left: "6rem"
    },

    ["@media (max-width: 768px)"]: {
      left: "2rem"
    }
  }
});

const Layout = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAvatarMenuOpen = (event) => {
    // setAvatarMenu(true);
    setAnchorEl(event.currentTarget);
  }

  const handleAvatarMenuClose = () => {
    // setAvatarMenu(false);
    setAnchorEl(null);
  }

  const [category, setCategory] = useState("");
  let history = useHistory();

  const handleActiveCategory = (requestedCategory) => {
    setCategory(requestedCategory);

    history.push(`/${requestedCategory}`);
  };

  useEffect(() => {
    handleActiveCategory("dashboard");
  }, []);

  const logout = () => {

  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>

          <Grid className={classes.searchBar}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Qoutations ..."
                inputProps={{ "aria-label": "search qoutations" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid style={{ position: "absolute", right: "1rem" }}>
            <IconButton
              onClick={handleAvatarMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                alt={props.userData.name}
                src={props.userData.profile_picture}
                style={{
                  // position: "absolute",
                  // right: "1rem",
                  cursor: "pointer",
                  width: "50px",
                  height: "50px"
                }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleAvatarMenuClose}
              onClick={handleAvatarMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >              
              {/* <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            {/* <Menu
              id="basic-menu"
              // anchorEl={anchorEl}
              open={avatarMenu}
              onClose={handleAvatarMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              // style={{ position: "absolute", right: "1rem" }}
            >
              <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleAvatarMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleAvatarMenuClose}>Logout</MenuItem>
            </Menu> */}
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <img
            src={logo}
            style={{
              height: "70px",
              width: "70px",
            }}
          />
          <Typography
            variant="h5"
            style={{
              position: "relative",
              top: "1rem",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Innovantage
          </Typography>
        </div>
        {/* <Divider /> */}
        <List>
          <ListItemButton
            onClick={() => {
              handleActiveCategory("dashboard");
            }}
            className={clsx({
              [classes.activeCategory]: category === "dashboard",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>Dashboard</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "dashboard",
                  })}
                >
                  <HomeIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "dashboard",
                })}
              >
                <HomeIcon />
              </ListItemIcon>
            )}
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              handleActiveCategory("qoutation");
            }}
            className={clsx({
              [classes.activeCategory]: category === "qoutation",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={
                  <div style={{ fontSize: "14px" }}>Qoutation Requests</div>
                }
                placement="right"
              >
                <ListItemIcon>
                  <CurrencyRupeeIcon
                    className={clsx({
                      [classes.activeIcon]: category === "qoutation",
                    })}
                  />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon>
                <CurrencyRupeeIcon
                  className={clsx({
                    [classes.activeIcon]: category === "qoutation",
                  })}
                />
              </ListItemIcon>
            )}
            <ListItemText>Qoutation Requests</ListItemText>
          </ListItemButton>

          {/* <ListItemButton
            onClick={() => {
              handleActiveCategory("search");
            }}
            className={clsx({
              [classes.activeCategory]: category === "search",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>Search</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "search",
                  })}
                >
                  <SearchIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "search",
                })}
              >
                <SearchIcon />
              </ListItemIcon>
            )}
            <ListItemText>Search</ListItemText>
          </ListItemButton> */}

          <ListItemButton
            onClick={() => {
              handleActiveCategory("users");
            }}
            className={clsx({
              [classes.activeCategory]: category === "users",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>Manage Users</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "users",
                  })}
                >
                  <PersonIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "users",
                })}
              >
                <PersonIcon />
              </ListItemIcon>
            )}
            <ListItemText>Manage Users</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              handleActiveCategory("lr");
            }}
            className={clsx({
              [classes.activeCategory]: category === "lr",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>LR's</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "lr",
                  })}
                >
                  <AssignmentIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "lr",
                })}
              >
                <AssignmentIcon />
              </ListItemIcon>
            )}
            <ListItemText>LR's</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              handleActiveCategory("career");
            }}
            className={clsx({
              [classes.activeCategory]: category === "career",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>Career Page</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "career",
                  })}
                >
                  <WorkIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "career",
                })}
              >
                <WorkIcon />
              </ListItemIcon>
            )}
            <ListItemText>Career Page</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              handleActiveCategory("reviews");
            }}
            className={clsx({
              [classes.activeCategory]: category === "reviews",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>Company Reviews</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "reviews",
                  })}
                >
                  <StarIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "reviews",
                })}
              >
                <StarIcon />
              </ListItemIcon>
            )}
            <ListItemText>Company Reviews</ListItemText>
          </ListItemButton>

          {/* <ListItemButton
            onClick={() => {
              handleActiveCategory("logout");
            }}
            className={clsx({
              [classes.activeCategory]: category === "logout",
            })}
          >
            {open === false ? (
              <Tooltip
                style={{ width: "0%" }}
                title={<div style={{ fontSize: "14px" }}>Sign Out</div>}
                placement="right"
              >
                <ListItemIcon
                  className={clsx({
                    [classes.activeIcon]: category === "logout",
                  })}
                >
                  <LogoutIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon
                className={clsx({
                  [classes.activeIcon]: category === "logout",
                })}
              >
                <LogoutIcon />
              </ListItemIcon>
            )}
            <ListItemText>Sign Out</ListItemText>
          </ListItemButton> */}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes />
      </Box>
    </Box>
  );
};

export default Layout;
