export const requireLoginMiddleware = store => next => action => {
  if(action.type === "REQUIRE_LOGIN"){
    const url = action.payload.previousUrl;
    localStorage.setItem("url", url);
    return next(action);
  }
  return next(action);
}