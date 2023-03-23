const urlQueryParts = (data: object) => {
  if (!data) return "";

  const filters = String(data).length > 0 ? `${String(data)}` : "";

  return "?" + filters;
};

export default urlQueryParts;
