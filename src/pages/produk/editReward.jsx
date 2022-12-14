import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

function EditReward() {
  const [state] = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    produk: "",
    kategori: "",
    transaksi: "",
    koin: "",
  });

  const { produk, kategori, transaksi, koin } = form;
  const Token = state.user.token;

  const getData = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      console.log(response.data.data);
      setForm({
        produk: response.data.data.name,
        kategori: response.data.data.category_id.name,
        transaksi: response.data.data.minimum_transaction,
        koin: response.data.data.points,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
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
        name: produk,
        category_id: parseInt(kategori),
        minimum_transaction: parseInt(transaksi),
        points: parseInt(koin),
      };
      const headers = {
        headers: { Authorization: `Bearer ${Token}` },
      };
      console.log(body);
      await API.put(`/admin/products/${id}`, body, headers);
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
        <h1>Edit Reward Anda</h1>
      </div>
      <form className="bottom" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="componentInput">
          <label>Produk</label>
          <input
            type="text"
            value={produk}
            name="produk"
            onChange={handleOnChange}
          />
        </div>
        <div className="componentInput">
          <label>Kategori</label>
          <select name="kategori" onChange={handleOnChange} value={kategori}>
            <option>123</option>
            <option>as1232132132d</option>
          </select>
        </div>
        <div className="componentInput">
          <label>Minimal Transaksi</label>
          <input
            type="text"
            value={transaksi}
            name="transaksi"
            onChange={handleOnChange}
          />
        </div>
        <div className="componentInput">
          <label>Koin Transaksi</label>
          <input
            type="text"
            value={koin}
            name="koin"
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

export default EditReward;
