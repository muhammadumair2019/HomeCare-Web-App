import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Home/Home.css'
import logo from '../../Assets/Images/logo.png'
import homeimage from '../../Assets/Images/homeimage.png'
import firstimg from '../../Assets/Images/firstimg.jpg'
import secondimg from '../../Assets/Images/secondimg.jpg'
import thirdimg from '../../Assets/Images/thirdimg.jpg'
import fourthimg from '../../Assets/Images/fourthimg.jpg'
import fifthimg from '../../Assets/Images/fifthimg.jpg'

function Home(props) {

  
  const user = localStorage.getItem("token");
  console.log(user)
    return (
        <div>
        
        <nav className="navbar navbar-style">
            <div className="container">
                <div className="navbar-header">
                    <img src={logo} className="logo" alt='error'/>
                    <h2 style={{marginTop: 10, marginLeft: 3}}>HomeCare</h2>
                </div>
                <div>
                  <nav className="navbar navbar-expand-lg navbar-light ">
                    <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <div className="buttons">
                         <Link to='/'><Button  type='button' className="btn btn-outline-dark">Home</Button></Link> 
                        </div>
                      {!user ? (
                        <div className="buttons">
                          <Link  to='/Login'><Button type='button' className="btn btn-outline-dark">Login/Signup</Button></Link> 
                        </div>
                      ) : (
                        <div className="buttons">
                        <Link  to='/UserPanel/feed'><Button type='button' className="btn btn-outline-dark">User Panel</Button></Link> 
                      </div>
                      )}
                      
                        <div className="buttons">
                            <Link to='/AdminLogin'><Button type='button' className="btn btn-outline-dark">Admin Login</Button></Link> 
                          </div>

                          <div className="buttons">
                           <Link to='/Contact'><Button type='button' className="btn btn-outline-dark"> Contact</Button></Link> 
                           </div>
                      </ul>
                    </div>
                  </nav>
                </div>
            </div>

        </nav>

        <div className="container">
            <div className="row">
                <div className="col-sm-6 leftarea">
                    <h1>Your Home Our Home!</h1>
                    <h2 style={{marginTop: 30}}>Never Worry, Find Quickly</h2>
                    <p style={{marginTop: 30}}>
                        Are you tired of searching for a perfect home Caretaker?
                        You have come to the right place!
                    </p>

                    { !user ?  (
                    <div className="buttons">
                      <Link to='/Login' ><button type="button" className="btn btn-outline-dark">Login</button></Link> 
                      <Link to='/Signup'><button type="button" className="btn btn-dark" style={{marginLeft: 20}}>Signup</button></Link> 
                        
                    </div>
                    ) : (
                      <div className="buttons">
                      <Link to='/UserPanel/feed' ><button type="button" className="btn btn-outline-dark">Go to User Panel</button></Link> 
                        
                    </div>
                    )
                    }
                    
                </div>
                <div className="col-sm-6">
                    <img src={homeimage} className="img-responsive homeimg" alt='error'/>
                </div>
            </div>    
            </div>

              <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={firstimg} className="d-block w-100" alt="error"/>
                  </div>
                  <div className="carousel-item">
                    <img src={secondimg} className="d-block w-100" alt="error"/>
                  </div>
                  <div className="carousel-item">
                    <img src={thirdimg} className="d-block w-100" alt="error"/>
                  </div>
                  <div className="carousel-item">
                    <img src={fourthimg} className="d-block w-100" alt="error"/>
                  </div>
                  <div className="carousel-item">
                    <img src={fifthimg} className="d-block w-100" alt="error"/>
                  </div>
                </div>
              </div>

              <div className="row bg-success" style={{padding: 50}}>
                <div className="col-md-3">
                  <div className="card" style={{width: '18rem'}}>
                    <div className="card-body bg-white">
                      <h5 className="card-title">Bashir Khan</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Driver</h6>
                      <p className="card-text">I can drive your car with utmost care. I was an army driver and i am very expirienced.</p>
                      <p>2 Listings</p>
                    </div>
                  </div>
              </div>

              <div className="col-md-3">
                <div className="card" style={{width: '18rem'}}>
                  <div className="card-body bg-white">
                    <h5 className="card-title">Aslam Arif</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Cook</h6>
                    <p className="card-text">I can cook delicious food for you in very less. I am professional and have worked at many places</p>
                    <p>5 Listings</p>
                  </div>
                </div>
            </div>

              <div className="col-md-3">
                <div className="card" style={{width: '18rem'}}>
                  <div className="card-body">
                    <h5 className="card-title">Khurshid Alam</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Gardener</h6>
                    <p className="card-text">I will be responsible for performing ongoing landscaping tasks, as well as routine maintenance of all landscaping equipment.</p>
                    <p>2 Listings</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card" style={{width: '18rem'}}>
                  <div className="card-body">
                    <h5 className="card-title">Irshad Bibi</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Cleaner</h6>
                    <p className="card-text">I can clean your house very efficiently. I have Swept and mopped floors, washed walls and windows and emptied trash cans</p>
                    <p>5 Listings</p>
                  </div>
                </div>
              </div>
            </div>
              
    
     <div className="footer">
      <p>© 2020 Copyright: Homecare.com</p>
      
    </div> 

        </div>
    
    );
}

export default Home;