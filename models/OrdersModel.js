import mongoose from 'mongoose';


const orderSchema = mongoose.Schema({
    userId : {  type : String , required : true},
    item : {  type : Array , required : true},
    amount : {  type : Number , required : true},
    address : {  type : Object , required : true},
    status : {  type : String , required : true},
    paymentMethod : {  type : String , required : true },
    payment : {  type : String , required : true , default : false },
    date : {type : Number , required : true}
})

export default mongoose.model('order', orderSchema)