import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import "./agen.scss";
import Modal from "../../components/modal/modal";
import dateFormat from "dateformat";

const Agen = () => {
  const API = "http://goapi.kuroyamii.works/admin/users";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyMi0xMi0wOFQyMjozODo1NS41NjMyODU1NDIrMDg6MDAiLCJkYXRhIjp7Im5hbWUiOiJtdWhhbW1hZHNoZXZhcml6a3kiLCJlbWFpbCI6Im11aGFtbWFkc2hldmFyaXpreUBnbWFpbC5jb20iLCJtb2JpbGVfbnVtYmVyIjoiMDgxODA3ODc4ODQyIiwicm9sZSI6eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiY3JlYXRlZF9hdCI6IjIwMjItMTItMDJUMTY6MTk6MTgrMDg6MDAiLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMi0wMlQxNjoxOToxOCswODowMCJ9fSwic3ViIjoiMjgxNTk0ZTktNmVhOC00ZDQ5LTljOGEtOTk3NTk2YmJhZTcwIn0.k2X2_AMv66KDnaa9be-T9ay2WWUY-b6rITpPdQS2StI";
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const ClickModal = () => {
    setShowModal((prev) => !prev);
  };

  const getData = async () => {
    try {
      const response = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
              <th>Agen</th>
              <th>Email</th>
              <th>Tanggal</th>
              <th>Nomor HP</th>
              <th>Poin</th>
              <th>Saldo(Rp)</th>
              <th>Opsi</th>
            </thead>
            {data?.map((item, index) => (
              <tbody key={index}>
                <td>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/005/788/small/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                    alt="profile"
                  />
                  {item.name}
                </td>
                <td>{item.email}</td>
                <td>{dateFormat(item.created_at)}</td>
                <td>{item.mobile_number}</td>
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
    </>
  );
};

export default Agen;
