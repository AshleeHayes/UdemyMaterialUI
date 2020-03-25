import React, { useState, useEffect } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
//destructured, makestyles hook
import { makeStyles } from "@material-ui/styles";

import { Tabs, Tab, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from '@material-ui/core'
import logo from "../../assets/logo.svg";
function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

// adding theme here gives us access to our theme colors/rules
const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    // example of spread
    // refer to documentation under default theme
    ...theme.mixins.toolbar,
    marginBottom: "3em"
  },
  logo: {
    height: "7em"
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
        backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    //spread function
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    fontFamily: "Pacifico",
    fontSize: "1rem",
    textTransform: "none",
    height: "45px",
    color: "white"
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  // value hook anchor element and set anchor element, both hooks. useState- state that will store the clicked componenent and where we want it to render. here- eventually the service tab
  const [anchorEl, setAnchorEl] = useState(null)
  // determine visiblity of menu
  const [open, setOpen] = useState(false)

  const handleChange = (e, value) => {
    setValue(value);
  };

  // e is click event. setanchorelement tells us where we want it renedered. currenttarget contains ting just clicked
  const handleClick = (e) => {
  setAnchorEl(e.currentTarget)
  setOpen(true)
}

const handleClose = (e) => {
  setAnchorEl(null)
  // tell menu to close
  setOpen(false)
}

  useEffect(() => {
    // says: if we are trying to access just the / homepage route AND we have not already set that correct value, then we will go in and call setvalue with 0 to set correct active tab
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/estimate" && value !== 5) {
      setValue(5);
    }
  }, [value]);
  // warning useeffect tells it to set value, doesn't provide dependencies could cause a loop. so we need to pass along with object an array of the dependencies we are using in useeffect, here it is the value constant

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters={true} className={classes.logo}>
            <Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)} disableRipple>
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tab}
                component={Link}
                to="/"
                label="Home"
              />

              {/* MENU for Services created here  */}
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                className={classes.tab}
                component={Link}
                onClick={event => handleClick(event)}
                to="/services"
                label="Services"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/revolution"
                label="The Revolution"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/about"
                label="About Us"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/contact"
                label="Contact Us"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>

            <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Custom Software Development</MenuItem>
              <MenuItem onClick={handleClose}>Mobile App Development</MenuItem>
              <MenuItem onClick={handleClose}>Website Development</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
