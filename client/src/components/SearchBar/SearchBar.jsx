import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Tooltip, Container } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector, useDispatch } from "react-redux";
import { getUserProductsCart, userLogout } from "../../actions";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState('')
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userDetails)
  const logged = useSelector(state => state.userLogged)
  const guestCart = useSelector(state => state.guestCart)

  useEffect(() => {
    if (logged && userId) {
      dispatch(getUserProductsCart(userId.id))
    }
    // console.log(cart)
  }, [logged])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to='/user/login'>Ingresar</Link></MenuItem>
      {/* <MenuItem onClick={handleMenuClose}></MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/products/?search=${searchInput}`)
  }
  const logOut = () => {
    dispatch(userLogout())
    history.push('/')
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth='lg'>
          <Toolbar>
            <Link to='/'>
                <h3 className='text-white logo'>ivAe</h3>
                <small className='small_logo'>store</small>
            </Link>
            <div className={classes.search}>
              <form onSubmit={handleSubmit}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Buscar producto…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

              <div className={classes.root}>
                <Link to='/user/cart'>
                  <IconButton
                    aria-label="cart"
                    >
                    {cart && cart.length > 0
                      ?
                      <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCartIcon style={{color: 'white'}} />
                      </Badge>
                      : guestCart && guestCart.length > 0
                        ? <Badge badgeContent={guestCart.length} color="secondary">
                          <ShoppingCartIcon style={{color: 'white'}} />
                        </Badge>
                        : <Badge badgeContent={0} color="secondary">
                          <ShoppingCartIcon style={{color: 'white'}} />
                        </Badge>
                    }
                  </IconButton>
                </Link>
              </div>

              <Tooltip title='dashboard'>
                <Link to='/admin/panel'>
                  <IconButton color="inherit">
                    <DashboardIcon />
                  </IconButton>
                </Link>
              </Tooltip>
              {logged && <button onClick={logOut}>Cerrar sesion</button>}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}