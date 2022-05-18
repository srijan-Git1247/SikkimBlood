import Link from "next/link";
import styles from "../styles/Header.module.css";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  const { user,logout } = useContext(AuthContext);
  //console.log(user);
  //console.log(user);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <Image
              src="/images/heart-attack.png"
              alt=""
              width="32"
              height="32"
            />
            Sikkim Blood
          </a>
        </Link>
      </div>
      
      <nav>
        <ul
          className={
            isOpen === false
              ? styles.navmenu
              : styles.navmenu + " " + styles.active
          }
        >
          <li>
            <Link href="/about">
              <a
                className={
                  isOpen === false
                    ? styles.navlink
                    : styles.navlink + " " + styles.active
                }
                onClick={openMenu}
              >
                About
              </a>
            </Link>
          </li>
          <li>
            <Link href="/requests">
              <a
                className={
                  isOpen === false
                    ? styles.navlink
                    : styles.navlink + " " + styles.active
                }
                onClick={openMenu}
              >
                Active Requirements
              </a>
            </Link>
          </li>
          <li>
            <Link href="/camps">
              <a
                className={
                  isOpen === false
                    ? styles.navlink
                    : styles.navlink + " " + styles.active
                }
                onClick={openMenu}
              >
                Blood Donation Camps
              </a>
            </Link>
          </li>
          {user?(<><li>
            <Link href="/requests/add">
              <a
                className={
                  isOpen === false
                    ? styles.navlink
                    : styles.navlink + " " + styles.active
                }
                onClick={openMenu}
              >
                Put a Request
              </a>
            </Link>
          </li> <li>
            <Link href="/account/profile">
              <a
                className={
                  isOpen === false
                    ? styles.navlink
                    : styles.navlink + " " + styles.active
                }
                onClick={openMenu}
              >
                <FaUserCircle className={styles.ico} />
              </a>
            </Link>
          </li> <li>
          
          <button
            className={
              isOpen === false
                ? "btn-secondary" + " " + "btn-icon"
                : styles.navlink +
                  " " +
                  styles.active +
                  " " +
                  "btn-secondary " +
                  " " +
                  "btn-icon"
            }
            onClick={logout} 
            id="main"
          >
            <FaSignOutAlt></FaSignOutAlt>Sign Out
          </button>
       
      </li></>):(<><li>
            <Link href="/account/login">
              <button
                className={
                  isOpen === false
                    ? "btn-secondary" + " " + "btn-icon"
                    : styles.navlink +
                      " " +
                      styles.active +
                      " " +
                      "btn-secondary " +
                      " " +
                      "btn-icon"
                }
                onClick={openMenu}
                id="main"
              >
                <FaSignInAlt />
                Sign In
              </button>
            </Link>
          </li></>)}
          
         
         
          
        </ul>
        <button
          className={
            isOpen === false
              ? styles.hamburger
              : styles.hamburger + " " + styles.active
          }
          onClick={openMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </nav>
    </header>
  );
}
