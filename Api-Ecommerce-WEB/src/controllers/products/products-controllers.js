//variable admin
const isAdmin = true;
import Logger from "../../utils/Log4js.js";
const logger = Logger.loggerCustom;


import ProductsDaoMongoDb from "../../data_Persistence/daos/products/productsDaoMongoDb.js";

const contenedor = new ProductsDaoMongoDb();

const productsGet = async(req, res) =>{
    try {
        const product = await contenedor.getAll();
        console.log(product);
        product.length != 0 
          ? res.status(200).json(product)
          : res.status(404).send(logger.error("There are no products"));
    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}


const getProductByCategory = async(req,res) => {
    try{

        const { cat } = req.params;
        
        const products = await contenedor.getAll();

        const filteredProducts = products.filter((product) => product.categoria === cat);

        filteredProducts.length>0 ? res.status(200).json(filteredProducts) : res.status(404).json(message = `The products whit category: ${cat} was not found`);

    }catch(error){
        return res.status(500).send(logger.error(`${error}`))
    }
}

const productsGetById = async(req, res) =>{
    try {
        const product = await contenedor.getById(req.params.id);
        product 
          ? res.status(200).json(product)
          : res.status(404).json(message = `The product whit ID: ${id} was not found`);

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

const addProducts = async(req, res) =>{
    try {
        if(isAdmin == true){
            const productBody = req.body;
    
            try {
                await contenedor.save(productBody);
                res.status(200).json({mensaje: "New product added successfully", productBody});
                
            } catch (err) {
                res.status(404).send(logger.error(`There was a problem adding the product`));
            }
        }else{
            res.status(404).send(logger.error("no autorizada, debe logearse como admin"));
        }

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}

const deleteProducts = async(req, res) =>{
    try {
        
        if(isAdmin == true){
            const {id} = req.params;
            const product = await contenedor.deleteById(id);
    
            if(product != ""){
                res.status(200).json(`Product whit ID : ${id} was deleted successfully`);
            }
            
        }else{
            res.status(404).send(logger.error("no autorizada, debe logearse como admin"));
    
        }

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}


const updateProducts = async(req, res) =>{
    try {
        
        if(isAdmin == true){
            const {id} = req.params;
            const {body} = req;

            await contenedor.updateById(id, body);
            res.status(200).json({message: `Product whit ID : ${id} was modified successfully`});

        }else{
            res.status(404).send(logger.error("no autorizada debe logearse como admin"));
        }
    

    } catch (error) {
        return res.status(500).send(logger.error(`${error}`))
    }
}


export default {productsGet, productsGetById, addProducts, deleteProducts, updateProducts, getProductByCategory}