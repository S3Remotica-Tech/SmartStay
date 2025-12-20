// import { useSelector } from "react-redux";

// export const useHasPermission = (moduleName, action = "canRead") => {
//   const roleData = useSelector((state) => state.AssetList.getPermissionRoleList);

//   if (!roleData?.rolesPermissionDetails) return false;
//   const module = roleData.rolesPermissionDetails.find(
//     (m) => m.moduleName === moduleName
//   );
//   return module ? module[action] : false;
// };



// const canWriteSubscription = useHasPermission("Subscription", "canWrite");
//   const canReadSubscription = useHasPermission("Subscription", "canRead");
//   const canUpdateSubscription = useHasPermission("Subscription", "canUpdate");
//   const canDeleteSubscription = useHasPermission("Subscription", "canDelete");





// import { useSelector } from "react-redux";

// export const useHasPermissionCheck = (moduleName, action = "canRead") => {
//   const roleData = useSelector((state) => state.AssetList.getPermissionRoleList);

//  if (!roleData || !Array.isArray(roleData.rolesPermissionDetails)) return false;

//   const module = roleData.rolesPermissionDetails.find(
//     (m) => m.moduleName === moduleName
//   );

//   return module ? module[action] : false;
// };

// export const useHasPermission = (moduleName) => {
//   const canWriteSubscription = useHasPermissionCheck("Subscription", "canWrite");
//   const canReadSubscription = useHasPermissionCheck("Subscription", "canRead");
//  const canUpdateSubscription = useHasPermissionCheck("Subscription", "canUpdate");
//   const canDeleteSubscription = useHasPermissionCheck("Subscription", "canDelete");

//   const canWriteModule = !!canWriteSubscription && useHasPermissionCheck(moduleName, "canWrite");
//   const canReadModule = !!canReadSubscription && useHasPermissionCheck(moduleName, "canRead");
//   const canUpdateModule = !!canUpdateSubscription && useHasPermissionCheck(moduleName, "canUpdate");
//   const canDeleteModule = !!canDeleteSubscription && useHasPermissionCheck(moduleName, "canDelete");

//   return {
//     canWriteModule,
//     canReadModule,
//     canUpdateModule,
//     canDeleteModule,
//   };
// };



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
// console.log("isValidSubscription",isValidSubscription)
  // const canWriteSubscription = checkPermission(roleData, "Subscription", "canWrite");
  // const canReadSubscription = checkPermission(roleData, "Subscription", "canRead");
  // const canUpdateSubscription = checkPermission(roleData, "Subscription", "canUpdate");
  // const canDeleteSubscription = checkPermission(roleData, "Subscription", "canDelete");

 

  const canWriteModule =
   isValidSubscription && checkPermission(roleData, moduleName, "canWrite");
  const canReadModule =
    isValidSubscription && checkPermission(roleData, moduleName, "canRead");
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






