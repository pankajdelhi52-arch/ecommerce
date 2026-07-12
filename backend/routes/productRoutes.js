import {
    createProduct, getProducts, updateProduct, deleteProduct
} from '../controllers/productController.js';
import express from 'express';
const router = express.Router();

router.post('/create', createProduct);
router.get('/list', getProducts);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
