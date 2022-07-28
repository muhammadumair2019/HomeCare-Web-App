import * as React from 'react';
import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled,TextField } from '@mui/material'
import { getAdminAds, deleteAdminAd } from '../Service/api';
import { Link } from 'react-router-dom';
import { Card, Modal } from 'react-bootstrap';
import moment from 'moment'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Bars } from  'react-loader-spinner'


const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const AdminControlAds = () => {

    const [open, setOpen] = React.useState(false);
    const [isLoading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseDeleteBox = () => {
      setOpen(false);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [ads, setAds] = useState([]);
    const [contact, setContact] = useState('');

    useEffect(() => {
        getAllAds();
    },[]);

    const deleteAdData = async (id) => {
        await deleteAdminAd(id); 
        getAllAds();
    }


    const getAllAds = async () => { 
        let response = await getAdminAds();
        setAds(response.data);
        setLoading(false)
    }


    return isLoading ? <div style={{marginTop:250,marginLeft:700}}><Bars color="#00BFFF" height={80} width={80} /></div> : (
       
        
        
        <div>
            <TextField id="outlined-basic" label="Search" onChange={(event)=>{setSearchTerm(event.target.value)}} variant="outlined" sx={{width:500,marginTop:5,marginLeft:60}}/>
            <div className='row' style={{padding:50}}>
            
            { 
                ads.filter((ad)=>{
                    if (searchTerm == '') {
                        return ad
                    } else if (ad.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return ad
                    }
                }).sort((ad) => {
                    
                }).map((ad) => ( 

                    
                       <div className='col-md-4'>
                            <Card style={{ width: '25rem' ,marginBottom:15}}>
                                <Card.Body>
                                    <Card.Title>{ad.name}</Card.Title>                                  
                                    <Card.Subtitle className="mb-2 text-muted">{ad.title}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted" style={{fontSize: 12,color:'green'}}>{moment(ad.date).fromNow()}</Card.Subtitle>
                                    <Card.Text>
                                    {ad.description}
                                    </Card.Text>
                                    <Card.Text>
                                    <div style={{display:'flex'}}><p style={{fontWeight:'bold'}}>Price: ${ad.price} </p> <p style={{marginLeft:3,fontSize:14,marginTop:2.5}}>/Hr</p></div>
                                    </Card.Text>

                                   
                                     
                                    <Button color="warning" variant="contained" style={{marginRight:10,height:30,width:60}} onClick={() => deleteAdData(ad._id)}>Delete</Button> 
                                   
                                     {/* <div>
                            
                                    <Dialog
                                        open={open}
                                        onClose={handleCloseDeleteBox}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                        {"Delete Ad"}
                                        </DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Are you sure you want to delete your Ad?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleCloseDeleteBox}>Cancel</Button>
                                        <Button onClick={(e) => doublefunction2(ad._id)} autoFocus>
                                            Delete
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                    </div> */}
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                                    
                                                                       
                                        
                                    
                                
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Contact</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>{contact}</Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    
                                    
                                </Card.Body>
                            </Card>
                        </div>

                    
                    
                    
                ))
            } 

            </div>
        </div>
        
        
    )
}

export default AdminControlAds;