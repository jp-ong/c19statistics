import React from "react";
import styles from "styles/modules/Navbar.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = ({ navtext }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <nav className={styles.nav}>
      <div className={styles.navleft}>
        <div>
          <Link href="/">
            <a>
              <h1>
                COVID<b>19</b>
                <span>{navtext}</span>
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
          <span>{time.toLocaleString()}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
