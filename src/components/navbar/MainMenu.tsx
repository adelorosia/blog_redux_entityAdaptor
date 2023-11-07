import { NavLink } from "react-router-dom"

const MainMenu = () => {
  return (
    <nav className="container px-5">
        <ul className="flex gap-6 font-Viga uppercase">
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/create-blog'>Create Blog</NavLink></li>
            <li><NavLink to='/author'>Authors</NavLink></li>
        </ul>
    </nav>
  )
}

export default MainMenu