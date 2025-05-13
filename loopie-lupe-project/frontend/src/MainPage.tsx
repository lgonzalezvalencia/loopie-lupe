import { useState } from "react";
import ColumnContainer from "./columnContainer/ColumnContainer";
import CreateTask from "./createTask/CreateTask";
import "./MainPage.css";
import LoginPage from "./login/LoginPage";

function MainApp() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      {isLoggedIn /* Reminder to change the condition to !isLoggedIn for Authentication */ ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="main-container">
          <div className="page_header">
            <h1 className="page-title">MindFlow</h1>
            <button onClick={openDialog}>+ New</button>
          </div>
          <div className="kanban-area">
            <CreateTask isOpen={isDialogOpen} onClose={closeDialog} />
            <ColumnContainer />
          </div>
        </div>
      )}
    </>
  );
}

export default MainApp;
