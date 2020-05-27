import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { mainListItems, secondaryListItems } from './ListItemsHome';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),

  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) 
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },

}));

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            StackHack1.0
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
                <ChevronLeftIcon />
              )}
          </IconButton>
        </div>
        <Divider />
      {/*  <List>
          <ListItem button key="Admin Register">
            <Tooltip title="Need admin account? Please sign up!" aria-label="sign-up">
              <ListItemIcon>
               
                <Link to="/register"
                  style={{
                    width: "50px",
                    textDecoration: 'none',
                    height: "20%",
                    fontSize: "18px"
                  }}

                >
                <span><PersonAddIcon /> <small style={{paddingLeft:"10px",fontSize:"18px"}}>Admin Sign Up</small></span>
              </Link>
              </ListItemIcon>
            </Tooltip>
          </ListItem>
          <ListItem button key="Admin Sign In">
            <Tooltip title="Have admin account? Please sign in!" aria-label="sign-in">
              <ListItemIcon>
              
                <Link
                  to="/login"
                  style={{
                    width: "50px",
                    textDecoration: 'none',
                    height: "20%",
                    fontSize: "18px"
                  }}
                  className="btn btn-outline-primary "
                >
                   <span><ExitToAppIcon /> <small style={{paddingLeft:"10px",fontSize:"18px"}}>Admin Sign In</small></span>
              </Link>
              </ListItemIcon>
            </Tooltip>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="About Us">
            <Tooltip title="Want to know about developers?" aria-label="About">
              <ListItemIcon>
               
                <Link
                  to="/about"
                  style={{
                    width: "50px",
                    textDecoration: 'none',
                    height: "20%",
                    fontSize: "18px"
                  }}
                  className="btn btn-outline-primary "
                >
              <span><InfoIcon /> <small style={{paddingLeft:"10px",fontSize:"18px"}}>About Us</small></span>
              </Link>
              </ListItemIcon>
            </Tooltip>
          </ListItem>
          <ListItem button key="Contact Us">
            <Tooltip title="Your feedback matters.Let us know your feedback!" aria-label="feedback">
              <ListItemIcon>
                
                <Link
                  to="/feedback"
                  style={{
                    width: "50px",
                    textDecoration: 'none',
                    height: "20%",
                    fontSize: "18px"
                  }}
                  className="btn btn-outline-primary "
                >
                   <span><PermContactCalendarIcon /> <small style={{paddingLeft:"10px",fontSize:"18px"}}>Feedback</small></span>
              </Link>
              </ListItemIcon>
            </Tooltip>
          </ListItem>

        </List>
                */}
                 <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </div>
  )
}  