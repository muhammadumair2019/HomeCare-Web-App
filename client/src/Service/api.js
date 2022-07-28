import axios from 'axios';

const AdsUrl = 'http://localhost:8080';
const usersUrl = 'http://localhost:8080';

export const getMyAds= async (id) => {
    id = id || '';
    return await axios.get(`${AdsUrl}/${id}`);
}

export const getAllFeed= async (id) => {
    id = id || '';
    return await axios.get(`${AdsUrl}/${id}`);
}

export const postAd = async (post) => {
    return await axios.post(`${AdsUrl}/add`, post);
}

export const deleteAd = async (id) => {
    return await axios.delete(`${AdsUrl}/${id}`);
}

export const editAd = async (id, post) => {
    return await axios.put(`${AdsUrl}/${id}`, post)
}

export const getContact = async (id) => {
    id = id || '';
    return await axios.get(`${AdsUrl}/${id}`);
}

export const edituser = async (id, user) => {
    return await axios.put(`${AdsUrl}/edituser/${id}`, user)
}

export const getAdminAds= async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const deleteAdminAd = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const getUsers = async (id) => {

    return await axios.get(`${usersUrl}/${id}`)
}

export const AddUser = async (post) => {
    return await axios.post(`${usersUrl}/adduser`, post);
}

// export const deleteUser = async (id) => {
//     return await axios.delete(`${usersUrl}/${id}`);
// }