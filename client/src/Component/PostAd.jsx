import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { postAd} from '../Service/api';
import { useNavigate } from 'react-router-dom';



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
        margin-top: 20px;
`;

const PostAd = () => {
    

    const [post, setpost] = useState(initialValue);
    const {title, description, phone,price } = post;
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("token"))
    
    const user_id = user?.user?._id
    console.log(user?.user?._id)

    const user_name_first = user?.user?.firstName
    const user_name_last= user?.user?.lastName
    const user_name = user_name_first+' '+user_name_last


    let navigate = useNavigate();

    const onValueChange = (e) => {
        setpost({...post, [e.target.name]: e.target.value})
    }
    
    const newpost = {
        name: user_name,
        title:post.title,
        description:post.description,
        phone:post.phone,
        price:post.price,
        userid: user_id
    }
    
    console.log(newpost)

    const PostAdDetails = async() => {
        try {
        await postAd(newpost);
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

    return (
        
        <Container>
            <Typography variant="h4">Add post</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Price per hour</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='price' value={price} id="my-input" />
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
                <Button variant="contained" color="primary" onClick={() => PostAdDetails()}>Add post</Button>
            </FormControl>
        </Container>
     
    )
}

export default PostAd;