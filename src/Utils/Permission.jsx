import { useSelector } from "react-redux";


const checkPermission = (roleData, moduleName, action = "canRead") => {
  if (!roleData || !Array.isArray(roleData?.rolesPermissionDetails)) return false;

  const module = roleData?.rolesPermissionDetails.find(
    (m) => m.moduleName === moduleName
  );

  return module ? !!module[action] : false;
};

export const useHasPermission = (moduleName) => {
  const roleData = useSelector((state) => state.AssetList.getPermissionRoleList);
  const isValidSubscription = useSelector((state) => state.UsersList?.hotelDetailsinPg.isSubscriptionActive);


 

  const canWriteModule =
   isValidSubscription && checkPermission(roleData, moduleName, "canWrite");
const canReadModule = checkPermission(roleData, moduleName, "canRead");
  // const canReadModule =
  //   isValidSubscription && checkPermission(roleData, moduleName, "canRead");
  const canUpdateModule =
   isValidSubscription && checkPermission(roleData, moduleName, "canUpdate");
  const canDeleteModule =
   isValidSubscription && checkPermission(roleData, moduleName, "canDelete");

  return {
    canWriteModule,
    canReadModule,
    canUpdateModule,
    canDeleteModule,
  };
};






