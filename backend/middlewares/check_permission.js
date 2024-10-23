import ErrorCustome from "../utilities/error.js";
const routes_admin={"/service":["*"],"/admin":["*"],
    '/appointments/day':["get"],
    '/appointments/month':["get"],
    "/services/delete-service":["delete"],
    "/services":["post"],
    "/services/update-service":["put"],
    "/workdays":["*"],
};
const route_user={
    '/appointments/user/':["get"],
    "/review":["post"],
    "/user":["*"]

}
const both={'/appointments':["post"],
    "/review":["get"],
    '/appointments/cancel':["delete"],
    "/review":["get"],
    "/services":["get"],
    "/appointments/available-times/":["get"],
}

export default function CheckPermission(req, res, next) {
    console.log(req.originalUrl)
   try{
    console.log((route_user[req.originalUrl]==null&&req.userType=="user"))
    if((routes_admin[req.originalUrl]==null&&req.userType=="admin")
        ||
    (route_user[req.originalUrl]==null&&req.userType=="user")||
    (req.userType=="admin"&&routes_admin[req.originalUrl].indexOf("*")==-1&&routes_admin[req.originalUrl].indexOf(req.method.toLower())==-1)||
    (req.userType=="user"&&route_user[req.originalUrl].indexOf("*")==-1&&route_user[req.originalUrl].indexOf(req.method.toLower())==-1)){
        let err={}
        err.res=new ErrorCustome("you do noth have permission","Check Permission",500);
        next(err);
        return;
    }
    console.log("hyyyyfrrrr")
    next();
   }
   catch(e){
    console.log(e);
   }
}