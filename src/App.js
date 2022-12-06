import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Agen from "./pages/agen/agen";
import Beranda from "./pages/beranda";
import Berkas from "./pages/berkas";
import Kategori from "./pages/kategori/kategori";
import Keuangan from "./pages/keuangan";
import Koin from "./pages/koin";
import LandingPage from "./pages/landingPage";
import Pembayaran from "./pages/pembayaran";
import AddProduk from "./pages/produk/addProduk";
import EditProduk from "./pages/produk/editProduk";
import Produk from "./pages/produk/produk";
import Transaksi from "./pages/transaksi";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
      <Route path="keuangan" element={<Keuangan />} />
      <Route path="pembayaran" element={<Pembayaran />} />
      <Route path="berkas" element={<Berkas />} />
    </Routes>
  </Sidebar>
);
