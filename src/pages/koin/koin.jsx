import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./koin.scss";
import { CSVLink } from "react-csv";
import Modal from "../../components/modal/modal";
import dateFormat from "dateformat";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";

const Koin = () => {
  const [state] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [dataAgen, setDataAgen] = useState([]);
  const [dataReward, setDataReward] = useState([]);
  const [dataPoin, setDataPoin] = useState([]);
  const Token = state.user.token;
  const [query, setQuery] = useState("");
  const keys = ["name"];

  const ClickModal = () => {
    setShowModal((prev) => !prev);
  };

  const Search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item.products[key].toLowerCase().includes(query))
    );
  };

  const getData = async () => {
    try {
      const response = await API.get("admin/transactions", {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataAgen = async () => {
    try {
      const response = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setDataAgen(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataReward = async () => {
    try {
      const response = await API.get("/rewards", {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setDataReward(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPoin = async () => {
    try {
      const response = await API.get("/categories", {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setDataPoin(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getDataAgen();
    getDataReward();
    getDataPoin();
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
            <input
              type="search"
              id="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </div>
          <div className="input">
            <input type="date" />
          </div>
          <div>
            <CSVLink
              data={data}
              filename="DataKoin"
              className="button_transaksi"
            >
              Export
            </CSVLink>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nama Agen</th>
                <th>Reward</th>
                <th>Koin</th>
                <th>Tanggal Dan Waktu</th>
                <th>Status</th>
              </tr>
            </thead>
            {Search(data)?.map((item, index) => {
              const obj = dataAgen?.find((t) => t?.id === item.user_id);
              const reward = dataReward?.find((t) => t?.reward === item.reward);

              return (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{obj?.name}</td>
                    <td>{reward?.name}</td>
                    <td>{item.products.coins}</td>
                    <td>{dateFormat(item.created_at)}</td>
                    <td>
                      {item.status}
                      <label class="container">
                        <input type="checkbox" checked="checked" />
                        <span class="checkmark"></span>
                      </label>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
};

export default Koin;
