import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";

function AddProduk() {
  const navigate = useNavigate();
  const [token, setToken] = useState([]);
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
    const token = localStorage.getItem("Bearer");
    if (token) {
      setToken(token);
    }
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
      console.log(body);
      await API.post("/admin/products", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
          <p className="error_message">{messageProduct}</p>
        </div>
        <div className="componentInput">
          <label>Kategori</label>
          <select name="kategori" onChange={handleOnChange} value={kategori}>
            <option hidden>Kategori Produk...</option>
            {data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
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
          <p className="error_message">{messageTransaksi}</p>
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
          <p className="error_message">{messageKoin}</p>
        </div>
        <div className="rowButton">
          <button>Buat</button>
        </div>
      </form>
    </section>
  );
}

export default AddProduk;