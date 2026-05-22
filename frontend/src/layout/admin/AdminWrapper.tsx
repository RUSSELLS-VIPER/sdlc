import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const AdminWrapper = () => {
  return (
    <>
    <div className='flex flex-row gap-20 text-black'>
        <Sidebar />
        <div className='flex flex-col'>
            <Navbar />
            <Outlet />
        </div>
    </div>


    </>
  )
}

export default AdminWrapper