import React, { useState, useEffect, MouseEventHandler } from "react";
import logo from "../resources/knowledgeForge.jpeg";
import SearchBox from "./SearchBox";
import {
  RiDashboardLine,
  RiLogoutCircleRLine,
  RiSettings5Line,
  RiLoginCircleLine,
} from "react-icons/ri";
import { BsBookmarkStar, BsList } from "react-icons/bs";
import { BsArrowLeftCircle, BsChevronDown } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
// import Menus from "./Menus";
import * as Paths from "../resources/paths";
import * as AuthService from "../services/auth-service";
import {
  useNavigate,
} from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";

type Props = {
  category: (query: string) => void;
  className?: string;
};

const Sidebar = (props: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  let smallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation("common");
  const isUser = currentUser?.userType === "user";

  useEffect(() => {
    if (smallScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [smallScreen]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    const response = await AuthService.logout();
    console.log(response);

    if (response !== null) {
      dispatch(signOut());
      navigate(Paths.loginPath);
    }
  };

  const takeToHomePage = () => {
    props.category("");
    navigate(Paths.homePath);
  };
  const takeToProfilePage = () => {
    props.category("");
    navigate(Paths.userDetailsPath);
  };

  const taketoLoginPage = () => {
    navigate(Paths.loginPath);
  };

  const takeToSettingsPage = () => {
    navigate(Paths.settingsPath);
  };

  const takeToContactPage = () => {
    navigate(Paths.contactUs);
  };

  const setCategoryFilter = (title: string) => {
    // props.category(e.arguments);
    props.category(title);
    navigate(Paths.homePath);
  };

  const showRegisteredCourses = () => {
    navigate(Paths.userCourses);
  };

  const goToAddCoursePage = () => {
    navigate(Paths.addCoursePath);
  };
  const Menus = [
    { title: t("Dashboard"), icon: <RiDashboardLine /> },
    {
      title: t("Categories"),
      icon: <BsList />,
      submenu: true,
      submenuItems: [
        { title: "Digital Marketing" },
        { title: "Data Science" },
        { title: "Writing" },
        { title: "Psychology" },
        { title: "Finance" },
        { title: "Programming" },
        { title: "Cooking" },
        { title: "Design" },
        { title: "Project Management" },
        { title: "Spanish" },
        { title: "Environmental Science" },
      ],
    },
    ...(currentUser
      ? [
          ...(isUser
            ? [{ title: t("My Courses"), icon: <BsBookmarkStar /> }]
            : [{ title: t("Add Course"), icon: <BsBookmarkStar /> }]),
        ]
      : []),
    { title: t("Contact"), icon: <AiTwotoneMail /> },
    { title: t("Settings"), spacing: true, icon: <RiSettings5Line /> },
    ...(currentUser
      ? [{ title: t("Logout"), icon: <RiLogoutCircleRLine /> }]
      : [{ title: t("Login"), icon: <RiLoginCircleLine /> }]),
  ];

  return (
    <div className="min-h-full">
      <div
        className={`h-full p-3 space-y-2 ${
          isSidebarOpen ? "w-60" : "w-24"
        } dark:bg-gray-900 dark:text-gray-100 duration-500 relative`}
      >
        <div
          className="flex items-center p-2 space-x-4 hover:cursor-pointer"
          onClick={takeToHomePage}
        >
          <img
            src={logo}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2
              className={`text-lg font-semibold origin-left duration-500 ${
                !isSidebarOpen && "scale-0"
              }`}
            >
              {t("Knowledge Forge")}
            </h2>
          </div>
        </div>
        <div>
          <BsArrowLeftCircle
            className={`bg-white text-black text-4xl absolute -right-4 top-20 rounded-full border duration-500 cursor-pointer ${
              !isSidebarOpen && "rotate-180"
            }`}
            onClick={toggleSidebar}
          />
        </div>
        <div className="divide-y dark:divide-gray-700">
          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <>
                <li
                  key={index}
                  className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 ${
                    menu.spacing ? "mt-14" : "mt-2"
                  } hover:bg-light_white rounded-md `}
                  onClick={() => {
                    if (menu.title === t("Logout")) {
                      handleLogout();
                    }
                    if (menu.title === t("Profile")) {
                      takeToProfilePage();
                    }
                    if (menu.title === t("Dashboard")) {
                      takeToHomePage();
                    }
                    if (menu.title === t("Categories")) {
                      takeToHomePage();
                    }
                    if (menu.title === t("Settings")) {
                      takeToSettingsPage();
                    }
                    if (menu.title === t("Login")) {
                      taketoLoginPage();
                    }
                    if (menu.title === t("My Courses")) {
                      showRegisteredCourses();
                    }
                    if (menu.title === t("Add Course")) {
                      goToAddCoursePage();
                    }
                    if (menu.title === t("Categories")) {
                      setSubmenuOpen(!isSubmenuOpen);
                    }
                    if (menu.title === t("Contact")) {
                      takeToContactPage();
                    }
                  }}
                >
                  <span
                    className={`text-2xl block justify-center duration-500 ${
                      !isSidebarOpen && "pl-4"
                    } `}
                  >
                    {menu.icon}
                  </span>
                  <span
                    className={`text-base font-medium flex-1 origin-left duration-200 ${
                      !isSidebarOpen && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && isSidebarOpen && (
                    <BsChevronDown
                      className=""
                      onClick={() => setSubmenuOpen(!isSubmenuOpen)}
                    />
                  )}
                </li>
                {menu.submenu && isSubmenuOpen && isSidebarOpen && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, index) => (
                      <li
                        onClick={() => setCategoryFilter(submenuItem.title)}
                        key={index}
                        className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 duration-500 hover:bg-light_white rounded-md`}
                      >
                        {submenuItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
