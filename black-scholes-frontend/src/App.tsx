import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import BlackScholesForm from "./components/BlackScholesForm.tsx";
import History from "./components/History.tsx";

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Calculator" />
        <Tab label="History" />
      </Tabs>
      {currentTab === 0 && <BlackScholesForm />}
      {currentTab === 1 && <History />}
    </div>
  );
};

export default App;
