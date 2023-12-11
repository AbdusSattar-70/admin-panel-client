
  export const USER_STATUS = {
    Active: "active",
    Blocked: "blocked",
  };

  export const checkUserStatus = (auth, status) => {
    const emptyAuth = Object.keys(auth).length === 0;
    if (emptyAuth) return false;
    return auth.status === status;
  };

  export const verifyNotAdmin = (auth, users) => {
    const emptyAuth = Object.keys(auth).length === 0;
    if (emptyAuth) return false;
    const isAdmin = users.find(
      (user) => user._id === auth.id && user.status !== USER_STATUS.Blocked);

    return !isAdmin;
  };