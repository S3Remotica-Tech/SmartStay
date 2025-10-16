
export const customSelectStyles = (fontWeightCondition) => ({
  control: (base) => ({
    ...base,
    fontSize: "16px",
    color: "#4B4B4B",
    fontFamily: "Gilroy",
    fontWeight: fontWeightCondition ? 600 : 500,
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    boxShadow: "none",
    height: "50px",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "#f8f9fa",
    border: "1px solid #ced4da",
    fontFamily: "Gilroy",
  }),

  menuList: (base) => ({
    ...base,
    backgroundColor: "#f8f9fa",
    maxHeight: "120px",
    padding: 0,
    scrollbarWidth: "thin",
    overflowY: "auto",
    fontFamily: "Gilroy",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#9aa0a6",
    fontWeight: 500,
    opacity: 1,
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#555",
    cursor: "pointer",
  }),

  option: (base, state) => ({
    ...base,
    cursor: "pointer",
    backgroundColor: state.isFocused ? "lightblue" : "white",
    color: "#000",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
});
