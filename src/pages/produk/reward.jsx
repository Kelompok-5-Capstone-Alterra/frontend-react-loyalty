import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./produk.scss";
import Modal from "../../components/modal/modal";
import { useNavigate } from "react-router-dom";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

const Reward = () => {
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
  const [form, setForm] = useState({
    category: "",
  });

  const { category } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
      <section className="rewardSection">
        <div className="very_top">
          <p onClick={() => navigate("/produk")}>
            <FaIcons.FaArrowLeft />
          </p>
          <h1>Reward Koin Transaksi</h1>
        </div>
        <div className="top">
          <div className="input">
            <label htmlFor="search">
              <FaIcons.FaSearch />
            </label>
            <input type="search" id="search" placeholder="Search..." />
          </div>
          <div className="topRight">
            <select
              className="input"
              name="category"
              onChange={handleOnChange}
              value={category}
            >
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
            <button onClick={() => navigate("/produk/add-reward")}>
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
            {data.map((item, index) => {
              return (
                <>
                  {category === "" ? (
                    <tbody key={index}>
                      <td>{item.name}</td>
                      <td>{item.category.name}</td>
                      <td>{item.minimum_transaction}</td>
                      <td>{item.coins}</td>
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
                  ) : (
                    <>
                      {item.category.name === category ? (
                        <tbody key={index}>
                          <td>{item.name}</td>
                          <td>{item.category.name}</td>
                          <td>{item.minimum_transaction}</td>
                          <td>{item.coins}</td>
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
                      ) : null}
                    </>
                  )}
                </>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
};

export default Reward;
