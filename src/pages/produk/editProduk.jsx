import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

function EditProduk() {
  const [state] = useContext(AuthContext);
  const navigate = useNavigate();
  const [messageProduct, setMessageProduct] = useState(null);
  const [messageTransaksi, setMessageTransaksi] = useState(null);
  const [messageKoin, setMessageKoin] = useState(null);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    produk: "",
    kategori: "",
    transaksi: "",
    koin: "",
  });
  const Token = state.user.token;
  const { produk, kategori, transaksi, koin } = form;

  const getData = async () => {
    try {
      const response = await API.get("/categories");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
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

      if (produk === "") {
        setMessageProduct("silahkan isi nama product");
      }
      if (transaksi === "") {
        setMessageTransaksi("silahkan isi nama product");
      }
      if (koin === "") {
        setMessageKoin("silahkan isi nama product");
      }
      const body = {
        name: produk,
        category_id: parseInt(kategori),
        minimum_transaction: parseInt(transaksi),
        points: parseInt(koin),
      };
      const headers = {
        headers: { Authorization: `Bearer ${Token}` },
      };
      await API.post("/admin/products", body, headers);
      alert("Product berhasil ditambahkan");
      navigate("/produk");
    } catch (error) {
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
            value={produk}
            name="produk"
            onChange={handleOnChange}
          />
          <p className="error_message">{messageProduct}</p>
        </div>
        <div className="componentInput">
          <label>Deskripsi</label>
          <textarea placeholder="Deskripsi........." />
          <p className="error_message">{messageProduct}</p>
        </div>
        <div className="componentInput">
          <label>Provider</label>
          <input
            type="text"
            placeholder="Provider"
            value={produk}
            name="produk"
            onChange={handleOnChange}
          />
          <p className="error_message">{messageProduct}</p>
        </div>
        <div className="input_row">
          <div className="componentInput">
            <label>Masa Aktif (Hari)</label>
            <input
              type="text"
              placeholder="Masa Aktif (Hari)"
              value={produk}
              name="produk"
              onChange={handleOnChange}
            />
            <p className="error_message">{messageProduct}</p>
          </div>
          <div className="componentInput">
            <label>Harga (Rp)</label>
            <input
              type="text"
              placeholder="Harga (Rp)"
              value={produk}
              name="produk"
              onChange={handleOnChange}
            />
            <p className="error_message">{messageProduct}</p>
          </div>
        </div>
        <div className="componentInput">
          <label>Judul</label>
          <select name="kategori" onChange={handleOnChange} value={kategori}>
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
              placeholder="Mininal Transaksi"
              value={produk}
              name="produk"
              onChange={handleOnChange}
            />
            <p className="error_message">{messageProduct}</p>
          </div>
          <div className="componentInput">
            <label>Koin Transaksi</label>
            <input
              type="text"
              placeholder="Koin Transaksi"
              value={produk}
              name="produk"
              onChange={handleOnChange}
            />
            <p className="error_message">{messageProduct}</p>
          </div>
        </div>
        <div className="rowButton">
          <button>Buat</button>
        </div>
      </form>
    </section>
  );
}

export default EditProduk;
