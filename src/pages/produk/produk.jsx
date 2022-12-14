import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./produk.scss";
import Modal from "../../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

const Produk = () => {
  const [state] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [categori, setCategori] = useState("");
  const [data, setData] = useState([]);
  const Token = state.user.token;
  const navigate = useNavigate();
  const ClickModal = (id) => {
    setShowModal((prev) => !prev);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/admin/products/${idDelete}`, {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setShowModal((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await API.get("/products");
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategori = async () => {
    try {
      const response = await API.get("/categories");
      setCategori(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCategori();
  }, []);

  console.log(data);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modalDelete">
          <p className="warning">
            <FaIcons.FaExclamation />
          </p>
          <h1>Apakah anda yakin ingin menghapus produk?</h1>
          <div>
            <button onClick={handleDelete}>Yakin</button>
            <button onClick={() => setShowModal(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      <section className="produkSection">
        <div className="very_top">
          <div className="title">
            <h1>Produk</h1>
            <p>Semua produk pulsa & paket data</p>
          </div>
          <div className="button">
            <button
              onClick={() => navigate("/produk/reward")}
              className="button_kotak"
            >
              Reward Koin Transaksi
            </button>
            <button
              onClick={() => navigate("/produk/add-produk")}
              className="button_circle"
            >
              <FaIcons.FaPlus />
            </button>
          </div>
        </div>
        <div className="top">
          <div className="input">
            <label htmlFor="search">
              <FaIcons.FaSearch />
            </label>
            <input type="search" id="search" placeholder="Search..." />
          </div>
          <div className="topRight">
            <select className="input">
              <option hidden>Produk</option>
              {categori ? (
                <>
                  {categori?.map((data, index) => (
                    <option key={index}>{data?.name}</option>
                  ))}
                </>
              ) : (
                <option> </option>
              )}
            </select>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Provider</th>
              <th>Masa Aktif (hari)</th>
              <th>Kategori</th>
              <th>Harga (Rp)</th>
              <th>Opsi</th>
            </thead>
            {data.map((item, index) => {
              const categori_ = categori ? categori : [];
              const obj = categori_?.find((t) => t?.id === item?.category_id);
              return (
                <tbody key={index}>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{item.name}</td>
                  <td>{obj?.name ? obj?.name : " "}</td>
                  <td>{item.minimum_transaction}</td>
                  <td>{item.points}</td>
                  <td>
                    <div>
                      <button
                        onClick={() =>
                          navigate(`/produk/edit-produk/${item.id}`)
                        }
                      >
                        <FaIcons.FaEdit />
                      </button>
                      <button onClick={() => ClickModal(item.id)}>
                        <FaIcons.FaTrash />
                      </button>
                    </div>
                  </td>
                </tbody>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
};

export default Produk;
