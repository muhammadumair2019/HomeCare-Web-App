import styles from "../Styles/Main.module.css";
import NavBar from "./NavBar";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			
			
			<NavBar/>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			
		</div>
	);
};

export default Main;