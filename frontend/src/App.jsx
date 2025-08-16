import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import SearchResults from './pages/SearchResults' // yangi sahifa
import SinglePost from './pages/SinglePost'
import PrivateRoute from './routes/PrivateRoute'

// Layout - Navbar + Public pages
const PublicLayout = () => (
	<>
		<Navbar />
		<Outlet /> {/* shu yerda sahifa contenti chiqadi */}
	</>
)

function App() {
	return (
		<Routes>
			{/* Public routes with Navbar */}
			<Route element={<PublicLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/post/:id' element={<SinglePost />} />
				<Route path='/search' element={<SearchResults />} />{' '}
				{/* bu qo‘shildi */}
			</Route>

			{/* Private (Admin) routes */}
			<Route
				path='/admin'
				element={
					<PrivateRoute>
						<Admin />
					</PrivateRoute>
				}
			/>

			{/* 404 */}
			<Route
				path='*'
				element={<h1 className='text-center text-2xl'>404 Not Found</h1>}
			/>
		</Routes>
	)
}

export default App
