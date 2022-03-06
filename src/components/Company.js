import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Company() {

    const location = useLocation();
    const [company_name, setCompanyName] = React.useState(location.state.company_name);
    const [company_name_katakana, setCompanyNameKatakana] = React.useState(location.state.company_name_katakana);
    const [address, setAddress] = React.useState(location.state.address);
    const [postal_code, setPostalCode] = React.useState(location.state.postal_code);
    const [phone_number, setPhoneNumber] = React.useState(location.state.phone_number);
    const [email, setEmail] = React.useState(location.state.email);
    const [website, setWebsite] = React.useState(location.state.website);
    const [date_of_establishment, setDateOfEstablishment] = React.useState(location.state.date_of_establishment);
    const [remark, setRemark] = React.useState(location.state.remark);

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
            date_of_establishment: data.get('date_of_establishment'),
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
                            name="company_name"
                            label="Company Name"
                            autoComplete="email"
                            value={company_name}
                            onChange={(e) => setCompanyName(e.target.value)}
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
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="date_of_establishment"
                            name="date_of_establishment"
                            label="Date of Establishment"
                            type="text"
                            autoComplete="complete"
                            value={date_of_establishment}
                            onChange={(e) => setDateOfEstablishment(e.target.value)}
                        />
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
