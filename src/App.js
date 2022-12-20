import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import AuthContext from "./context/AuthProvider";
import Agen from "./pages/agen/agen";
import Beranda from "./pages/beranda/beranda";
import Berkas from "./pages/berkas";
import AddKategori from "./pages/kategori/addKategori";
import EditKategori from "./pages/kategori/editKategori";
import Kategori from "./pages/kategori/kategori";
import Keuangan from "./pages/keuangan";
import Koin from "./pages/koin/koin";
import LandingPage from "./pages/landingPage";
import Login from "./pages/login/login";
import Pembayaran from "./pages/pembayaran";
import AddProduk from "./pages/produk/addProduk";
import EditProduk from "./pages/produk/editProduk";
import Produk from "./pages/produk/produk";
import PrivateRoute from "./context/PrivateRoute";
import Reward from "./pages/produk/reward";
import Transaksi from "./pages/transaksi/transaksi";

function App() {
  const [state, dispatch] = useContext(AuthContext);

  const Token = localStorage.token;

  const checkUser = async () => {
    const data = {
      token: Token,
    };
    try {
      if (localStorage.token === undefined) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      } else {
        dispatch({
          type: "USER_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {state.isLogin ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="agen" element={<Agen />} />
            <Route path="transaksi" element={<Transaksi />} />
            <Route path="koin" element={<Koin />} />
            <Route path="produk" element={<Produk />} />
            <Route path="produk/reward" element={<Reward />} />
            <Route path="produk/add-produk" element={<AddProduk />} />
            <Route path="produk/edit-produk/:id" element={<EditProduk />} />
            <Route path="kategori" element={<Kategori />} />
            <Route path="kategori/add-kategori" element={<AddKategori />} />
            <Route
              path="kategori/edit-kategori/:id"
              element={<EditKategori />}
            />
            <Route path="keuangan" element={<Keuangan />} />
            <Route path="pembayaran" element={<Pembayaran />} />
            <Route path="berkas" element={<Berkas />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PrivateRoute />} />
        </Routes>
      )}
    </>
  );
}

export default App;
