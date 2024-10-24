import ErrorCustome from "../utilities/error.js";
const routes_admin = {
  "/services": ["*"],
  "/admin": ["*"],
  "/appointments/day": ["get"],
  "/appointments/month/": ["get"],
  "/services/delete-service": ["delete"],
  "/services/update-service": ["put"],
  "/workdays": ["*"],
  "/appointments": ["post"],
  "/review": ["get"],
  "/appointments/available-times/": ["get"],
  "/appointments/cancel": ["delete"],
  "/appointments/user": ["get"],
};
const route_user = {
  "/appointments/user": ["get"],
  "/review": ["post"],
  "/user": ["*"],
  "/appointments": ["post"],
  "/review": ["get"],
  "/appointments/cancel": ["delete"],
  "/services": ["get"],
  "/appointments/available-times/": ["get"],
};
const both = {
  "/appointments": ["post"],
  "/review": ["get"],
  "/appointments/cancel": ["delete"],
  "/review": ["get"],
  "/services": ["get"],
  "/appointments/available-times/": ["get"],
};

export default function CheckPermission(req, res, next) {
  // console.log(req.originalUrl)
  // console.log(req.typeUser)
  console.log(req.typeUser, "hell from type");
  try {
    if (
      (routes_admin[req.originalUrl] == null && req.typeUser == "admin") ||
      (route_user[req.originalUrl] == null && req.typeUser == "user") ||
      (req.typeUser == "admin" &&
        routes_admin[req.originalUrl].indexOf("*") == -1 &&
        routes_admin[req.originalUrl].indexOf(req.method.toLowerCase()) ==
          -1) ||
      (req.typeUser == "user" &&
        route_user[req.originalUrl].indexOf("*") == -1 &&
        route_user[req.originalUrl].indexOf(req.method.toLowerCase()) == -1)
    ) {
      console.log("hello from inside if", req.originalUrl);
      console.log(req.typeUser);
      console.log(
        "hello from if statement block",

        routes_admin[req.originalUrl]
      );
      let err = {};
      err.res = new ErrorCustome(
        "you do noth have permission",
        "Check Permission",
        500
      );
      console.log(err.res);
      next(err);
      return;
    }
    // console.log("hyyyyfrrrr")
    console.log("after if");
    next();
    // res.send({"iii":677});
  } catch (e) {
    console.log(e.message, "from error");
    // console.log(e);
  }
}
