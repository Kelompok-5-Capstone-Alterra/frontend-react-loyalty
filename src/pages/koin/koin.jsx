import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "./koin.scss";
import Modal from "../../components/modal/modal";
// import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";

const koin = () => {
  const API = "https://jsonplaceholder.typicode.com/users";
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

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
          <h1>Apakah anda yakin ingin menghapus agen?</h1>
          <div>
            <button>Yakin</button>
            <button onClick={() => setShowModal(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      <section className="agenSection">
        <div className="top">
          <div className="input">
            <label htmlFor="search">
              <FaIcons.FaSearch />
            </label>
            <input type="search" id="search" placeholder="Search..." />
          </div>
          <div className="input">
            <input type="date" />
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <th>id</th>
              <th>Name Agen</th>
              <th>Deskripsi</th>
              <th>Jenis</th>
              <th>Jumlah(Rp)</th>
              <th>Tanggal Dan Waktu</th>
              <th>Status</th>
            </thead>
            {data.map((item, index) => (
              <tbody key={index}>
                <td>
                  <img
                    src="https://i.pinimg.com/564x/24/f2/62/24f262538c19f1a689fd4ecba3a4d7b6.jpg"
                    alt="profile"
                  />
                  {item.name}
                </td>
                <td>{item.email}</td>
                <td>{item.address.suite}</td>
                <td>{item.phone}</td>
                <td>123</td>
                <td>123</td>
                <td>
                  <button onClick={ClickModal}>
                    <FaIcons.FaTrash />
                  </button>
                </td>
              </tbody>
            ))}
          </table>
        </div>
      </section>
      {/* <div class="contianer p-5">
        <h4>Next Page</h4>
        <ul className="pagination-list">
          <li className="pagination-item">
            <a className="pagination-link disabled">
              <em className="fa-solid fa-angles-left" />
            </a>
          </li>
          <li className="pagination-item">
            <a className="pagination-link disabled"></a>
            <em className="fas fa-chevron-left" />
          </li>
          <li className="pagination-item">
            <a className="pagination-link active">1</a>
          </li>
          <li className="pagination-item">
            <a className="pagination-link">2</a>
          </li>
          <li className="pagination-item">
            <a className="pagination-link"></a>
            <em className="fas fa-chevron-right" />
          </li>
          <li className="pagination-item">
            <a className="pagination-link"></a>
            <em className="fa-solid fa-angles-right" />
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default koin;
