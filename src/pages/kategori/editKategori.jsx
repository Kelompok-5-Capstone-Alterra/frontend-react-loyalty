import React, { useContext, useState } from "react";
import { useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

function EditKategori() {
  const [state] = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
  });
  const { id } = useParams();
  const { name } = form;
  const Token = state.user.token;

  const getData = async () => {
    try {
      const response = await API.get(`/categories/${id}`);
      console.log(response.data.data);
      setForm({
        name: response.data.data.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        name,
      };
      const headers = {
        headers: { Authorization: `Bearer ${Token}` },
      };
      console.log(body);
      alert("Berhasil mengedit kategori");
      await API.put(`/categories/${id}`, body, headers);
      navigate("/kategori");
    } catch (error) {
      alert("Tidak berhasil mengedit kategori");
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
            value={name}
            name="name"
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
