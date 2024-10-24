import ErrorCustome from "../utilities/error.js";
export default async function CustomePasetoMiddleWare(
  req,
  res,
  next,
  TokenController,
  userModel,
  adminModel,
  tokenRepos,
  tokenModel
) {
  console.log("from token verify");
  let result = await new TokenController(
    userModel,
    adminModel,
    tokenRepos,
    tokenModel,
    next
  ).getPasetoUser(req.headers["token"]);
  if (result) {
    console.log(req.headers["token"], "this is token");
    req.typeUser = result.type;
    req.nameUser = result.name;
    req.userId = result.tokenModel._id;
    next();
    return;
  }
  let err = new Error();
  err.res = new ErrorCustome("there is an error in token", "", 500);
  console.log(err.res);
  console.log(req.headers["token"], "this is token");
  return;
}
//{"type":u.type,"name":u.name,"tokenModel":u}
