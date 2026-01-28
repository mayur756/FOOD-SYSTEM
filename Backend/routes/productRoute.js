import express from 'express'
import {
  addproduct,
  listproduct,
  removeproduct,
  singleproduct,
  updateproduct
} from '../controller/productController.js'
import upload from '../middleware/multer.js'
import adminauth from '../middleware/adminauth.js'

const productRouter = express.Router()

productRouter.post('/add', adminauth, upload.single('image'), addproduct)
productRouter.get('/list', listproduct)
productRouter.get('/single/:id', adminauth, singleproduct)
productRouter.patch('/update/:id', adminauth, upload.single('image'), updateproduct)
productRouter.delete('/remove/:id', adminauth, removeproduct)

export default productRouter