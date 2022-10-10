import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navbarData = ['Names & Faces', 'Words', 'Flash Cards']
  const navbarLinks = ['/', '/words', 'flash-cards']

  const [activeNavbars, setActiveNavbars] = useState<boolean[]>(() =>
    Array(navbarData?.length).fill(false),
  )

  return (
    <div className="navbar">
      <div className="container">
        <ul className="navbar-items">
          {navbarData.map((el, index) => (
            <Link
              key={index}
              to={navbarLinks[index]}
              style={{
                textDecoration: 'none',
                backgroundColor: activeNavbars[index] ? 'red' : 'transparent',
                pointerEvents: activeNavbars[index] ? 'none' : 'auto',
                padding: '.5rem',
              }}
              onClick={() =>
                setActiveNavbars(
                  activeNavbars.map(
                    (_, activeNavbarIndex) =>
                      activeNavbarIndex === index && !activeNavbars[index],
                  ),
                )
              }
            >
              <li className="navbar-item">{el}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Navbar
