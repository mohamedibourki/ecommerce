"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Dashboard from '../dashboard/Dashboard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bolder">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: "100vh", width: "100vw", color: "white" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          marginTop: "50px",
          background: "black",
          width: "11.5%"
        }}
      >
        <Tab
          label="Dashboard"
          {...a11yProps(0)}
          style={{ color: "white", fontSize: "20px", fontWeight: "bolder", marginBottom: "10px", display: "flex", flexDirection: "row", gap: "5px", justifyContent: "flex-start" }}
          icon={<HomeIcon sx={{ marginBottom: "0 !important" }} />}
        />
        <Tab
          label="Products"
          {...a11yProps(1)}
          style={{ color: "white", fontSize: "20px", fontWeight: "bolder", marginBottom: "10px", display: "flex", flexDirection: "row", gap: "5px", justifyContent: "flex-start" }}
          icon={<LocalGroceryStoreIcon sx={{ marginBottom: "0 !important" }} />}
        />
        <Tab
          label="Orders"
          {...a11yProps(2)}
          style={{ color: "white", fontSize: "20px", fontWeight: "bolder", marginBottom: "10px", display: "flex", flexDirection: "row", gap: "5px", justifyContent: "flex-start" }}
          icon={<ViewListIcon sx={{ marginBottom: "0 !important" }} />}
        />
        <Tab
          label="Profile"
          {...a11yProps(3)}
          style={{ color: "white", fontSize: "20px", fontWeight: "bolder", marginBottom: "10px", display: "flex", flexDirection: "row", gap: "5px", justifyContent: "flex-start" }}
          icon={<PersonIcon sx={{ marginBottom: "0 !important" }} />}
        />
        <Tab
          label="Settings"
          {...a11yProps(4)}
          style={{ color: "white", fontSize: "20px", fontWeight: "bolder", marginBottom: "10px", display: "flex", flexDirection: "row", gap: "5px", justifyContent: "flex-start" }}
          icon={<SettingsIcon sx={{ marginBottom: "0 !important" }} />}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Products
      </TabPanel>
      <TabPanel value={value} index={2}>
        Orders
      </TabPanel>
      <TabPanel value={value} index={3}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={4}>
        Settings
      </TabPanel>
    </Box>
  );
}
