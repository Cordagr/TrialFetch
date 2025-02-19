import Title from "./Title";
import UserName from "./UserName";
import Email from "./Email";
import Password from "./Password";
import { testAtom } from "../../atoms/testAtom";
import { useAtom } from "jotai";

function Security() {
	// atom calls the details in the user object
	const [user] = useAtom(testAtom);

	// user info
	console.log("Test Atom object:", user);


	return (
		<div className="security">
			<Title />
			<UserName />
			<Email />
			<Password />
		</div>
	);
}

export default Security;
