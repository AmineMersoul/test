import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';

export default function User() {

    const location = useLocation();
    const [name, setName] = React.useState(location.state.name);
    const [name_katakana, setNameKatakana] = React.useState(location.state.name_katakana);
    const [employee_number, setEmployeeNumber] = React.useState(location.state.employee_number);
    const [department, setDepartment] = React.useState(location.state.department);
    const [email, setEmail] = React.useState(location.state.email);
    const [phone_number, setPhoneNumber] = React.useState(location.state.phone_number);
    const [address, setAddress] = React.useState(location.state.address);
    const [postal_code, setPostalCode] = React.useState(location.state.postal_code);
    const [date_of_birth, setDateOfBirth] = React.useState(location.state.date_of_birth);
    const [remark, setRemark] = React.useState(location.state.remark);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            name: data.get('name'),
            name_katakana: data.get('name_katakana'),
            employee_number: data.get('employee_number'),
            department: data.get('department'),
            email: data.get('email'),
            phone_number: data.get('phone_number'),
            address: data.get('address'),
            postal_code: data.get('postal_code'),
            date_of_birth: data.get('date_of_birth'),
            remark: data.get('remark'),
        });
        navigate("/dashboard");
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="name"
                            label="Name"
                            autoComplete="email"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name_katakana"
                            name="name_katakana"
                            label="Name Katakana"
                            type="text"
                            autoComplete="name_katakana"
                            value={name_katakana}
                            onChange={(e) => setNameKatakana(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="employee_number"
                            name="employee_number"
                            label="Employee Number"
                            type="text"
                            autoComplete="employee_number"
                            value={employee_number}
                            onChange={(e) => setEmployeeNumber(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="department"
                            name="department"
                            label="Department"
                            type="text"
                            autoComplete="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="E-Mail Adresse"
                            type="text"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone_number"
                            name="phone_number"
                            label="Phone Number"
                            type="text"
                            autoComplete="phone_number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            type="text"
                            autoComplete="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="postal_code"
                            name="postal_code"
                            label="Postal Code"
                            type="text"
                            autoComplete="postal_code"
                            value={postal_code}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="date_of_birth"
                            name="date_of_birth"
                            label="Date of Establishment"
                            type="text"
                            autoComplete="date_of_birth"
                            value={date_of_birth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="remark"
                            name="remark"
                            label="Remark"
                            type="text"
                            autoComplete="remark"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://i.pravatar.cc/300"
                        sx={{ mx: "auto", width: 200, height: 200 }}
                    />
                    <Button variant="text">Image</Button>
                </Grid>
            </Grid>
        </div>
    )
}