import { NavLink } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="appNav" aria-label="Recipe pages">
      <NavLink to="/" end>Connected recipes</NavLink>
      <NavLink to="/button">Button recipe</NavLink>
      <NavLink to="/accordion">Accordion recipe</NavLink>
      <NavLink to="/panel">Panel</NavLink>
      <NavLink to="/dropdown">Dropdown</NavLink>
    </nav> 
  )
}

export default NavBar