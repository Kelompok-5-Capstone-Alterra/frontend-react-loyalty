import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";

function AddKategori() {
  const navigate = useNavigate();
  const [token, setToken] = useState([]);
  const [form, setForm] = useState({
    namaKategori: "",
  });
  const { namaKategori } = form;

  useEffect(() => {
    const token = localStorage.getItem("Bearer");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        name: namaKategori,
      };
      console.log(body);
      await API.post("/admin/categories", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Berhasil menambahkan categori");
      navigate("/kategori");
    } catch (error) {
      alert("Tidak berhasil menambahkan categori");
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
