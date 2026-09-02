export const CustomStyles = {
  control: (base, state) => {
    const selectedValue = state.getValue()?.[0]?.value;

    const isActualSelected =
      state.hasValue && selectedValue && selectedValue !== "ALL";

    return {
      ...base,
      minHeight: "32px",
      height: "32px",
      width: "100%",
      border: `1px solid ${
        state.isFocused ? "#5865F2" : isActualSelected ? "#5865F2" : "#E5E5E5"
      }`,
      borderRadius: "8px",
      fontSize: "12px",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",

      backgroundColor: isActualSelected
        ? "#1E45E1"
        : state.isFocused
          ? "#FFFFFF"
          : "#F7F7F7",

      "&:hover": {
        borderColor: state.isFocused
          ? "#5865F2"
          : isActualSelected
            ? "#5865F2"
            : "#D1D5DB",

        backgroundColor: isActualSelected
          ? "#5865F2"
          : state.isFocused
            ? "#FFFFFF"
            : "#F0F0F0",
      },
    };
  },

  singleValue: (base, state) => {
    const selectedValue = state.getValue()?.[0]?.value;

    const isActualSelected = selectedValue && selectedValue !== "ALL";

    return {
      ...base,
      color: isActualSelected ? "#FFFFFF" : "#6B7280",
      fontWeight: 500,
    };
  },

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: "13px",
      padding: "6px 12px",

      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#FFFFFF",

      color: "#111827",
      cursor: "pointer",
      whiteSpace: "nowrap",
      overflow: "visible",
      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #5865F2",
        fontWeight: 500,
      }),

      "&:hover": {
        backgroundColor: "#F3F4F6",
      },
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "32px",
  }),

  dropdownIndicator: (base, state) => {
    const selectedValue = state.getValue()?.[0]?.value;

    const isActualSelected = selectedValue && selectedValue !== "ALL";

    return {
      ...base,
      padding: "4px",
      color: isActualSelected
        ? "#FFFFFF"
        : state.isFocused
          ? "#5865F2"
          : "#6B7280",

      "&:hover": {
        color: isActualSelected ? "#FFFFFF" : "#5865F2",
      },
    };
  },

  indicatorSeparator: () => ({
    display: "none",
  }),
};
