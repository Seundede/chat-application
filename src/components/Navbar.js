import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { auth, db } from '../firebase'



const Navbar = () => {
  const navigate = useNavigate();
    const { user } = useContext( AuthContext )
    const handleSignOut = async () => {
        await updateDoc(doc(db,'users', auth.currentUser.uid), {
            isOnline: false
        })
        await signOut(auth)
        navigate('/login')
    }
    return (
      <nav>
        <h3>
          <Link to="/">YouChat</Link>
        </h3>
        <div>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
          
              <button className="btn" onClick={handleSignOut}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>
    );
}

export default Navbar
