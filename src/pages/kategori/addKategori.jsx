import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AddKategori() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    namaKategori: "",
  });
  const { namaKategori } = form;

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
        namaKategori,
      };
      console.log(body);
      alert("pesan berhasil dikirim");
      navigate("/kategori");
    } catch (error) {
      alert("pesan tidak berhasil dikirim");
      console.log(error);
    }
  };

  return (
    <section className="addProdukSection">
      <div className="top">
        <button onClick={() => navigate("/kategori")}>
          <FaIcons.FaArrowLeft />
        </button>
        <h1>Buat kategori Anda</h1>
      </div>
      <form className="bottom" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="componentInput">
          <label>Kategori</label>
          <input
            type="text"
            placeholder="Kategori Produk..."
            value={namaKategori}
            name="namaKategori"
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

export default AddKategori;