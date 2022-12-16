import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./kategori.scss";
import Modal from "../../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

const Kategori = () => {
  const [state] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [idDelete, setIdDelete] = useState("");
  const Token = state.user.token;
  const navigate = useNavigate();
  const ClickModal = (id) => {
    setShowModal((prev) => !prev);
    setIdDelete(id);
  };

  console.log(idDelete);

  const handleDelete = async () => {
    try {
      await API.delete(`/categories/${idDelete}`, {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setShowModal((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modalDelete">
          <p className="warning">
            <FaIcons.FaExclamation />
          </p>
          <h1>Apakah anda yakin ingin menghapus kategori?</h1>
          <div>
            <button onClick={() => handleDelete()}>Yakin</button>
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
                    <button
                      onClick={() =>
                        navigate(`/kategori/edit-kategori/${item.id}`)
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
            ))}
          </table>
        </div>
      </section>
    </>
  );
};

export default Kategori;