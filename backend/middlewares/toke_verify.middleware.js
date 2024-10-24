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
    console.log(result, "hello from full result");
    console.log(result.tokenModel.type, "hello from type");
    req.typeUser = result.tokenModel.type;
    req.nameUser = result.name;
    req.userId = result.tokenModel._id;
    req.userEmail = result.tokenModel.email;
    req.userName = result.tokenModel.name;
    console.log(req.typeUser[0], "hello from token model");
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
