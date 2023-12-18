
  export const USER_STATUS = {
    Active: "active",
    Blocked: "blocked",
  };

  export const checkUserStatus = (auth, status) => {
    const emptyAuth = Object.keys(auth).length === 0;
    if (emptyAuth) return false;
    return auth.status === status;
  };
