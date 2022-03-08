import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

export default function Account() {

    const api = axios.create({
        baseURL: `http://localhost:4000`,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    React.useEffect(() => {
        api.get('/getaccountbyid').then(res => {
            console.log(res.data);
            setCurrentAccountType(res.data.type);
            setCompanyName(res.data.company_name);
            if (res.data.type == 'admin') {
                api.post('/getaccountsbycompanyname', { company_name: res.data.company_name }).then(res => {
                    setHistory(res.data);
                }).catch((err) => {
                    console.log(err.response);
                });
            } else {
                api.get('/getallaccounts').then(res => {
                    setHistory(res.data);
                }).catch((err) => {
                    console.log(err.response);
                });
            }
        }).catch((err) => {
            console.log(err.response);
        });
        api.get('/getallcompanies').then(res => {
            setCompaniesList(res.data);
        }).catch((err) => {
            console.log(err.response);
        });
    }, []);

    const [companies_list, setCompaniesList] = React.useState([]);
    const [company_name, setCompanyName] = React.useState('');
    const [accountType, setAccountType] = React.useState('');
    const [currentaccountType, setCurrentAccountType] = React.useState('');
    const [history, setHistory] = React.useState([]);

    function CreateUser(company_name, email, type) {
        api.post('/addaccount', {
            company_name: company_name,
            email: email,
            type: type
        }).then((res) => {
            console.log(res);
            setHistory([
                ...history,
                {
                    company_name: company_name,
                    type: type,
                    name: '',
                    email: email,
                    id: 101,
                    active: 0
                },
            ]);
        }).catch((err) => {
            console.log(err.response);
        });
    }

    function RequestingUser(id, index) {
        console.log(id, index);
        api.post('/requestinguser', { id: id }).then((res) => {
            console.log(res);
            api.get('/getallaccounts').then(res => {
                setHistory(res.data);
            }).catch((err) => {
                console.log(err.response);
            });
        }).catch((err) => {
            console.log(err.response);
        });
    }

    const handleSubmitCompany = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log('company_name', company_name);
        CreateUser(companies_list.filter((company) => {
            return company.id == data.get("company_name") || company.company_name == company_name
        })[0].company_name, data.get("email"), data.get("account_type"));
    };

    return (
        <div>
            <Box sx={{ minWidth: 120 }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Create New Account
                </Typography>
                <Box sx={{ height: 10, }} />
                <Box component="form" onSubmit={handleSubmitCompany}>
                    <FormControl fullWidth>
                        <InputLabel id="select-account-type">Account Type</InputLabel>
                        <Select
                            labelId="select-account-type"
                            id="account_type"
                            name="account_type"
                            value={accountType}
                            label="Account Type"
                            onChange={(e) => { setAccountType(e.target.value) }}
                            required
                        >
                            {currentaccountType == 'system admin' ? <MenuItem value={"system admin"}>System Admin</MenuItem> : null}
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                        </Select>
                    </FormControl>
                    {currentaccountType == 'system admin' ? <Box sx={{ height: 20, }} /> : null}
                    {currentaccountType == 'system admin' ? <FormControl fullWidth>
                        <InputLabel id="select-company-name">Select Company</InputLabel>
                        <Select
                            labelId="select-company-name"
                            id="company_name"
                            name="company_name"
                            value={company_name}
                            label="Select Company"
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        >
                            {companies_list.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.company_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl> : null}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        id="email"
                        label="E-Mail"
                        type="email"
                        autoComplete="email"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send an invitation
                    </Button>
                </Box>
            </Box>
            <Box sx={{ height: 40, }} />
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                History
            </Typography>
            <Box sx={{ height: 10, }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {currentaccountType == 'admin' ? null : <TableCell>Company Name</TableCell>}
                            <TableCell>Account Type</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {currentaccountType == 'admin' ? null : <TableCell component="th" scope="row">
                                    {row.company_name}
                                </TableCell>}
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                {row.active == 1 ? <TableCell>Completed</TableCell> : null}
                                {row.active == 0 ? <TableCell><Button variant="text" onClick={() => { RequestingUser(row.id, index) }}>Requesting</Button></TableCell> : null}
                                {row.active == -1 ? <TableCell>Cancelled</TableCell> : null}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
