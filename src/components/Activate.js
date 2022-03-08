import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Activate() {

    const api = axios.create({
        baseURL: `http://localhost:4000/`,
    });

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const email = searchParams.get('email');
        const activation = searchParams.get('activation')
        if (email == null || activation == null) {
            navigate('/login');
        }
        console.log(activation, email);
        api.post('/getunactiveaccount', {
            email: email,
            activation: activation
        }).then(res => {
            console.log(res.data);
            if (res.data.active == 0) {
                setUserId(res.data.id);
                setEmail(res.data.email);
            } else {
                navigate('/login');
            }
        }).catch((err) => {
            console.log(err.response);
            navigate('/login');
        });
    }, []);

    const [user_id, setUserId] = React.useState(-1);
    const [name, setName] = React.useState('');
    const [name_katakana, setNameKatakana] = React.useState('');
    const [employee_number, setEmployeeNumber] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone_number, setPhoneNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [postal_code, setPostalCode] = React.useState('');
    const [date_of_birth, setDateOfBirth] = React.useState('');
    const [remark, setRemark] = React.useState('');
    const [profileImage, setProfileImage] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
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
        api.post('/activateaccount', {
            id: user_id,
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
            password: password
        }).then((res) => {
            console.log(res);
            navigate("/login");
        }).catch((err) => {
            console.log(err.response);
        });
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function uploadImage(file) {
        let data = new FormData();
        data.append('profileImage', file, file.name);
        data.append('id', user_id);
        api.post('/uploadaccountimage', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data.file);
            setProfileImage(res.data.file);
        }).catch((err) => {
            console.log(err.response);
        });
    }

    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                                label="Date of Birth"
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            src={profileImage}
                            sx={{ mx: "auto", width: 200, height: 200 }}
                        />
                        <Button variant="text" component="label">Image
                            <input type="file"
                                hidden accept=".gif,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    console.log(e.target.files[0]);
                                    uploadImage(e.target.files[0]);
                                }}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
