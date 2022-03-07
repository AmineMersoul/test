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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Search() {

    const api = axios.create({
        baseURL: `http://localhost:4000`
    });

    React.useEffect(() => {
        api.get('/getallcompanies').then(res => {
            setCompaniesList(res.data);
        });
        api.get('/getallaccounts').then(res => {
            setResults(res.data);
        });
    }, []);

    const [companies_list, setCompaniesList] = React.useState([]);

    const [company_name_1, setCompany1] = React.useState('');
    const [company_name_2, setCompany2] = React.useState('');
    const [accountType, setAccountType] = React.useState('');
    const [results, setResults] = React.useState([]);

    function SearchUser(company_name, type, query) {
        api.post('/searchaccount', { company_name: company_name, type: type, query: query }).then((res) => {
            console.log(res);
            setResults(res.data);
        });
    }

    const handleSubmitUser = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            company_name2: data.get("company_name2"),
            type: data.get("account_type"),
            name: data.get("user_name"),
        });
        SearchUser(companies_list.filter((company) => {
            return company.id == data.get("company_name2")
        })[0].company_name,
            data.get("account_type"),
            data.get("user_name"));
    };

    const handleSubmitCompany = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        navigate("company", {
            state: companies_list.filter((company) => {
                return company.id == data.get("company_name1")
            })[0]
        });
    };

    const navigate = useNavigate();

    return (
        <div>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Search Compnay
            </Typography>
            <Box sx={{ minWidth: 120 }}>
                <Box component="form" onSubmit={handleSubmitCompany}>
                    <FormControl fullWidth>
                        <InputLabel id="select-company">Select Company</InputLabel>
                        <Select
                            labelId="select-company"
                            id="company_name1"
                            name="company_name1"
                            value={company_name_1}
                            label="Select Company"
                            onChange={(event) => { setCompany1(event.target.value) }}
                            required
                        >
                            {companies_list.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.company_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Search
                    </Button>
                </Box>
                <Box sx={{ height: 40, }} />
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Search Users
                </Typography>
                <Box sx={{ height: 10, }} />
                <Box component="form" onSubmit={handleSubmitUser}>
                    <FormControl fullWidth>
                        <InputLabel id="select-company-2">Select Company</InputLabel>
                        <Select
                            labelId="select-company-2"
                            id="company_name2"
                            name="company_name2"
                            value={company_name_2}
                            label="Select Company"
                            onChange={(e) => setCompany2(e.target.value)}
                            required
                        >
                            {companies_list.map((row) => (
                                <MenuItem key={row.id} value={row.id}>{row.company_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ height: 20, }} />
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
                            <MenuItem value={"system admin"}>System Admin</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="user_name"
                        label="User Name or E-Mail"
                        type="text"
                        id="name"
                        autoComplete="name"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>
            <Box sx={{ height: 40, }} />
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Results
            </Typography>
            <Box sx={{ height: 10, }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Account Type</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Employee Numbers</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.company_name}
                                </TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.employee_number}</TableCell>
                                <TableCell><Button variant="text" onClick={() => {
                                    navigate("user", { state: row });
                                }}>Details</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
