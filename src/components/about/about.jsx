import React from "react";
import backgroundphone from "../../assets/img/backgroundphone.svg";
import phone from "../../assets/img/phone.svg";
import "./about.scss";

function About() {
  const Card = ({ title, paragraph }) => (
    <div className="card">
      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
  return (
    <section className="about" id="tentang">
      <img
        className="backgroundphone"
        src={backgroundphone}
        alt="backgroundphone"
      />
      <div className="left">
        <img className="phone" src={phone} alt="phone" />
      </div>
      <div className="right" data-aos="slide-left" data-aos-duration="2000">
        <h1>DIGO app itu apasih?</h1>
        <p>
          Aplikasi ini merupakan aplikasi agen penjualan berupa pulsa, paket
          data, pembayaran listrik, pembelian token listrik, dll. So... aplikasi
          ini memudahkan sekali bukan? Jelas.
        </p>
        <Card
          title="Sssstttt..... ada reward juga buat SOMI"
          paragraph="Reward dapat ditukarkan dengan koin yang SOMI dapet nihhhh.... dari
        penjualan SOMI dan misi yang SOMI lakuin. Enak banget kan...... udah
        dapet CUAN tambahan dapat pula reward. Yakin masih ga mau gabung???
        Rewardnya macem-macem yakin tambah ga mau gabung??"
        />
        <Card
          title="SOMI bisa mengatur cuanmu sendiri lohhhh!!!"
          paragraph="Aplikasi yang menguntungkan banget ga sih????? Setiap pembelian SOMI
        sebagai agen disini bisa ngatur nih keuntungan yang mau SOMI dapetin
        per transaksi nya. CUANNN banget sih ini"
        />
      </div>
    </section>
  );
}

export default About;
