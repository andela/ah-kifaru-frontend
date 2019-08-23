const comfirmAuth = (isAuthenticated, history) => {
  if (!isAuthenticated) {
    const redirectAfterLogin = history.location.pathname;
    history.push(`/login?next=${redirectAfterLogin}`);
  }
};

export default comfirmAuth;
