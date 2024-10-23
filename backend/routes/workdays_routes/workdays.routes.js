import { Router } from "express";

function WorkDaysFunc(
  WorkDaysController,
  CustomePasetoMiddleWare,
  CheckPermission,
  TokenController,
  userModel,
  adminModel,
  tokenRepos
) {
  const router = Router();
  const workDaysController = new WorkDaysController();
  // public
  router.get("/", async (req, res) => {
    workDaysController.getWorkDays(req, res);
  });

  router.use(async (req, res, next) => {
    CustomePasetoMiddleWare(
      req,
      res,
      next,
      TokenController,
      userModel,
      adminModel,
      tokenRepos
    );
  });
  router.use(async (req, res, next) => {
    CheckPermission(req, res, next);
  });

  //admin
  router.put("/", async (req, res) =>
    workDaysController.updateWorkDay(req, res)
  );

  return router;
}
export default WorkDaysFunc;
