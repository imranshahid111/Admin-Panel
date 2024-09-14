import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createPostController, deleteProduct, getAllProducts, getPhotoOfProduct, getProduct, updateProduct } from "../controllers/PostController.js";
import ExpressFormidable from "express-formidable";


const router = express.Router();

router.post ('/create-post' ,  ExpressFormidable()  , createPostController);
router.get('/get-all-product' , getAllProducts);
router.get('/get-product/:slug' , getProduct);
router.get('/get-photo/:pid',getPhotoOfProduct);
router.delete('/delete-product/:pid' , deleteProduct)
router.post('/update-product/:pid' ,requireSignIn , isAdmin , ExpressFormidable() , updateProduct);

export default router