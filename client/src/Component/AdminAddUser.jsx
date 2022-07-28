import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { AddUser} from '../Service/api';
import { useNavigate } from 'react-router-dom';



const initialValue = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AdminAddUser = () => {
    

    const [user, setUser] = useState(initialValue);
    const {firstName, lastName, email,password } = user;
    const [error, setError] = useState("");

    

    let navigate = useNavigate();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    
    // const newpost = {
    //     name: user_name,
    //     title:post.title,
    //     description:post.description,
    //     phone:post.phone,
    //     price:post.price,
    //     userid: user_id
    // }
    
    console.log(user)

    const Adduser = async() => {
        try {
        await AddUser(user);
        navigate('/AdminPanel/AllUsers');
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

    return (
        
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">First Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='firstName' value={firstName} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Last Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='lastName' value={lastName} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='password' value={password} id="my-input" />
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
                <Button variant="contained" color="primary" onClick={() => Adduser()}>Add User</Button>
            </FormControl>
        </Container>
     
    )
}

export default AdminAddUser;