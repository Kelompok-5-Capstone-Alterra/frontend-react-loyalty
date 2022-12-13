import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

function AddKategori() {
  const [state] = useContext(AuthContext);
  const [form, setForm] = useState({
    namaKategori: "",
  });
  const Token = state.user.token;
  const navigate = useNavigate();
  const { namaKategori } = form;

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
      const headers = {
        headers: { Authorization: `Bearer ${Token}` },
      };
      console.log(body);
      await API.post("/admin/categories", body, headers);
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
