import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

function AddProduk() {
  const [state] = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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
  const [msgJudul, setMsgJudul] = useState("");
  const [msgDesc, setMsgDesc] = useState("");
  const [msgProvider, setMsgProvider] = useState("");
  const [msgMasaAktif, setMsgMasaAktif] = useState("");
  const [msgHarga, setMsgHarga] = useState("");
  const [msgKategori, setMsgKategori] = useState("");
  const [msgMinimal, setMsgMinimal] = useState("");
  const [msgKoin, setMsgKoin] = useState("");
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

      if (name === "") {
        setMsgJudul("Silahkan masukan Judul");
      }
      if (description === "") {
        setMsgDesc("Silahkan Masukan Description");
      }
      if (provider === "") {
        setMsgProvider("Silahkan Masukan Provider");
      }
      if (active_period === "") {
        setMsgMasaAktif("Silahkan Masukan Masa Aktif");
      }
      if (price === "") {
        setMsgHarga("Silahkan Masukan Harga");
      }
      if (category_id === "") {
        setMsgKategori("Silahkan Pilih Category");
      }
      if (minimum_transaction === "") {
        setMsgMinimal("Silahkan Masukan Minimal Transaksi");
      }
      if (coins === "") {
        setMsgKoin("Silahkan Masukan Koin Transaksi");
      }

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
      // console.log(body);
      await API.post("/admin/products", body, headers);
      alert("Berhasil menambahkan produk");
      navigate("/produk");
    } catch (error) {
      alert("Tidak berhasil menambahkan produk");
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
          <label>Judul</label>
          <input
            type="text"
            placeholder="Tambahkan Nama Produk Anda..."
            value={name}
            name="name"
            onChange={handleOnChange}
          />
          <p className="text_red">{msgJudul}</p>
        </div>
        <div className="componentInput">
          <label>Deskripsi</label>
          <textarea
            placeholder="Deskripsi........."
            name="description"
            value={description}
            onChange={handleOnChange}
          />
          <p className="text_red">{msgDesc}</p>
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
          <p className="text_red">{msgProvider}</p>
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
            <p className="text_red">{msgMasaAktif}</p>
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
            <p className="text_red">{msgHarga}</p>
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
          <p className="text_red">{msgKategori}</p>
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
            <p className="text_red">{msgMinimal}</p>
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
            <p className="text_red">{msgKoin}</p>
          </div>
        </div>
        <div className="rowButton">
          <button>Buat</button>
        </div>
      </form>
    </section>
  );
}

export default AddProduk;
