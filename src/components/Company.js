import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Company() {

    const api = axios.create({
        baseURL: `http://localhost:4000`,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });

    const location = useLocation();
    const company_id = location.state.id;
    const [company_name, setCompanyName] = React.useState(location.state.company_name);
    const [company_name_katakana, setCompanyNameKatakana] = React.useState(location.state.company_name_katakana);
    const [address, setAddress] = React.useState(location.state.address);
    const [postal_code, setPostalCode] = React.useState(location.state.postal_code);
    const [phone_number, setPhoneNumber] = React.useState(location.state.phone_number);
    const [email, setEmail] = React.useState(location.state.email);
    const [website, setWebsite] = React.useState(location.state.website);
    const [date_of_establishment, setDateOfEstablishment] = React.useState(new Date(location.state.date_of_establishment).toLocaleDateString("en-US"));
    const [remark, setRemark] = React.useState(location.state.remark);
    const [profileImage, setProfileImage] = React.useState(location.state.profile_image);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            company_name: data.get('company_name'),
            company_name_katakana: data.get('company_name_katakana'),
            address: data.get('address'),
            postal_code: data.get('postal_code'),
            phone_number: data.get('phone_number'),
            email: data.get('email'),
            website: data.get('website'),
            date_of_establishment: date_of_establishment,
            remark: data.get('remark'),
        });

        if (location.state.method == 'add') {
            api.post('/addcompany', {
                id: location.state.id,
                company_name: data.get('company_name'),
                company_name_katakana: data.get('company_name_katakana'),
                address: data.get('address'),
                postal_code: data.get('postal_code'),
                phone_number: data.get('phone_number'),
                email: data.get('email'),
                website: data.get('website'),
                date_of_establishment: date_of_establishment,
                remark: data.get('remark')
            }).then((res) => {
                console.log(res);
                navigate("/");
            }).catch((err) => {
                console.log(err.response);
            });
        } else {
            api.post('/updatecompany', {
                id: location.state.id,
                company_name: data.get('company_name'),
                company_name_katakana: data.get('company_name_katakana'),
                address: data.get('address'),
                postal_code: data.get('postal_code'),
                phone_number: data.get('phone_number'),
                email: data.get('email'),
                website: data.get('website'),
                date_of_establishment: date_of_establishment,
                remark: data.get('remark')
            }).then((res) => {
                console.log(res);
                navigate("/");
            }).catch((err) => {
                console.log(err.response);
            });
        }
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    function uploadImage(file) {
        if (location.state.method == 'add') {
            console.log("create company first then upload image later!");
        } else {
            let data = new FormData();
            data.append('profileImage', file, file.name);
            data.append('id', company_id);
            api.post('/uploadcompanyimage', data, {
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
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="company_name"
                            label="Company Name"
                            autoComplete="email"
                            value={company_name}
                            onChange={(e) => setCompanyName(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="company_name_katakana"
                            name="company_name_katakana"
                            label="Company Name Katakana"
                            type="text"
                            autoComplete="company_name_katakana"
                            value={company_name_katakana}
                            onChange={(e) => setCompanyNameKatakana(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            type="text"
                            autoComplete="complete"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="postal_code"
                            name="postal_code"
                            label="Postal Code"
                            type="text"
                            autoComplete="complete"
                            value={postal_code}
                            onChange={(e) => setPostalCode(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone_number"
                            name="phone_number"
                            label="Phone Number"
                            type="text"
                            autoComplete="complete"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label="E-Mail Adresse"
                            type="text"
                            autoComplete="complete"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="website"
                            name="website"
                            label="Website"
                            type="text"
                            autoComplete="complete"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disabled={location.state.type == 'user' ? true : false}
                                margin="normal"
                                required
                                fullWidth
                                id="date_of_establishment"
                                name="date_of_establishment"
                                label="Date of Establishment"
                                value={date_of_establishment}
                                onChange={(newValue) => {
                                    setDateOfEstablishment(new Date(newValue).toLocaleDateString("en-US"));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="remark"
                            name="remark"
                            label="Remark"
                            type="text"
                            autoComplete="complete"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            disabled={location.state.type == 'user' ? true : false}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={location.state.type == 'user' ? true : false}
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
                    {location.state.type == 'user' ? null : <Button variant="text" component="label">Image
                        <input type="file"
                            hidden accept=".gif,.jpg,.jpeg,.png"
                            onChange={(e) => { uploadImage(e.target.files[0]) }}
                        />
                    </Button>}
                </Grid>
            </Grid>
        </div>
    )
}
