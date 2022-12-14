import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import "./beranda.scss";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import StatBox from "../../components/StatBox";
import FolderIcon from "@mui/icons-material/FolderCopyOutlined";

const data = [
  { label: "Jan", income: 20, expense: 35 },
  { label: "Feb", income: 15, expense: 29 },
  { label: "Mar", income: 77, expense: 18 },
  { label: "Apr", income: 30, expense: 25 },
  { label: "May", income: 40, expense: 18 },
  { label: "Jun", income: 40, expense: 18 },
  { label: "Jul", income: 27, expense: 23 },
  { label: "Aug", income: 32, expense: 25 },
  { label: "Sep", income: 77, expense: 18 },
  { label: "Oct", income: 32, expense: 25 },
  { label: "Nov", income: 40, expense: 18 },
  { label: "Des", income: 32, expense: 25 },
];

const beranda = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="row">
      <div className="col-md-12 sw-1">
        <div class="card">
          {/* <img src={grafik} alt="" /> */}
          {/* <h5>Laporan bisnis</h5> */}
          <div class="box-container">
            <Box
              display="grid"
              gridTemplateColumns="repeat(10, 1fr)"
              gridAutoRows="140px"
              gap="40px"
            >
              {/* ROW 1 */}
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  subtitle="Total pendapatan di bulan ini"
                  increase="25%"
                  title="Rp25.000.000"
                  icon={
                    <FolderIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  subtitle="Rata-rata Transaksi"
                  increase="12%"
                  title="Rp10.556.785"
                  icon={
                    <PointOfSaleIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  subtitle="Jumlah agen"
                  increase="5%"
                  title="1250"
                  icon={
                    <PersonAddIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
            </Box>
          </div>
        </div>
      </div>

      <div className="section col-sm-12 p-3">
        <div class="card p-5">
          <div>
            <select>
              <option hidden>Jumlah Pemasukan</option>
              <option>Rata-Rata Transaksi</option>
              <option>Jumlah Agen</option>
            </select>
            <h5>Desember 2022</h5>
          </div>

          <div className="section-content">
            <ResponsiveContainer width="95%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 25, right: 0, bottom: 10, left: 0 }}
              >
                <XAxis dataKey="label" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#B2B2B2" />
                <Bar dataKey="expense" fill="#003060" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default beranda;
