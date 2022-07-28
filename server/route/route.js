import express from 'express';
import { getAds, postAd, getAdById, editAd, deleteAd , getContactbyId,users,auth,getAllFeed,sendPasswordLink,setNewPassword,verifyPasswordResetLink,editUser,adminauth,getAdminAds,deleteAdminAd,AdminAddUsers,getusers} from '../controller/user-controller.js';

const router = express.Router();

router.get('/', getAds);


router.get('/feed', getAllFeed);

router.post('/add', postAd);

router.get('/:id', getAdById);

router.put('/:id', editAd);

router.delete('/:id', deleteAd);

router.get('/:id', getContactbyId);

router.post('/users',users)
router.post('/auth',auth)

router.post('/password-reset/',sendPasswordLink)
router.get('/password-reset/:id',verifyPasswordResetLink)
router.post('/password-reset/:id',setNewPassword)

router.get('/Profile',getAllFeed)
router.put('/edituser/:id', editUser);

router.post('/adminauth',adminauth)

router.get('/AllAds', getAdminAds);
router.delete('/AllAds/:id', deleteAdminAd);

router.get('/AllUsers', getusers);
router.post('/adduser',AdminAddUsers)



export default router;