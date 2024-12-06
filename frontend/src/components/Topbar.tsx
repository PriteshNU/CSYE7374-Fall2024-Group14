import React, { useState, useEffect ,useRef} from "react";
import SearchBox from "./SearchBox";
import { logout } from "../services/auth-service";
import { Link,useNavigate } from "react-router-dom";
import Course from "../models/Course";
import * as Paths from '../resources/paths'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import LocaleContext from "../LocaleContext";



type Props = {
  onSearch: (query: string) => void ;
};

const Topbar = ({ onSearch }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initially set to false
  const navigate=useNavigate();
  const { currentUser, loading, error } = useSelector((state:RootState)=>state.user);
  // Simulating a login action when the component mounts
  // useEffect(() => {
  //   setIsLoggedIn(true);
  // }, []);
  const { t } = useTranslation('common');


  const handleLogin = () => {
    navigate(Paths.loginPath)
    // return <Link to="/user/login" />;
  };
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      // Handle successful logout actions, if needed
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure
      // For example, display an error message to the user
    }
  };
  const takeToProfilePage: React.MouseEventHandler<HTMLButtonElement> = () => {
    
    navigate(currentUser?.userType==='instructor'?Paths.instructorDetailsPath:Paths.userDetailsPath);
  };

  function searchHandler(query: string): void {
    throw new Error("Function not implemented.");
  }
  
  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="max-w-screen-x1 w-3/4">
            <SearchBox onSearch={onSearch} />
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button className="text-xl font-semibold text-gray-500 dark:text-white" onClick={takeToProfilePage}>
              {currentUser?.userName}
            </button>
            <div >
              <select className= "bg-gray-900 text-white" value={locale} onChange={handleChange}>
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="es">Spanish</option>
              <option value="ar">Arabic</option>
              <option value="bn">Bengali</option>
              <option value="cn">Chinese</option>
              <option value="fr">French</option>
              <option value="hi">Hindi</option>
              <option value="pa">Punjabi</option>
              <option value="pt">Portugese</option>
              <option value="ru">Russian</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </div>
    </LocaleContext.Provider>
  );
};

export default Topbar;
