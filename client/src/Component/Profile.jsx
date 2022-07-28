import React from 'react';
import userimg from '../Assets/Images/user.png'
import updateuser from '../Assets/Images/updateuser.png'
import react, { useState, useEffect } from 'react';
import { getAllFeed } from '../Service/api';
import { Link } from 'react-router-dom';
import { Bars } from  'react-loader-spinner'


function Profile(props) {
    const [ads, setAds] = useState([]);
	
    const [isLoading, setLoading] = useState(true)
    const user = JSON.parse(localStorage.getItem("token"))

    const user_id= user?.user?._id;
	const firstname = user?.user?.firstName
	const lastname = user?.user?.lastName
	const email = user?.user?.email

    useEffect(() => {
        getAllAds();
    },[]);

    const getAllAds = async () => { 
        let response = await getAllFeed();
        setAds(response.data);
		setLoading(false)
    }


	var count = 0
		ads.forEach((e) => {
		console.log(e.userid)
		if (e.userid==user_id) {
			count = count + 1
		} else {
			return null
		}
		
	})

	const handleclick = () => {
		console.log('helo')
	}
    
    return  isLoading ? <div style={{marginTop:250,marginLeft:700}}><Bars color="#00BFFF" height={80} width={80} /></div> : (

       <div className="container">
     	<div className="row d-flex justify-content-center">
            <div className="col-md-10 mt-5 pt-5">
             	<div className="row z-depth-3">
                 	<div className="col-sm-4 rounded-left" style={{backgroundColor:'rgb(198, 67, 67)'}}>
        		        <div className="card-block text-center text-white">
                            <img src={userimg} alt="Error" style={{marginTop:10}}/>
                    		<h2 className="font-weight-bold ">{firstname + ' ' + lastname}</h2>
                    		<p>{count} Listings</p> <Link to='/UserPanel/edituser'><img src={updateuser} alt='Error' style={{height:35,width:35,}}/></Link> 
                		</div>
            		</div>
            		<div className="col-sm-8 bg-white rounded-right">
                    	<h3 className="mb-8 text-center">Information</h3>
                    	<hr className="bg-primary"/>
                   		<div className="row">
                        	<div className="col-sm-6">
                            	<p className="font-weight-bold">First Name</p>
                           		<h6 className=" text-muted">{firstname}</h6>
                        	</div>
                        	<div className="col-sm-6">
                            	<p className="font-weight-bold">Last Name</p>
                           		<h6 className="text-muted">{lastname}</h6>
                        	</div>
                    	</div>
                    		
                    		<hr className="bg-primary"/>
                   		<div className="row">
                        	<div className="col-sm-6">
                           		<p className="font-weight-bold">Email</p>
                          	  	<h6 className="text-muted">{email}</h6>
                        	</div>
                        	<div className="col-sm-6">
                            	<p className="font-weight-bold">Phone</p>
                            	<h6 className="text-muted">03214634016</h6>
                        	</div>
                    	</div>
                	   	<hr className="bg-primary"/>
                	     
              		</div>
             	</div>
            </div>
        </div>
	</div>
    
    );
}

export default Profile;