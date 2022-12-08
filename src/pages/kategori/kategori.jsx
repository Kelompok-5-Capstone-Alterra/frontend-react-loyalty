import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "./kategori.scss";
import Modal from "../../components/modal/modal";
import { useNavigate } from "react-router-dom";

const Kategori = () => {
  const API = "https://jsonplaceholder.typicode.com/users";
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const ClickModal = () => {
    setShowModal((prev) => !prev);
  };

  const getData = async () => {
    try {
      const response = await axios.get(API);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modalDelete">
          <p className="warning">
            <FaIcons.FaExclamation />
          </p>
          <h1>Apakah anda yakin ingin menghapus kategori?</h1>
          <div>
            <button>Yakin</button>
            <button onClick={() => setShowModal(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      <section className="kategoriSection">
        <div className="top">
          <div className="input">
            <label htmlFor="search">
              <FaIcons.FaSearch />
            </label>
            <input type="search" id="search" placeholder="Search..." />
          </div>
          <div className="topRight">
            <button onClick={() => navigate("/kategori/add-kategori")}>
              <FaIcons.FaPlus />
            </button>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <th>Nama Kategori</th>
              <th>Opsi</th>
            </thead>
            {data.map((item, index) => (
              <tbody key={index}>
                <td>{item.name}</td>
                <td>
                  <div>
                    <button onClick={() => navigate("/kategori/edit-kategori")}>
                      <FaIcons.FaEdit />
                    </button>
                    <button onClick={ClickModal}>
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

export default Kategori;
