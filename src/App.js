import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Agen from "./pages/agen/agen";
import Beranda from "./pages/beranda/beranda";
import Berkas from "./pages/berkas";
import Kategori from "./pages//kategori/kategori";
import AddKategori from "./pages/kategori/addKategori";
import EditKategori from "./pages/kategori/editKategori";
import Keuangan from "./pages/keuangan";
import Koin from "./pages/koin/koin";
import LandingPage from "./pages/landingPage";
import Pembayaran from "./pages/pembayaran";
import AddProduk from "./pages/produk/addProduk";
import EditProduk from "./pages/produk/editProduk";
import Produk from "./pages/produk/produk";
import Transaksi from "./pages/transaksi/transaksi";
import Login from  "./pages/login/login";
import Register from "./pages/register";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/*" element={<RouterAdmin />} />
    </Routes>
  );
}

export default App;

const RouterAdmin = () => (
  <Sidebar>
    <Routes>
      <Route path="beranda" element={<Beranda />} />
      <Route path="agen" element={<Agen />} />
      <Route path="transaksi" element={<Transaksi />} />
      <Route path="koin" element={<Koin />} />
      <Route path="produk" element={<Produk />} />
      <Route path="produk/add-produk" element={<AddProduk />} />
      <Route path="produk/edit-produk" element={<EditProduk />} />
      <Route path="kategori" element={<Kategori />} />
      <Route path="kategori/add-kategori" element={<AddKategori />} />
      <Route path="kategori/edit-kategori" element={<EditKategori />} />
      <Route path="keuangan" element={<Keuangan />} />
      <Route path="pembayaran" element={<Pembayaran />} />
      <Route path="berkas" element={<Berkas />} />
    </Routes>
  </Sidebar>
);
