import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getMyAds, editAd } from '../Service/api';

const initialValue = {
    title: '',
    description: '',
    phone: '',
    price: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditAd = () => {
    const [ad, setAd] = useState(initialValue);
    const {title, description, phone,price } = ad;
    const [error, setError] = useState("");
    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        loadAdDetails();
    }, []);

    const loadAdDetails = async() => {
        const response = await getMyAds(id);
        setAd(response.data);
    }

    const editAdDetails = async() => {
        try{
        const response = await editAd(id, ad);
        navigate('/UserPanel/myads');
        } catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setAd({...ad, [e.target.name]: e.target.value})
    }

    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Ad</Typography>

            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Price per hour</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='price' value={price} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            {error && <div style={{
                width: 800,
                padding: 15,
                // marginLeft:200,
                fontSize: 12,
                backgroundColor: '#FF7F7F',
                color: 'white',
                borderRadius: 5,
                textAlign: 'center',
            }}>{error}</div>}
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editAdDetails()}>Edit Ad</Button>
            </FormControl>
        </Container>
    )
}

export default EditAd