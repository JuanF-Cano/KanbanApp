import { Router } from "express";
import { getSection, createSection, deleteSection, updateSection } from "../controllers/section-controllers.js";

const sectionRouter = Router();

sectionRouter.get("/section/:id_users", getSection); 

sectionRouter.post("/section", createSection);

sectionRouter.delete("/section/:id_section", deleteSection);

sectionRouter.put("/section/:id_section", updateSection);

export default sectionRouter