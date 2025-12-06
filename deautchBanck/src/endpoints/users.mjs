import { Router } from "express";
import { registerUsers, loginUser, deleteUser} from "../utils/middleware/login.mjs";
import { authenticateToken} from "../utils/utilFunction.mjs";
import { sendJsonResponse } from "../utils/utilFunction.mjs";
import { checkIfUserHasPersonality, setUserPersonality } from "../utils/middleware/usersMiddleware.mjs";

const router = Router()

router.post("/register", registerUsers);
router.post("/login", loginUser);
// authenticateToken,
router.post("/personality", setUserPersonality, (req, res) => {
    if (req.personality) {
        return sendJsonResponse(res, true, 200, "Personality set succesfully", req.personality);
    } else {
        return sendJsonResponse(res, false, 404, "Couldn t set personality", null);
    }
});

// authenticateToken,
router.get("/personality", checkIfUserHasPersonality, (req, res) => {
    if (req.personality) {
        return sendJsonResponse(res, true, 200, "Personality fetched", req.personality);
    } else {
        return sendJsonResponse(res, false, 404, "Personality not set", null);
    }
});

// authenticateToken,
router.delete("/delete", deleteUser);


export default router;