import { Link, NavLink } from "react-router-dom";
import logo from "../assets/header-logo.png";
import HeaderSearch from "./HeaderSearch";
import { useSelector } from "react-redux";
import type { RootState } from "../shared/model/store";

export default function Header() {
    const { count } = useSelector((state: RootState) => state.cart);

    return(
        <header className="container">
            <div className="row">
                <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <Link className="navbar-brand" to={"/"}>
                        <img src={logo} alt="Bosa Noga" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/"}>Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/catalog"}>Каталог</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/about"}>О магазине</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/contacts"}>Контакты</NavLink>
                        </li>
                    </ul>
                    <div>
                        <div className="header-controls-pics">
                            { <HeaderSearch /> }
                            <Link className="header-controls-pic header-controls-cart" to={'/cart'}>
                                {count > 0 &&
                                <div className="header-controls-cart-full">{count}</div>
                                }                                
                                <div className="header-controls-cart-menu"></div>
                            </Link>
                        </div>
                    </div>
                    </div>
                </nav>
                </div>
            </div>
        </header>
    )
}