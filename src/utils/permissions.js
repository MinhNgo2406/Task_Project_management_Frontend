export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  MEMBER: "Member",
  VIEWER: "Viewer",
};

export const permissions = {
  canCreateProject: ["Admin", "Manager"],
  canEditProject: ["Admin", "Manager"],
  canDeleteProject: ["Admin"],

  canCreateTask: ["Admin", "Manager"],
  canEditTask: ["Admin", "Manager", "Member"],
  canDeleteTask: ["Admin", "Manager"],

  canViewOnly: ["Viewer"],
};

export function hasPermission(userRole, action) {
  return permissions[action]?.includes(userRole);
}
