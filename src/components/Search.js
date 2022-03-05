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

export default function Search() {

    const [company_1, setCompany1] = React.useState('');
    const [company_name_2, setCompany2] = React.useState('');
    const [accountType, setAccountType] = React.useState('');
    const [results, setResults] = React.useState([
        createData('Company 01', 'admin', 'User 01', 'user01@gmail.com', 24, 101),
    ]);

    const handleChangeCompanyName1 = (event) => {
        setCompany1(event.target.value);
    };

    const handleChangeCompanyName2 = (event) => {
        setCompany2(event.target.value);
    };

    const handleChangeAccountType = (event) => {
        setAccountType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            company_name2: data.get("company_name2"),
            account_type: data.get("account_type"),
            user_name: data.get("user_name"),
        });
        setResults([
            createData(
                data.get("company_name2"),
                data.get("account_type"),
                data.get("user_name"),
                data.get("user_name") + '@gmail.com',
                24,
                101
            ),
        ]);
    };

    function createData(compnany_name, account_type, user_name, email, employee_number, employee_id) {
        return { compnany_name, account_type, user_name, email, employee_number, employee_id };
    }

    const usersList = [
        { label: 'User1', email: 'user1@gmail.com' },
    ];

    return (
        <div>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Search Compnay
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-company">Select Company</InputLabel>
                    <Select
                        labelId="select-company"
                        id="select_1"
                        name="select_1"
                        value={company_1}
                        label="Select Company"
                        onChange={handleChangeCompanyName1}
                    >
                        <MenuItem value={"company_1"}>Company 1</MenuItem>
                        <MenuItem value={"company_2"}>Company 2</MenuItem>
                        <MenuItem value={"company_3"}>Company 3</MenuItem>
                    </Select>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Search
                    </Button>
                </FormControl>
                <Box sx={{ height: 40, }} />
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Search Users
                </Typography>
                <Box sx={{ height: 10, }} />
                <FormControl fullWidth>
                    <InputLabel id="select-company-2">Select Company</InputLabel>
                    <Select
                        labelId="select-company-2"
                        id="company_name2"
                        name="company_name2"
                        value={company_name_2}
                        label="Select Company"
                        onChange={handleChangeCompanyName2}
                    >
                        <MenuItem value={"company_1"}>Company 1</MenuItem>
                        <MenuItem value={"company_2"}>Company 2</MenuItem>
                        <MenuItem value={"company_3"}>Company 3</MenuItem>
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
                        onChange={handleChangeAccountType}
                    >
                        <MenuItem value={"account_type_1"}>Account Type 1</MenuItem>
                        <MenuItem value={"account_type_2"}>Account Type 2</MenuItem>
                        <MenuItem value={"account_type_3"}>Account Type 3</MenuItem>
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
                                key={row.employee_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.compnany_name}
                                </TableCell>
                                <TableCell>{row.account_type}</TableCell>
                                <TableCell>{row.user_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.employee_number}</TableCell>
                                <TableCell><Button variant="text">Details</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
