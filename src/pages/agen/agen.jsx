import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./agen.scss";
import Modal from "../../components/modal/modal";
import dateFormat from "dateformat";
import AuthContext from "../../context/AuthProvider";
import { API } from "../../auth";

const Agen = () => {
  const [state] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const [data, setData] = useState([]);
  const Token = state.user.token;

  const ClickModal = (id) => {
    console.log(id);
    setShowModal((prev) => !prev);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/admin/users/${idDelete}`, {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setShowModal((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${Token}` },
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
            <button onClick={handleDelete}>Yakin</button>
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
                <td>{item.user_coin.amount}</td>
                <td>{item.credit.amount}</td>
                <td>
                  <button onClick={() => ClickModal(item.id)}>
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
