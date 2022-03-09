import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const [account_type, setAccountType] = React.useState('');
    const [company_name, setCompanyName] = React.useState('');
    const [user, setUser] = React.useState({});

    const api = axios.create({
        baseURL: `http://localhost:4000`,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    React.useEffect(() => {
        api.get('/getaccountbyid').then(res => {
            console.log(res.data);
            setAccountType(res.data.type);
            setCompanyName(res.data.company_name);
            setUser(res.data);
            if (res.data.type == 'user') {
                console.log('your are normal user');
                navigate('user', { state: res.data });
            }
        }).catch((err) => {
            console.log(err.response);
        });
    }, []);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">

                        {account_type == 'user' ? null : <ListItemButton onClick={() => {
                            navigate("");
                        }}>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItemButton>}

                        {account_type == 'user' ? <ListItemButton onClick={() => {
                            navigate("user", { state: user });
                        }}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItemButton> : null}

                        {account_type == 'system admin' ? <ListItemButton onClick={() => {
                            navigate("company", {
                                state: {
                                    company_name: '',
                                    company_name_katakana: '',
                                    address: '',
                                    postal_code: '',
                                    phone_number: '',
                                    email: '',
                                    website: '',
                                    date_of_establishment: new Date(),
                                    remark: '',
                                    method: 'add'
                                }
                            });
                        }}>
                            <ListItemIcon>
                                <AddBusinessIcon />
                            </ListItemIcon>
                            <ListItemText primary="Register company" />
                        </ListItemButton> : null}

                        {account_type == 'admin' || account_type == 'user' ? <ListItemButton onClick={() => {
                            api.post('/getcompanybyname', { company_name: company_name }).then((res) => {
                                console.log(res.data);
                                res.data.type = account_type;
                                navigate("company", {
                                    state: res.data
                                });
                            }).catch((err) => {
                                console.log(err.response);
                            });

                        }}>
                            <ListItemIcon>
                                <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary="Company information" />
                        </ListItemButton> : null}

                        {account_type == 'user' ? null : <ListItemButton onClick={() => {
                            navigate("account");
                        }}>
                            <ListItemIcon>
                                <AddReactionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create new account" />
                        </ListItemButton>}

                        <ListItemButton onClick={() => {
                            localStorage.removeItem('token');
                            navigate("/login");
                        }}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Outlet />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider >
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
