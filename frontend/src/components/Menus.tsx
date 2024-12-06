import {
  RiDashboardLine,
  RiLogoutCircleRLine,
  RiSettings5Line,
  RiLoginCircleLine,
} from "react-icons/ri";
import { BsBookmarkStar, BsList, BsPerson } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const { currentUser, loading, error } = useSelector(
  (state: RootState) => state.user
);

const Menus = [
  
  { title: "Dashboard", icon: <RiDashboardLine /> },
  {
    title: "Categories",
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
  { title: "Wishlist", icon: <BsBookmarkStar /> },
  { title: "Profile", icon: <BsPerson /> },
  { title: "Contact", icon: <AiTwotoneMail /> },
  { title: "Settings", spacing: true, icon: <RiSettings5Line /> },
  ...(currentUser
    ? [{ title: "Logout", icon: <RiLogoutCircleRLine /> }]
    : [{ title: "Login", icon: <RiLoginCircleLine /> }]),
];

export default Menus;
