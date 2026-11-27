import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reportApiError, resendInvite } from "../lib/myProfileService";
import { ACTION } from "../lib/myProfilePermissions";

/**
 * Which row action is open (drawer / modal) and how it runs. Resend invite
 * has no confirmation: it runs straight away with a toast. Everything else
 * opens its drawer or modal (see PersonActionsHost).
 */
export default function usePersonActions({ onChanged }) {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(null); // { action, person }
  const [busy, setBusy] = useState(false);

  /** Runs a service call; toast on success / error. Returns true on success. */
  const run = useCallback(
    async (call, successMessage) => {
      setBusy(true);
      try {
        await call();
        toast.success(successMessage);
        setCurrent(null);
        onChanged?.();
        return true;
      } catch (error) {
        toast.error(reportApiError(error, dispatch));
        return false;
      } finally {
        setBusy(false);
      }
    },
    [dispatch, onChanged],
  );

  const start = useCallback(
    (action, person) => {
      if (action === ACTION.RESEND_INVITE) {
        run(() => resendInvite(person), `Invite sent again to ${person.name}`);
        return;
      }
      setCurrent({ action, person });
    },
    [run],
  );

  const close = useCallback(() => {
    if (!busy) setCurrent(null);
  }, [busy]);

  return { current, start, close, run, busy };
}
