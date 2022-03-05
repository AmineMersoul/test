import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Company() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="adress"
                            name="adress"
                            label="Adress"
                            type="text"
                            autoComplete="complete"
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
