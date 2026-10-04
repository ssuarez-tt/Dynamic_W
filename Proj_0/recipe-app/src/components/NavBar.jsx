import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <aside className="appSidebar">
      <NavLink className="sidebarBrand" to="/" end>Recipe App</NavLink>
      <nav className="sidebarNav" aria-label="Recipe pages">
        <p className="sidebarLabel">Pages</p>
        <ul>
          <li><NavLink to="/" end>Connected recipes</NavLink></li>
          <li><NavLink to="/button">Button recipe</NavLink></li>
          <li><NavLink to="/accordion">Accordion recipe</NavLink></li>
          <li><NavLink to="/panel">Panel</NavLink></li>
          <li><NavLink to="/dropdown">Dropdown</NavLink></li>
          <li><NavLink to="/modal">Modal</NavLink></li>
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar