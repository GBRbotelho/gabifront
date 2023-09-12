import React from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";

export default function Sidebar({ isSidebarOpen }) {
  return (
    <div
      className={`lg:w-[20rem] ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <Card className="h-screen p-4 shadow-xl shadow-blue-gray-900/5">
        <List>
          <ListItem className="text-gray-500 text-lg">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-9 w-9 text-gray-500" />
            </ListItemPrefix>
            Clientes
          </ListItem>
          <ListItem className="text-gray-500 text-lg">
            <ListItemPrefix>
              <ShoppingBagIcon className="h-9 w-9 text-gray-500" />
            </ListItemPrefix>
            Serviços
          </ListItem>
          <ListItem className="text-gray-500 text-lg">
            <ListItemPrefix>
              <InboxIcon className="h-9 w-9 text-gray-500" />
            </ListItemPrefix>
            Produtos
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
