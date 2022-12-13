import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./produk.scss";
import Modal from "../../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";

const Produk = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState([]);
  const [idDelete, setIdDelete] = useState("");
  const navigate = useNavigate();
  const ClickModal = (id) => {
    setShowModal((prev) => !prev);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/admin/products/${idDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
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
      console.log(response?.data);
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
              <option>2</option>
              <option>3</option>
            </select>
            <button onClick={() => navigate("/produk/add-produk")}>
              <FaIcons.FaPlus />
            </button>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <th>Produk</th>
              <th>Kategori</th>
              <th>Minimal Transaksi</th>
              <th>Koin Transaksi</th>
              <th>Opsi</th>
            </thead>
            {data.map((item, index) => (
              <tbody key={index}>
                <td>{item.name}</td>
                <td>{item.category_id}</td>
                <td>{item.minimum_transaction}</td>
                <td>{item.points}</td>
                <td>
                  <div>
                    <button onClick={() => navigate("/produk/edit-produk")}>
                      <FaIcons.FaEdit />
                    </button>
                    <button onClick={() => ClickModal(item.id)}>
                      <FaIcons.FaTrash />
                    </button>
                  </div>
                </td>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
};

export default Produk;
