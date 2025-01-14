import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import BlackScholesForm from "./components/BlackScholesForm.tsx";
import History from "./components/History.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";
import About from "./components/About.tsx"
import "katex/dist/katex.min.css";

const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="About" />
        <Tab label="Calculator" />
        <Tab label="Calculation History" />
      </Tabs>
      <ErrorBoundary>
        {currentTab === 0 && <About />}
        {currentTab === 1 && <BlackScholesForm />}
        {currentTab === 2 && <History />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
