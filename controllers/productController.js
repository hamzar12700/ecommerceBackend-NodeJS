

export const addProduct = async (req,res)=>{
   try {
       console.log("REQ FILES:", req.files);
     const {name , desc , price , images , category , subCategory , size , bestSeller } = req.body
    const image1 = req.files.image1 && req.files.image1[0] 
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    
    console.log(name , desc , price , images , category , subCategory , size , bestSeller );
    // console.log(image1 , image2 , image3 , image4);

    let image = [image1 , image2 , image3 , image4].filter((item)=> item !== undefined)
    console.log(image);
    res.json({})
    

   } catch (error) {
    console.log(error);
    res.send({sucess : false , message : error.message})
    
   }
}

export const listProduct = async(req,res)=>{
    
}

export const removeProduct = async (req,res)=>{
    
}

export const singleProduct = async (req,res)=>{
    
}