import productModel from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        console.log("Request received");
        console.log(req.body);

        const products = await productModel.create(req.body);

        console.log("Saved:", products);

        res.status(201).json({
            message: "Product created successfully",
            product: products
        });
    } catch (error) {
    console.log(error);
    console.log(error.message);

    res.status(400).json({
        message: error.message
    });
}
};
// get all products
export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update a product
export const updateProduct = async (req, res) => {
    try {
        const updated = await productModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true });
        res.status(200).json({ 
            message: "Product updated successfully",
            updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete a product
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ 
            message: "Product deleted successfully",
            deleted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


