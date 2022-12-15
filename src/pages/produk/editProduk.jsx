import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

function EditProduk() {
  const [state] = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    provider: "",
    active_period: "",
    price: "",
    minimum_transaction: "",
    coins: "",
    category_id: "",
  });
  const Token = state.user.token;
  const {
    name,
    description,
    provider,
    active_period,
    price,
    minimum_transaction,
    coins,
    category_id,
  } = form;

  const getData = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      console.log(response.data.data);
      setForm({
        name: response.data.data.name,
        description: response.data.data.description,
        provider: response.data.data.provider,
        active_period: response.data.data.active_period,
        price: response.data.data.price,
        minimum_transaction: response.data.data.minimum_transaction,
        coins: response.data.data.coins,
        category_id: response.data.data.category_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategori = async () => {
    try {
      const response = await API.get("/categories");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCategori();
  }, []);

  // console.log(token);
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // if (produk === "") {
      //   setMessageProduct("silahkan isi nama product");
      // }

      const body = {
        name: name,
        description: description,
        provider: provider,
        active_period: parseInt(active_period),
        price: parseInt(price),
        minimum_transaction: parseInt(minimum_transaction),
        coins: parseInt(coins),
        category_id: parseInt(category_id),
      };
      const headers = {
        headers: { Authorization: `Bearer ${Token}` },
      };
      console.log(body);
      await API.put(`/admin/products/${id}`, body, headers);
      alert("Berhasil mengedit produk");
      navigate("/produk");
    } catch (error) {
      alert("Tidak berhasil mengedit produk");
      console.log(error);
    }
  };

  return (
    <section className="addProdukSection">
      <div className="top">
        <button onClick={() => navigate("/produk")}>
          <FaIcons.FaArrowLeft />
        </button>
        <h1>Edit Produk Anda</h1>
      </div>
      <form className="bottom" onSubmit={(e) => handleOnSubmit(e)}>
        <div className="componentInput">
          <label>Judul</label>
          <input
            type="text"
            placeholder="Tambahkan Nama Produk Anda..."
            value={name}
            name="name"
            onChange={handleOnChange}
          />
        </div>
        <div className="componentInput">
          <label>Deskripsi</label>
          <textarea
            placeholder="Deskripsi........."
            name="description"
            value={description}
            onChange={handleOnChange}
          />
        </div>
        <div className="componentInput">
          <label>Provider</label>
          <input
            type="text"
            placeholder="Provider"
            value={provider}
            name="provider"
            onChange={handleOnChange}
          />
        </div>
        <div className="input_row">
          <div className="componentInput">
            <label>Masa Aktif (Hari)</label>
            <input
              type="number"
              placeholder="Masa Aktif (Hari)"
              value={active_period}
              name="active_period"
              onChange={handleOnChange}
            />
          </div>
          <div className="componentInput">
            <label>Harga (Rp)</label>
            <input
              type="number"
              placeholder="Harga (Rp)"
              value={price}
              name="price"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="componentInput">
          <label>Kategori</label>
          <select
            name="category_id"
            onChange={handleOnChange}
            value={category_id}
          >
            <option hidden>Kategori Produk...</option>
            {data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input_row">
          <div className="componentInput">
            <label>Minimal Transaksi</label>
            <input
              type="text"
              placeholder="Minimal Transaksi"
              value={minimum_transaction}
              name="minimum_transaction"
              onChange={handleOnChange}
            />
          </div>
          <div className="componentInput">
            <label>Koin Transaksi</label>
            <input
              type="text"
              placeholder="Koin Transaksi"
              value={coins}
              name="coins"
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="rowButton">
          <button>Simpan</button>
        </div>
      </form>
    </section>
  );
}

export default EditProduk;
