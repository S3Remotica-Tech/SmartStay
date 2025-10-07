import { useSelector } from "react-redux";

export const useHasPermission = (moduleName, action = "canRead") => {
  const roleData = useSelector((state) => state.AssetList.getPermissionRoleList);

  if (!roleData?.rolesPermissionDetails) return false;
  const module = roleData.rolesPermissionDetails.find(
    (m) => m.moduleName === moduleName
  );
  return module ? module[action] : false;
};
