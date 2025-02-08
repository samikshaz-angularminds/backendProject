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
router.route("/refresh-token").post(usercontroller.refreshAccessToken);
router.route("/change-password").post(verifyJwt,usercontroller.changeCurrentPassword);
router.route("/current-user").get(verifyJwt,usercontroller.getCurrentUser);
router.route("/update-account").patch(verifyJwt, usercontroller.updateAccountDetails);
router.route("/avatar").patch(verifyJwt,upload.single("avatar"),usercontroller.updateUserAvatar);
router.route("/coverImage").patch(verifyJwt, upload.single("coverImage"),usercontroller.updateUserCoverImage);

router.route("/channel/:username").get(verifyJwt, usercontroller.getUserChannelProfile);
router.route("/history").get(verifyJwt, getWatchHistory);

export default router;