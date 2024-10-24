import { Router } from "express";
function TokenRouteFunc(
  userModel,
  adminModel,
  TokenRepos,
  TokenController,
  tokenModel,
  BasicAuthMiddleware,
  adminRepos,
  userRepos,
  CustomePasetoMiddleWare,
  CheckPermission
) {
  const route = Router();
  route.delete(
    "/logout",
    (req, res, next) => {
      console.log("jjuuuytyr443322");
      try {
        CustomePasetoMiddleWare(
          req,
          res,
          next,
          TokenController,
          userModel,
          adminModel,
          TokenRepos,
          tokenModel
        );
      } catch (err) {
        console.log(err.message);
        res.send(err);
        return;
      }
    },

    (req, res, next) => {
      console.log("iu776654433eeerr");
      CheckPermission(req, res, next);
    },
    async (req, res, next) => {
      console.log("hhhyyt55444");
      let result = await new TokenController(
        userModel,
        adminModel,
        TokenRepos,
        tokenModel,
        next
      ).deleteUserToken(req.userId);
      res.send({ res: "done" });
      return;
    }
  );
  route.use((req, res, next) => {
    console.log(req.query);
    console.log("********************************");
    BasicAuthMiddleware(
      req,
      res,
      next,
      adminRepos,
      userRepos,
      userModel,
      adminModel
    );
  });
  route.post("/", async function (req, res, next) {
    console.log("");
    let result = null;
    console.log("heloow hhhyyy");
    if (req.headers["email"]) {
      result = await new TokenController(
        userModel,
        adminModel,
        TokenRepos,
        tokenModel,
        next
      ).createTokenByEmail(req.headers["email"]);
    } else {
      result = await new TokenController(
        userModel,
        adminModel,
        TokenRepos,
        tokenModel,
        next
      ).createTokenByRefresh(req.headers["token"]);
    }
    if (result) {
      result["userType"] = req.typeUser;
      res.send(result);
    }
  });
  return route;
}
export default TokenRouteFunc;
//constructor()
