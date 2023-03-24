export const controlQueries = (
  query: [string, string][],
  setSearchParams: (nextInit: [string, string][]) => void,
  param: string = "PageNumber",
  value: string = "1"
) => {
  let change = query.find((entry) => entry[0] === param);
  if (change) {
    query[query.indexOf(change)] = [param, value] as [string, string];
  } else {
    query.push([param, value]);
  }
  setSearchParams(query);
};

export const removeQueries = (props: {
  searchParams: URLSearchParams;
  name?: string;
  value?: string;
  excludeParams?: string[];
}) => {
  const newQuery = [];
  for (const entry of props.searchParams.entries()) {
    if (
      JSON.stringify(entry) !== JSON.stringify([props.name, props.value]) &&
      !props.excludeParams?.includes(entry[0])
    )
      newQuery.push(entry);
  }
  return newQuery;
};
