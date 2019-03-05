export const fetchUser = (userId) => (
  $.ajax({
    url: `/api/users/${userId}`,
    method: 'GET'
  })
);

export const fetchUsers = (userIds) => (
  $.ajax({
    url: `/api/users`,
    method: 'GET',
    data: { user_ids: userIds }
  })
);
