import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import WorkIcon from '@mui/icons-material/Work';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import logoEtixway from './logo.png';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
    sx={{
      "& .pro-sidebar-inner": {
        background: "#82C9D1 !important", // couleur 
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important",
      },
      "& .pro-inner-item:hover": {
        color: "#1C3A88 !important",
      },
      "& .pro-menu-item.active": {
        color: "#868484 !important",
      },
    }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >

                <img src={logoEtixway} alt="Etixway Logo" style={{ height: '30px' }} /> {/* Ajoutez style si nécessaire */}

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>


          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Item
              title="Compagnie"
              to="/company"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contrat"
              to="/contrat"
              icon={< HistoryEduIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Collaborateur"
              to="/collaborator"

              icon={<PeopleAltIcon />}

              selected={selected}
              setSelected={setSelected}
            />
                        <Item
              title="Mission"
              to="/invoices"
              icon={<WorkIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
                        <Item
              title="Facture"
              to="/invoices"
              icon={<RequestPageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                        <Item
              title="Cras"
              to="/invoices"
              icon={<FactCheckIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
