import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddProduk() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    produk: "",
    kategori: "",
    transaksi: "",
    koin: "",
  });
  const { produk, kategori, transaksi, koin } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    try {
      e.preventDefault();
      const body = {
        produk,
        kategori,
        transaksi,
        koin,
      };
      console.log(body);
      alert("pesan berhasil dikirim");
      navigate("/produk");
    } catch (error) {
      alert("pesan tidak berhasil dikirim");
      console.log(error);
    }
  };

  return (
    <section className="addProdukSection">
      <div className="top">
        <button onClick={() => navigate("/produk")}>
          <FaIcons.FaArrowLeft />
        </button>
        <h1>Buat Produk Anda</h1>
      </div>
      <form className="bottom" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="componentInput">
          <label>Produk</label>
          <input
            type="text"
            placeholder="Tambahkan Nama Produk Anda..."
            value={produk}
            name="produk"
            onChange={handleOnChange}
          />
        </div>
        <div className="componentInput">
          <label>Kategori</label>
          <select name="kategori" onChange={handleOnChange} value={kategori}>
            <option hidden>Kategori Produk...</option>
            <option>123</option>
            <option>as1232132132d</option>
          </select>
        </div>
        <div className="componentInput">
          <label>Minimal Transaksi</label>
          <input
            type="text"
            placeholder="Limit Nasabah Untuk Transaksi..."
            value={transaksi}
            name="transaksi"
            onChange={handleOnChange}
          />
        </div>
        <div className="componentInput">
          <label>Koin Transaksi</label>
          <input
            type="text"
            placeholder="Tetapkan Nilai Koin Untuk Setiap Pelanggan Yang Melakukan Transaksi..."
            value={koin}
            name="koin"
            onChange={handleOnChange}
          />
        </div>
        <div className="rowButton">
          <button>Buat</button>
        </div>
      </form>
    </section>
  );
}

export default AddProduk;
