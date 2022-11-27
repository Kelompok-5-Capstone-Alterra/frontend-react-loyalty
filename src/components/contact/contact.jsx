import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import appstore from "../../assets/img/appstore.svg";
import googleplay from "../../assets/img/googleplay.svg";
import triplecircle from "../../assets/img/triplecircle.svg";
import "./contact.scss";

const Contact = () => {
  const [click, setClick] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  });

  const { name, email, description } = form;

  const handleClick = () => setClick(!click);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    try {
      e.preventDefault();
      const body = {
        name,
        email,
        description,
        allow: click,
      };
      if (body.allow === false) {
        alert("Harap ceklis terlebih dahulu");
      } else {
        alert("Pesan berhasil dikirim");
        console.log(body);
        setForm({
          name: "",
          email: "",
          description: "",
        });
        setClick(false);
      }
    } catch (error) {
      alert("Pesan tidak berhasil dikirim");
      console.log(error);
    }
  };

  return (
    <section className="contact" id="kontak">
      <div className="left">
        <h1>Kontak DIGO nihh</h1>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              name="name"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label>Enter Description</label>
            <textarea
              placeholder="Description"
              value={description}
              name="description"
              onChange={handleOnChange}
            />
            <span className="edit">
              <FaIcons.FaEdit />
            </span>
          </div>
          <div className="checkbox">
            <input type="checkbox" />
            <label className="border" onClick={handleClick}>
              {click ? (
                <p className="click">✓</p>
              ) : (
                <p className="noclick">✓</p>
              )}
              I agree to the processing of the personal data provided
            </label>
          </div>
          <button>SEND</button>
        </form>
      </div>
      <div className="right">
        <div className="row">
          <p>
            Kepuasan pelanggan adalah prioritas utama kami! Layanan dukungan
            kami tersedia 24/7 untuk membantu Anda dengan pertanyaan apa pun
            yang mungkin Anda miliki tentang Platform. Anda dapat menghubungi
            kami dengan cara apa pun yang Anda inginkan:
          </p>
          <div className="icons">
            <p>
              <FaIcons.FaWhatsapp />
            </p>
            <p>
              <FaIcons.FaPhoneAlt />
            </p>
            <p>
              <FaIcons.FaPaperPlane />
            </p>
            <p>
              <FaIcons.FaRegEnvelope />
            </p>
          </div>
        </div>
      </div>
      <img className="background" src={triplecircle} alt="background" />
      <div className="bottom">
        <div>
          <img src={appstore} alt="appstore" />
          <img src={googleplay} alt="googleplay" />
        </div>
        <p>© Copyright 2022 .DIGO Project. All Right Reserved</p>
      </div>
    </section>
  );
};

export default Contact;
