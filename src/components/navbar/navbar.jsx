import React from "react";
import logo from "../../assets/img/logo.svg";
import "./navbar.scss";

function Navbar() {
  window.onload = function () {
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".right a[href*=" + sectionId + "]")
            .classList.add("active");
        } else {
          document
            .querySelector(".right a[href*=" + sectionId + "]")
            .classList.remove("active");
        }
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="left">
        <img src={logo} alt="logo" />
      </div>
      <div className="right">
        <a className="nav" href="#beranda">
          Beranda
        </a>
        <a className="nav" href="#tentang">
          Tentang
        </a>
        <a className="nav" href="#fitur">
          Fitur
        </a>
        <a className="nav" href="#kontak">
          Kontak
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
