import "./Header.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    onNewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewClick }) => {
    const navigate = useNavigate();
    
    const handleSummaryClick = () => {
        navigate("/summary");
    };

    const handleTitleClick = () => {
        navigate("/");
    };

    return (
        <div className="page-header">
            <h1 className="page-title" onClick={handleTitleClick}>MindFlow</h1>
            <div className="buttons">
                <button className="summary-button" onClick={handleSummaryClick}>Summary</button>
                <button className="new-button" onClick={onNewClick}>+ New</button>
            </div>
        </div>
    );
};

export default Header;