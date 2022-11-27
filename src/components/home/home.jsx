import React from "react";
import circle from "../../assets/img/circle.svg";
import triplephone from "../../assets/img/triplephone.svg";
import "./home.scss";

function Home() {
  return (
    <section className="home" id="beranda">
      <div className="left">
        <h1>DIGO (DIGital Outlet)</h1>
        <p>
          Kami hadir sebagai solusi Anda dalam hal menambah pemasukan dengan
          menjual seperti, pulsa, paket data, token listrik, dll. Anda dapat
          mengatur keuntungan sendiri. Mari gabung sebagai SOMI (SObat MItra)
          kami di DIGO.
        </p>
        <button>Download app</button>
      </div>
      <div className="right">
        <img className="circle" src={circle} alt="circle" />
        <img className="triplephone" src={triplephone} alt="triplephone" />
      </div>
    </section>
  );
}

export default Home;
