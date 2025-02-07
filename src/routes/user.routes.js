import { Router } from "express";
import {usercontroller} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../controllers/auth.middleware.js";

const router = Router();
router
.route("/register")
.post(upload.fields([
    {
        name : "avatar",
        maxCount: 1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),usercontroller.registerUser);

router.route("/login").post(usercontroller.loginUser);

// secured routes
router.route("/logout").post(verifyJwt, usercontroller.logoutUser);

export default router;