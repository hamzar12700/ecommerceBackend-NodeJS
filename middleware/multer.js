import multer from "multer";

const storage = multer.diskStorage({
    filename : function(req,file,callback){
        callback(null , file.originalname)
    }
})

const upload = multer({storage})
export default upload;



// Bilkul bhai, chhoti chhoti baaton me samjhaata hoon jaise beginner dost ko samjhaate hain. Tumhara code `multer` ka use kar raha hai — **file upload** ke liye. Ye mostly **images, PDFs, docs** ya koi bhi files ko server par store karne ke liye hota hai.

// ---

// ### 📦 Pehle ye samjho: `multer` hota kya hai?

// `multer` ek **Node.js middleware** hai jo Express ke sath use hota hai, **form-data** se file ko accept aur save karta hai (like uploads).

// ---

// ### ✅ Ab line by line breakdown:

// ```js
// import multer from "multer";
// ```

// 🟢 Ye multer ko import kar raha hai. Ye module file upload handle karta hai.

// ---

// ```js
// const storage = multer.diskStorage({
//     filename: function(req, file, callback){
//         callback(null, file.originalname)
//     }
// })
// ```

// 🟡 **`diskStorage`** batata hai ki file kaha aur kaise store hogi (disk pe).

// * `filename`: Ye function decide karta hai **file ka naam kya hoga** jab wo server me save hogi.

// #### Iska breakdown:

// * `req`: user ka request (isme body, file, etc hote hain)
// * `file`: upload hone wali file ka object hota hai (isme `originalname`, `mimetype`, `size`, etc.)
// * `callback`: multer ko batane ke liye function — `(error, filename)`

// ### 👇 Is line ka matlab:

// ```js
// callback(null, file.originalname)
// ```

// Yani: koi error nahi (null) aur file ko uske original naam se hi save karo.

// ---

// ```js
// const upload = multer({ storage })
// ```

// 🟢 Yahan hum `multer` ka ek instance bana rahe hain jisme bataya gaya hai ki storage kaise handle karna hai.

// ---

// ```js
// export default upload;
// ```

// 📤 Iska matlab ye instance `upload` ab baaki jagah use ho sakta hai (routes me).

// ---

// ### ✅ Example use in route:

// ```js
// import express from 'express';
// import upload from './upload.js';

// const router = express.Router();

// router.post('/upload', upload.single('file'), (req, res) => {
//     res.send({ message: 'File uploaded!', file: req.file });
// });
// ```

// Yahan `upload.single('file')` ka matlab hai:

// * Form ke input field ka name `file` hona chahiye
// * Sirf ek hi file accept karega

// ---

// ### 🧠 Recap (real-life example):

// Socho tumhara ek form hai jisme user image upload karta hai. Multer:

// * Us image ko accept karega
// * Uska naam same rakhte hue server ke folder me save karega

// ---

// Agar chaho to me isme destination folder, file type check, ya max size bhi add karke samjha sakta hoon. बस बोलो 😊
