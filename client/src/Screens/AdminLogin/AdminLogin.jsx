import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../Styles/AdminLogin.module.css";
import { Bars } from  'react-loader-spinner'


const AdminLogin = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	
    const [isLoading, setLoading] = useState(false)

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const admin = {
		email:data.email,
		password:data.password,
		isAdmin: true
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true)
			const url = "http://localhost:8080/adminauth";
			const { data: res } = await axios.post(url, admin);
			
			setLoading(false)
			window.location = "/AdminPanel/AllAds";
		} catch (error) {
			setLoading(false)
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return isLoading ? <div style={{marginTop:250,marginLeft:700}}><Bars color="#00BFFF" height={80} width={80} /></div> : (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{/* <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "0 15px" }}>Forgot Password ?</p>
						</Link> */}
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1 style={{marginLeft:70}}>Manage Website</h1>
					
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;