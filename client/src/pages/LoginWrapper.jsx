import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { testAtom } from "../atoms/testAtom";
import { useEffect, useState } from "react";
/**
 * LoginWrapper component checks if the user is logged in
 * and redirects to the login page if not.
 * @param {object} props - The component props
 * @param {ReactNode} props.children - The children components to render if logged in
 * @returns {JSX.Element|null} - The rendered component or null if loading
 */// LoginWrapper component checks if the user is logged in
  // and redirects to the login page if not.

export function LoginWrapper(props) {
	const [user] = useAtom(testAtom);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// we fetch local storage on mount
		if (user !== undefined) {
			setLoading(false); //user data is ready
		}
	}, [user]);

	if (loading) {
		return null;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	return props.children;
}

LoginWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};
