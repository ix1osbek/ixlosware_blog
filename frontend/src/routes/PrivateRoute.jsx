// routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { authAPI } from '../services/authAPI'

const PrivateRoute = ({ children }) => {
	const isAuth = authAPI.isAuthenticated()

	if (!isAuth) {
		return <Navigate to='/login' replace />
	}

	return children
}

export default PrivateRoute
