
import React from "react";
import PropTypes from "prop-types";
import { components } from "react-select";
import { ArrowDown2 } from "iconsax-react";

const Option = (props) => {
    const { data } = props;

    return (
        <components.Option {...props}>
            <div className="flex items-center justify-between gap-2 py-1 w-full min-w-0 overflow-hidden">

                <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                    <div
                        className={`w-9 h-9 shrink-0 rounded-full ${data?.isUpi
                            ? "bg-purple-100" : data?.type === "BANK"
                                ? "bg-blue-100"
                                : data?.type === "CASH"
                                    ? "bg-green-100"
                                    : "bg-orange-100 text-orange-700"
                            } flex items-center justify-center`}
                    >
                        {data.icon}
                    </div>

                    <div className="flex-1 min-w-0 overflow-hidden">
                        <span className="block text-sm font-semibold text-[#222222] truncate">
                            {data.label}
                        </span>
                        {data.subLabel && (
                            <span className="text-xs text-[#6B7280] truncate">{data.subLabel}</span>
                        )}
                    </div>
                </div>

                {data.type && (
                    <span
                        className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-semibold ${data?.isUpi
                            ? "bg-purple-100 text-purple-700" : data.type === "BANK"
                                ? "bg-blue-100 text-blue-700"
                                : data.type === "CASH"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                            }`}
                    >
                        {data.type}
                    </span>
                )}
            </div>
        </components.Option>
    );
};

Option.propTypes = {
    data: PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
        subLabel: PropTypes.string,
        icon: PropTypes.node,
        isUpi: PropTypes.bool,
    }).isRequired,
};

const SingleValue = (props) => {
    const { data } = props;

    return (
        <components.SingleValue {...props}>
            <div className="flex items-center gap-2 w-full min-w-0 overflow-hidden">
                <div
                    className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center ${data?.isUpi
                        ? "bg-purple-100"
                        : data.type === "BANK"
                            ? "bg-blue-100"
                            : data.type === "CASH"
                                ? "bg-green-100"
                                : "bg-orange-100"
                        }`}
                >
                    {data.icon}
                </div>

                <div className="flex-1 min-w-0 overflow-hidden">
                    <span className="block text-sm font-medium truncate capitalize">
                        {data.label}
                    </span>
                    <span className="text-xs text-[#6B7280] truncate">{data.subLabel}</span>
                </div>
            </div>
        </components.SingleValue>
    );
};

SingleValue.propTypes = {
    data: PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.node,
        subLabel: PropTypes.string,
        isUpi: PropTypes.bool,
    }).isRequired,
};

const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
        <ArrowDown2 size={16} color="#6B7280" />
    </components.DropdownIndicator>
);

DropdownIndicator.propTypes = {
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
};

const GroupHeading = (props) => (
    <components.GroupHeading {...props}>
        <div className="px-2 py-1 text-xs font-medium text-[#6B7280]">
            {props.data.label}
        </div>
    </components.GroupHeading>
);

GroupHeading.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string,
    }).isRequired,
};

const IndicatorSeparator = () => null;

export {
    Option,
    SingleValue,
    DropdownIndicator,
    GroupHeading,
    IndicatorSeparator,
};
