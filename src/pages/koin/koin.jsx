import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "./koin.scss";
import Modal from "../../components/modal/modal";
// import "@fortawesome/fontawesome-free/css/all.css";
// import "bootstrap/dist/css/bootstrap.css";
// import { Button } from "@themesberg/react-bootstrap";
import dateFormat from "dateformat";

function Koin() {
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
          <h1>Apakah anda yakin ingin menghapus koin?</h1>
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
          <div className="btn-toolbar mb-2 mb-md-0">
            <button size="sm">Export</button>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <th>Id</th>
              <th>Nama Agen</th>
              <th>Reward</th>
              <th>Koin</th>
              <th>Tanggal Dan Waktu</th>
              <th>Status</th>
            </thead>
            {data.map((item, index) => (
              <tbody key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.reward}</td>
                <td>{item.koin}</td>
                <td>{dateFormat(item.created_at)}</td>
                <td>
                  <label class="container">
                    <input type="checkbox" checked="checked" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
}

export default Koin;

// import React from "react";

// function Koin() {
//   return (
//     <div>
//       <h1>Koin</h1>
//     </div>
//   );
// }

// export default Koin;
