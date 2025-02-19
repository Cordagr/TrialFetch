import { Link } from "react-router-dom";
import Trails from "../Trail/Trail";

function Header() {

	return (
		<>
		{/* Import fas fa-trail icon */}
		<link
  			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  			rel="stylesheet"/>

			<div className="header">
				<div className="logo">
					<Link to="/">
						<img src="/icons/Trail Realm Logo Copy.png" alt="logo" />
					</Link>
				</div>
				<div className="small-logo">
					<Link to="/">
						<img src="/icons/TR_Logo_Small.png" alt="logo" />
					</Link>
				</div>
				<Trails />
				<div className="user-section">
				<Link to="/dashboard">
					<button>
						<img src="/icons/user-line.svg" alt="user icon" />
					</button>
				</Link>
			</div>
			</div>
		</>
	);
}

export default Header;
