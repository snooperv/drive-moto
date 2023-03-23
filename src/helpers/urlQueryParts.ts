const urlQueryParts = (data?: object) => {
  if (!data) return "";

  return Object.entries(data).length
    ? `?${Object.entries(data)
        .filter(([prop, val]) => prop && val !== undefined && val !== null)
        .map(([prop, val]) => `${prop}=${val}`)
        .join("&")}`
    : "";
};

export default urlQueryParts;
