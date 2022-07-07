import mongoose, { ConnectOptions } from "mongoose";

const URI = process.env.MONGODB_URL;

const connect = () => {
	try {
		mongoose.connect(`${URI}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);
		console.log("Connect db successfully");
	} catch (error) {
		console.log("Connect db failed");
	}
};

export default { connect };
