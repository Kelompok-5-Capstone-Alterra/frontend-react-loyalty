import React, { useState } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../auth";

function EditKategori() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    namaKategori: "kategori",
  });
  const { id } = useParams();
  const { namaKategori } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const res = API.get(`/categories/${id}`);
    console.log(res);
  }, []);

  const handleOnSubmit = (e) => {
    try {
      e.preventDefault();
      const body = {
        namaKategori,
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
        <button onClick={() => navigate("/kategori")}>
          <FaIcons.FaArrowLeft />
        </button>
        <h1>Edit Kategori Anda</h1>
      </div>
      <form className="bottom" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="componentInput">
          <label>Kategori</label>
          <input
            type="text"
            placeholder="Tambahkan Nama Produk Anda..."
            value={namaKategori}
            name="namaKategori"
            onChange={handleOnChange}
          />
        </div>
        <div className="rowButton">
          <button>Simpan</button>
        </div>
      </form>
    </section>
  );
}

export default EditKategori;
