import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DsButton, DsIcons, DsTimelineItem, DsDrawer } from "../../../../../DesignSystem";
import Skeleton from "../../../../../Utils/Skeleton";
import { getActivity, reportApiError } from "../lib/myProfileService";
import { timeAgo } from "../lib/myProfileUtils";

/** View activity / View my activity: recent actions as a timeline. */
function ActivityDrawer({ person, onClose }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setStatus("loading");
    getActivity(person)
      .then((list) => {
        setItems(list);
        setStatus("ready");
      })
      .catch((err) => {
        setError(reportApiError(err, dispatch));
        setStatus("error");
      });
  }, [person, dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <DsDrawer
      title={person ? `${person.name} · activity` : "My activity"}
      description="Sign-ins and changes, newest first."
      onClose={onClose}
      footer={
        <>
          <span className="flex-1" />
          <DsButton size="md" onClick={onClose}>
            Close
          </DsButton>
        </>
      }
    >
      {status === "loading" && (
        <div className="flex flex-col gap-[16px]" aria-busy="true">
          {[0, 1, 2, 3].map((key) => (
            <Skeleton key={key} className="h-[20px] w-full" />
          ))}
        </div>
      )}
      {status === "error" && (
        <div role="alert" className="flex flex-col items-start gap-[8px]">
          <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">{error}</p>
          <DsButton onClick={load}>Retry</DsButton>
        </div>
      )}
      {status === "ready" && items.length === 0 && (
        <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">No activity yet.</p>
      )}
      {status === "ready" && items.length > 0 && (
        <ol className="m-0 flex list-none flex-col p-0">
          {items.map((item, index) => (
            <DsTimelineItem
              key={item.id}
              icon={item.tone === "stage" ? DsIcons.arrowRight : DsIcons.bell}
              tone={item.tone}
              who={item.who}
              what={item.what}
              when={timeAgo(item.when)}
              last={index === items.length - 1}
            />
          ))}
        </ol>
      )}
    </DsDrawer>
  );
}

ActivityDrawer.propTypes = {
  person: PropTypes.shape({ name: PropTypes.string.isRequired }),
  onClose: PropTypes.func.isRequired,
};

export default ActivityDrawer;
