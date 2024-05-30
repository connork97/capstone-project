import styles from './NavBar.module.css'
import peakSyncLogo from '../images/PeakSync.png';

import { Link, useLocation } from "react-router-dom"
import { useContext, useState, useEffect } from 'react'
import { LoggedInUserContext } from "./App"

import Dropdown from 'react-bootstrap/Dropdown'

const NavBar = () => {

    const { currentUser } = useContext(LoggedInUserContext);
      
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    //   const calendarLinkStyle = isHomePage ? { color: 'white' } : {};
    const [scrollDirection, setScrollDirection] = useState('up');
    const [prevScrollY, setPrevScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {

        const currentScrollY = window.scrollY;
        setScrollDirection(currentScrollY > prevScrollY ? 'down' : 'up');
        setPrevScrollY(currentScrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollY]);

    useEffect(() => {
        const navBarElement = document.getElementById('navBar')
        if (scrollDirection === 'down') {
            navBarElement.style.top = '-7.5vh';
        } else {
            navBarElement.style.top = 0;
        }
    }, [scrollDirection])

    return (
        // <div className={styles.navBarDiv}>
        <div id='navBar' className={`${styles.navBarDiv} ${scrollDirection === 'down' ? 'up' : ''}`}>
            <Link to="/" exact="true" className={`${styles.navBarLink} ${styles.peakSyncLogoNavLink}`}>
                PeakSync
                {/* <img className={`${styles.navBarLink} ${styles.peakSyncLogoNavLink}`} src={peakSyncLogo}></img> */}
            </Link>
            {/* <Link to="/" exact="true" className="navBarLink">Home</Link> */}
            <div className={styles.navWrap}>
            <Link to="/calendar" exact="true" className={styles.navBarLink}>Calendar</Link>
            <Dropdown className={styles.navBarLink}>
                <Dropdown.Toggle className={styles.dropdownToggle}>Rates and Offerings</Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                    <Dropdown.Item className={styles.dropdownItem}>
                        <Link
                            to='/offerings/memberships'
                            exact="true" 
                            className={styles.dropdownLink}
                        >
                            Memberships
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className={styles.dropdownItem}>
                        <Link
                            to='/offerings/classes'
                            exact="true"
                            className={styles.dropdownLink}
                        >
                            Classes
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Link to="/account" exact="true" className={styles.navBarLinkActive}>{Object.keys(currentUser).length ? 'Account' : 'Login'}</Link>
            {currentUser.admin && <Link to="/admin-dashboard" exact="true" className={styles.navBarLinkActive} style={{marginLeft: '50px'}}>Dashboard</Link>}
            </div>
        </div>
    )
}

export default NavBar;