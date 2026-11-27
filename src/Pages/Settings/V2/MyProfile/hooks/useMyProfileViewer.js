import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROLE, roleKeyFromAccount } from "../lib/myProfilePermissions";
import { normaliseProperty, toArray } from "../lib/myProfileUtils";

/**
 * The signed-in user as the permission helper sees them, plus the property
 * list every tab needs.
 *
 * Properties are the owner's properties from GET /v2/hostel, read from the
 * same Redux list the sidebar property switcher uses (HOSTELLIST saga →
 * state.UsersList.hostelList). A property added in Manage PG shows up here as
 * soon as that list refreshes. The role comes from the account: roleId 1/2
 * is the Admin (full access). Until the account loads the viewer is treated
 * as plain staff (least privilege).
 */
export default function useMyProfileViewer() {
  const dispatch = useDispatch();
  const accountList = useSelector((state) => state.createAccount?.accountList);
  const hostelList = useSelector((state) => state.UsersList?.hostelList);
  const listStatusCode = useSelector((state) => state.UsersList?.hosteListStatusCode);
  const noHostelStatusCode = useSelector((state) => state.UsersList?.noHosteListStatusCode);
  // The saga's handleApiError reports failures here (it sets no list status).
  const networkError = useSelector((state) => state.createAccount?.networkError);
  const accessError = useSelector((state) => state.UsersList?.accessRestrictionError);

  const reloadProperties = useCallback(() => {
    dispatch({ type: "CLEAR_NETWORK_ERROR" });
    dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
    dispatch({ type: "HOSTELLIST" });
  }, [dispatch]);

  // Refresh once on open so a property added elsewhere is listed.
  useEffect(() => {
    reloadProperties();
  }, [reloadProperties]);

  const properties = useMemo(() => toArray(hostelList).map(normaliseProperty), [hostelList]);
  // Sidebar resets the list status codes shortly after they arrive, so latch
  // "loaded" once one is seen (an empty list would otherwise load forever).
  const seenStatus = useRef(false);
  if (listStatusCode || noHostelStatusCode) seenStatus.current = true;
  const loaded = properties.length > 0 || seenStatus.current;

  const viewer = useMemo(() => {
    const account = accountList || {};
    return {
      id: account.userId ?? account.id ?? null,
      name: [account.firstName, account.lastName].filter(Boolean).join(" "),
      role: account.roleId || account.roleName ? roleKeyFromAccount(account) : ROLE.STAFF,
      propertyIds: properties.map((property) => property.id),
      // Raw account row, for the viewer's own entry in the Masters list.
      account,
    };
  }, [accountList, properties]);

  const failure = !loaded && (networkError || accessError);
  let propertiesStatus = "loading";
  if (loaded) propertiesStatus = "ready";
  else if (failure) propertiesStatus = "error";

  return {
    viewer,
    properties,
    propertiesStatus,
    propertiesError: failure ? String(failure) : "",
    reloadProperties,
  };
}
