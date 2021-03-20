export const initPagination = (data, pagination) => {
  let { current, per } = pagination;

  const last = Math.ceil(data.length / per);
  current = last < current ? last : current;
  const toDisplay = pageContentSlicer(data, current, per);

  return {
    toDisplay,
    pagination: { ...pagination, last, current },
  };
};

export const pageContentSlicer = (data, page, per) => {
  const start = per * (page - 1);
  const end = per * page;

  return data.slice(start, end);
};
