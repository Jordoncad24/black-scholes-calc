import React, { useState } from "react";
import BlackScholesForm from "./components/BlackScholesForm";
import History from "./components/History";

const App: React.FC = () => {
  const [view, setView] = useState<"calculator" | "history">("calculator");

  return (
    <div>
      <nav>
        <button onClick={() => setView("calculator")}>Calculator</button>
        <button onClick={() => setView("history")}>History</button>
      </nav>

      <main>
        {view === "calculator" && <BlackScholesForm />}
        {view === "history" && <History />}
      </main>
    </div>
  );
};

export default App;
