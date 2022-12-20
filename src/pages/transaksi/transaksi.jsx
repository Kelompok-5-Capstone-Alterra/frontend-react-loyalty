import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./transaksi.scss";
import Modal from "../../components/modal/modal";
// import "bootstrap/dist/css/bootstrap.css";
// import { Button } from "@themesberg/react-bootstrap";
import dateFormat from "dateformat";
import { API } from "../../auth";
import AuthContext from "../../context/AuthProvider";
import { FormatRupiah } from "@arismun/format-rupiah";

const Transaksi = () => {
  const [state] = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [dataAgen, setDataAgen] = useState([]);
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

  useEffect(() => {
    getData();
    getDataAgen();
  }, []);

  console.log(data);

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modalDelete">
          <p className="warning">
            <FaIcons.FaExclamation />
          </p>
          <h1>Apakah anda yakin ingin menghapus transaksi?</h1>
          <div>
            <button>Yakin</button>
            <button onClick={() => setShowModal(false)}>Batal</button>
          </div>
        </div>
      </Modal>
      <div class="rowTransaksi">
        <div class="card">
          <label htmlFor="arrow-upward" class="arrowup">
            <FaIcons.FaLongArrowAltUp />
          </label>
          <div class="card-body">
            <h5 class="card-title">Total Masuk Gagal</h5>
            <p class="card-text">Rp 70.000</p>
          </div>
        </div>
        <div class="card">
          <label htmlFor="arrow-upward" class="arrowdown">
            <FaIcons.FaLongArrowAltDown />
          </label>
          <div class="card-body">
            <h5 class="card-title">Total Sukses Masuk</h5>
            <p class="card-text">Rp 20.000</p>
          </div>
        </div>
      </div>
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
            <button className="button_transaksi">Export</button>
          </div>
        </div>
        <div className="bottom">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nama Agen</th>
                <th>Pembayaran</th>
                <th>Produk</th>
                <th>Nominal(Rp)</th>
                <th>Tanggal Dan Waktu</th>
                <th>Status</th>
              </tr>
            </thead>
            {Search(data)?.map((item, index) => {
              const obj = dataAgen?.find((t) => t?.id === item.user_id);
              // console.log(obj);
              return (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{obj.name}</td>
                    <td>
                      <FormatRupiah value={item.amount} />
                    </td>
                    <td>{item.products.name}</td>
                    <td>
                      <label htmlFor="arrow-upward" onClick={ClickModal}>
                        <FaIcons.FaLongArrowAltUp />
                      </label>
                      <FormatRupiah value={item.products.price} />
                    </td>
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

export default Transaksi;
