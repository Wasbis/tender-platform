import { LayoutDashboard, FileText, Briefcase, Database, Settings, Users, Activity } from "lucide-react";

export const MENU_ITEMS = [
  {
    label: "Main Menu",
    type: "header",
  },
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    type: "link",
  },
  {
    label: "Tender Intelligence",
    href: "/tenders",
    icon: FileText,
    type: "link", // Nanti bisa diubah jadi "section" kalau ada submenu
  },
  {
    label: "Operations Hub",
    type: "section",
    icon: Briefcase,
    items: [
      { label: "Task Board", href: "/operations/tasks" },
      { label: "Documents", href: "/operations/docs" },
    ],
  },
  {
    label: "Data Engine",
    href: "/intelligence",
    icon: Database,
    type: "link",
  },
];

export const SETTINGS_ITEMS = [
  {
    label: "Settings",
    type: "header",
  },
  {
    label: "User Management",
    href: "/settings/users",
    icon: Users,
    type: "link",
  },
  {
    label: "System Logs",
    href: "/settings/logs",
    icon: Activity,
    type: "link",
  },
];
