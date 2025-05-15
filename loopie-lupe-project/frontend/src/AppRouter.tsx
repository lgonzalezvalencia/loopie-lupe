import { Routes, Route } from "react-router-dom";
import MainContainer from "./MainContainer";
import KanbanPage from "./kanbanPage/KanbanPage";
import SummaryPage from "./summaryPage/SummaryPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContainer />}>
        <Route index element={<KanbanPage />} />
        <Route path="summary" element={<SummaryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
