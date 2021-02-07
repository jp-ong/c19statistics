import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navleft}>
        <div>
          <Link href="/">
            <a>
              <h1>
                COVID<b>19</b>
                <span>Statistics</span>
              </h1>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.navright}>
        <div>
          <small>By </small>
          <a
            href="https://github.com/jp-ong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>John Paul Ong</b>
          </a>
        </div>
        <div>
          <small>Source </small>
          <a
            href="https://developer.mongodb.com/article/johns-hopkins-university-covid-19-data-atlas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>JHU MongoDB Atlas</b>
          </a>
        </div>
        <div>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
