export const initPagination = (users, pagination) => {
  const { current, per } = pagination;

  const last = users.length / per;
  const toDisplay = pageContentSlicer(users, current, per);

  return {
    toDisplay,
    pagination: { ...pagination, last },
  };
};

export const pageContentSlicer = (users, page, per) => {
  const start = per * (page - 1);
  const end = per * page;

  return users.slice(start, end);
};
