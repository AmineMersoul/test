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

export default function Account() {

    const [company_name, setCompanyName] = React.useState('');
    const [accountType, setAccountType] = React.useState('');
    const [history, setHistory] = React.useState([
        {
            compnany_name: 'Company 01',
            account_type: 'admin',
            user_name: 'User 01',
            email: 'user01@gmail.com',
            employee_number: 25,
            employee_id: 101
        }
    ]);

    const handleSubmitCompany = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            company_name: data.get("company_name"),
            account_type: data.get("account_type"),
            email: data.get("email"),
        });
        setHistory([
            ...history,
            {
                compnany_name: data.get("company_name"),
                account_type: data.get("account_type"),
                user_name: data.get("email"),
                email: data.get("email"),
                employee_id: 101
            },
        ]);
    };

    const navigate = useNavigate();

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
                            <MenuItem value={"system admin"}>System Admin</MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ height: 20, }} />
                    <FormControl fullWidth>
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
                            <MenuItem value={"company_1"}>Company 1</MenuItem>
                            <MenuItem value={"company_2"}>Company 2</MenuItem>
                            <MenuItem value={"company_3"}>Company 3</MenuItem>
                        </Select>
                    </FormControl>
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
                            <TableCell>Company Name</TableCell>
                            <TableCell>Account Type</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((row) => (
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
                                <TableCell><Button variant="text">Requesting</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
