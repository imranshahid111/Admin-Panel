import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  Category,
  createCategoryController,
  DeleteCategory,
  SingleCategory,
  updateCategoryController,
} from "./../controllers/createCategoryController.js";

const router = express.Router();

//routes
// create category
router.post( "/create-category" , createCategoryController );

router.put("/update-category/:id" , updateCategoryController );

router.get("/get-category" , Category);

router.get("/single-category/:slug" , SingleCategory);

router.delete("/delete-category/:id" ,DeleteCategory);

export default router