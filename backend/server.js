import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());


//allows us to accept JSON data in the body
app.use('/api/products', productRoutes);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('*', (req, res) => res.sendFile
    (path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
}


connectDB();
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

//Rg9OXhalOtsMBniK
//mongodb+srv://dwilenggani25:Rg9OXhalOtsMBniK@cluster0.xjp5r.mongodb.net/
//mongodb+srv://dwilenggani25:<password>@cluster0.xjp5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
