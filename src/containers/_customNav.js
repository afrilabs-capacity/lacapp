export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Events"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Manage Programmes",
    to: "/programmes/all",
    icon: "cil-drop",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["All Posts"],
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
    to: "/posts/all",
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
];
