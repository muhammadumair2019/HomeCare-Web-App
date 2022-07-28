import React from 'react';
import userimg from '../Assets/Images/logo.png'
import back from '../Assets/Images/back.png'
import { Link } from 'react-router-dom';


function Contact(props) {
    
    
    return  (
        
       <div className="container">
        <div><Link to='/'><img src={back} alt='Error' style={{height:35,width:35,marginTop:50,marginLeft:80}}/></Link> </div>
     	<div className="row d-flex justify-content-center">
            <div className="col-md-10 mt-5 pt-5">
             	<div className="row z-depth-3">
                 	<div className="col-sm-4 rounded-left" style={{backgroundColor:'lightblue'}}>
        		        <div className="card-block text-center text-white">
                            <img src={userimg} alt="Error" style={{marginTop:10,height:100,width:100}}/>
                    		<h2 className="font-weight-bold ">Web Tech</h2>
                    		 
                		</div>
            		</div>
            		<div className="col-sm-8 bg-white rounded-right">
                    	<h3 className="mb-8 text-center">Company Information</h3>
                    	<hr className="bg-primary"/>
                   		<div className="row">
                        	<div className="col-sm-6">
                            	<p className="font-weight-bold">Facebook</p>
                           		<h6 className=" text-muted">facebook.com/webtech</h6>
                        	</div>
                        	<div className="col-sm-6">
                            	<p className="font-weight-bold">Wahtsapp</p>
                           		<h6 className="text-muted">+923214634016</h6>
                        	</div>
                    	</div>
                    		
                    		<hr className="bg-primary"/>
                   		<div className="row">
                        	<div className="col-sm-6">
                           		<p className="font-weight-bold">Email</p>
                          	  	<h6 className="text-muted">web@gmail.com</h6>
                        	</div>
                        	<div className="col-sm-6">
                            	<p className="font-weight-bold">Fax</p>
                            	<h6 className="text-muted">#552225</h6>
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

export default Contact;