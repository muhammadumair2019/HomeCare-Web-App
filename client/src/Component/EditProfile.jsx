import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { edituser } from '../Service/api';


const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const user = JSON.parse(localStorage.getItem("token"))
    
const user_id = user?.user?._id
console.log(user?.user?._id)

// let firstname = user?.user?.firstName
// var lastname = user?.user?.lastName
// var email = user?.user?.email

// const updateduser = {
//     firstname: user?.user?.firstName,
//     lastname : user?.user?.lastName,
//     email: user?.user?.email
// }

// const initialValue = {
//     firstname: '',
//     lastname: '',
//     email: '',
// }


const EditAd = () => {
    const [updateuser, setUpdateuser] = useState();
    const [error, setError] = useState("");
    
    let navigate = useNavigate();

    const deletelocal = () => {
        var token = JSON.parse(localStorage.getItem("token"));
        delete(token.user)
        console.log(token)
        var items = JSON.stringify(token);
        localStorage.setItem("token", items);
      }
    //   const gettokenonly = () => {
    //     var token = JSON.parse(localStorage.getItem("token"));
    //     delete(token.user)
    //     return token
    //   }


    const editAdDetails = async() => {
        try{
            deletelocal()
        const {data:response} = await edituser(user_id, updateuser);
        localStorage.setItem("token", JSON.stringify({user:response.user}));
        window.location = "/UserPanel/Profile";
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
        setUpdateuser({...updateuser, [e.target.name]: e.target.value})
    }

    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Information</Typography>

            <FormControl>
                <InputLabel htmlFor="my-input">First Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='firstName'  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Last Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='lastName'  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email'  id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            {/* {error && <div style={{
                width: 800,
                padding: 15,
                // marginLeft:200,
                fontSize: 12,
                backgroundColor: '#FF7F7F',
                color: 'white',
                borderRadius: 5,
                textAlign: 'center',
            }}>{error}</div>} */}
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editAdDetails()}>Save</Button>
            </FormControl>
        </Container>
    )
}

export default EditAd