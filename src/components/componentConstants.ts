import { FaSearch } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoStatsChart, IoPerson } from "react-icons/io5";

export const userNavIcons = [
  { item: FaHouse, content: "Home" },
  { item: FaSearch, content: "Search" },
  { item: IoStatsChart, content: "Real-Time Data" },
  { item: IoPerson, content: "Account" },
];

export const adminNavIcons = [userNavIcons[0], userNavIcons[1], userNavIcons[3]]
