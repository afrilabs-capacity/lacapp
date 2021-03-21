export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "danger btn-site-theme-bg",
      text: "NEW",
    },
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Reports"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Report",
    to: "/report/add",
    icon: "cil-drop",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Manage Reports",
    to: "/reports/checkpoint",
    icon: "cil-pencil",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Users"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users/add",
    icon: "cil-user-follow",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Audit"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Audit History",
    to: "/programmes/all",
    icon: "cil-drop",
  },
];
