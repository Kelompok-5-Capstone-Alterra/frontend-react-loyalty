import React from "react";
import phone from "../../assets/img/phone.svg";
import "./feature.scss";

function Feature() {
  const Card = ({ title, paragraph }) => (
    <div className="card">
      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
  return (
    <section className="feature" id="fitur">
      <div className="left">
        <Card
          title="Riwayat Transaksi"
          paragraph="SOMI bisa lihat transaksi yang udah SOMI lakuin lhoo.. sebagai bukti bahwa SOMI sudah melakukan transaksi."
        />
        <Card
          title="Tukar Hadiah"
          paragraph="SOMI bisa tukar koin SOMI dengan berbagai hadiah yang disediakan DIGO makin untung kan?? PASTI!
Hadiah bisa berupa pulsa/paket data, bisa tarik tunai, bisa juga transfer ke e-Money SOMI"
        />
        <Card
          title="Koin SOMI"
          paragraph="SOMI bisa kumpulin koin dengan cara melakukan transaksi apapun dan nanti bakal dapet KOIN nih... yang bisa ditukar dengan HADIAH 
Uuuuhhh makin untung kan....."
        />
      </div>
      <div className="center">
        <h1>Fiturnya apa aja?</h1>
        <img src={phone} alt="phone" />
      </div>
      <div className="right">
        <Card
          title="Saldo SOMI"
          paragraph="SOMI bisa top-up saldo di DIGO sebagai modal utama buat SOMI agar transaksi lebih mudah dilakukan. Jangan Khawatir pasti nya dapat KOIN juga dong...."
        />
        <Card
          title="FAQ"
          paragraph="Kalau SOMI bingung bisa yukk buka-buka di FAQ DIGO, banyak informasi yang SOMI bakal dapetin lhoo.....
Bingung pakai DIGO??? ada fitur FAQ siap membantu SOMI."
        />
        <Card
          title="Atur CUAN"
          paragraph="SOMI juga bisa atur keuntungan atau CUAN yang akan SOMI dapetin di setiap transaksi sebagai biaya admin dan uang itu bakal buat SOMI sendiri. Kapan lagi dapat untung CUAN banyak. "
        />
      </div>
    </section>
  );
}

export default Feature;
