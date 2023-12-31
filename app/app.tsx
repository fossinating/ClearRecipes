'use client'

import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import { useEffect } from 'react';
import Link from "./lib/Link";
import AccountMenu from './lib/AccountMenu';
import { auth } from './backend_lib/auth';


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

class NavData {
  label: string;
  element: JSX.Element;
  page: string;

  constructor(label: string, element: JSX.Element, page: string) {
    this.label = label;
    this.element = element;
    this.page = page;
  }
}

function NavItem(props: {item: NavData}) {
  const pathname = usePathname();

  return (
    <Link href={props.item.page} className={pathname === (props.item.page) ? "current" : undefined}>
      <ListItem key={props.item.label}>
        <ListItemIcon>
          {props.item.element}
        </ListItemIcon>
        <ListItemText primary={props.item.label}>
        </ListItemText>
      </ListItem>
    </Link>
    )}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

interface NavDrawerProps{
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open?: boolean;
}

function NavDrawer(props: NavDrawerProps){
  const session = useSession();

  return (
    <div id="navDrawer" className={props.open ? 'open' : undefined}>
      <List>
      {[
        new NavData("Home", <HomeIcon />, "/"),
        new NavData("Search", <SearchIcon />, "/search"),
        new NavData("Upload", <UploadIcon />, "/upload"),
        ...(session.status === "authenticated" ? [
          null,
          new NavData("My Recipes", <ContactsIcon />, "/my/recipes"),
          new NavData("Saved Recipes", <BookmarksIcon />, "/my/saved")
        ] : [])
      ].map((item, index) => (
        item ? <NavItem item={item} key={item.page}/> : <Divider key={index} />
      ))}</List>
    </div>
  )
}

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setOpen(!open);
    };


    return (
        <>
        <CssBaseline />
          <Box id="layoutContainer">
            <AppBar id="headerBar" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                Clear Recipes
                </Typography>
                <AccountMenu />
              </Toolbar>
            </AppBar>
            <NavDrawer open={open} />
            <Main id="mainContainer" open={open}>
              {children}
            </Main>
          </Box>
        </>
    )
}