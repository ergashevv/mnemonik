import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <>
      <div className='sidebar'>
        <div className="sidebar-items">
            <Link to="/dashboard/user-profile">
                User Profile
            </Link>
        </div>
      </div>
    </>
  )
}
export default Sidebar
