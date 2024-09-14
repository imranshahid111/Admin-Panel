import fs from 'fs'
import ProductModel from '../models/ProductModel.js';
import slugify from 'slugify';


export const createPostController = async( req , res)=>{
    
    try {
        const {name ,slug ,description , price , category , quantity ,shipping}  = req.fields;
        const {image} = req.files;

        switch(true)
        {
            case !name :
                return res.status(500).send({error : "Name is required"})
            case !description :
                return res.status(500).send({error : "description is required"})
            case !price :
                return res.status(500).send({error : "price is required"})
            case !category :
                return res.status(500).send({error : "category is required"})
            case !quantity :
                return res.status(500).send({error : "quantity is required"})
            case image && image.size >1000000 :
                return res.status(500).send({error : "image is required and size will less then 1 mb"})
        }

        const products = new ProductModel({...req.fields , slug:slugify(name)})

        if (image){
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(200).send({
            success : true,
            message : "Product created",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in Create Product",
            error
        })
    }

}

export const getAllProducts = async( req ,res) =>{
    try {
        const products = await ProductModel.find({}).populate("category").select("-image").limit(12).sort({createdAt : -1})
        res.status(200).send({
            success : true,
            productCount : products.length,
            message : "All Products Displayed",
            products,
        })        
    } catch (error) {
        console.log(error )
    res.status(500).send({
        success : false,
        message : "Error in All Product get ",
        error,
    })
    }
}


export const getProduct = async(req ,res) =>{
    try {
        const product = await ProductModel.find({slug:req.params.slug}).populate("category").select("-image");
        res.status(200).send({
            success : true,
            message : "Product displayed",
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in getting item',
            error,
        })
    }
}


export const getPhotoOfProduct = async(req ,res) => {
  
    try {
        const productImage = await ProductModel.findById(req.params.pid).select("image");
        if(productImage.image.data){
            res.set("Content-Type" , productImage.image.contentType);
            return res.status(200).send(productImage.image.data);
        }
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success : false,
            message : "Get Image failed",
            error,
        })
        
    }
}


export const deleteProduct =async (req ,res) =>{
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-image");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "error in deletion",
            error,
        })

    }
}


export const updateProduct = async( req , res) =>{
    try {
        const {name ,slug ,description , price , category , quantity ,shipping}  = req.fields;
        const {image} = req.files;

        switch(true)
        {
            case !name :
                return res.status(500).send({error : "Name is required"})
            case !description :
                return res.status(500).send({error : "description is required"})
            case !price :
                return res.status(500).send({error : "price is required"})
            case !category :
                return res.status(500).send({error : "category is required"})
            case !quantity :
                return res.status(500).send({error : "quantity is required"})
            case image && image.size >1000000 :
                return res.status(500).send({error : "image is required and size will less then 1 mb"})
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.pid,
        {...req.fields , slug:slugify(name)},
        {new:true})

        if (image){
            products.image.data = fs.readFileSync(image.path);  
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(200).send({
            success : true,
            message : "Product created",
            products,
        })
    } catch (error) {
        console.log(500);
        res.status(500).send({
            success : false,
            message :"Error in Update Request",
            error,
        })
    }
}