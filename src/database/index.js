const { default: mongoose } = require("mongoose")

const connectToDb = async () => {
    const url = "mongodb+srv://arman2327:DpWHQeiwLDh1TCUT@cluster0.hkqd2zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(url).then(()=>{console.log("blog database successfully connected")}).catch((error)=> console.log(error))
}
 export default connectToDb