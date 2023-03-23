const urlQueryParts = (data?: object | HTMLInputElement[]) => {
  if (!data) return "";

  if (Array.isArray(data)) {
    const query = data as HTMLInputElement[];
    console.log(query.map((type) => `${type.name}=${type.value}`));
    return "?" + query.map((type) => `${type.name}=${type.value}`).join("&");
  } else {
    const query = data as object;
    return Object.entries(query).length
      ? `/?${Object.entries(query)
          .filter(([prop, val]) => prop && val !== undefined && val !== null)
          .map(([prop, val]) => `${prop}=${val}`)
          .join("&")}`
      : "";
  }
};

export default urlQueryParts;
