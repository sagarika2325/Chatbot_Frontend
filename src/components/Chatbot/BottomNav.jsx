import { useState } from "react";
import { HomeIcon, MessageSquareIcon, HelpCircleIcon, MegaphoneIcon } from "lucide-react";

export default function BottomNav() {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "Messages", icon: <MessageSquareIcon /> },
    { name: "Help", icon: <HelpCircleIcon /> },
    { name: "News", icon: <MegaphoneIcon /> },
  ];

  return (
    <div className="flex justify-around px-2 py-2 bg-white border-t rounded-t-2xl shadow-md">
      {navItems.map((item) => (
        <div
          key={item.name}
          className={`flex flex-col items-center px-3 py-1 cursor-pointer transition rounded-xl ${
            active === item.name ? "text-black font-bold" : "text-gray-500"
          }`}
          onClick={() => setActive(item.name)}
        >
          <div
            className={`p-2 rounded-md ${
              active === item.name ? "bg-black text-white" : ""
            }`}
          >
            {item.icon}
          </div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
