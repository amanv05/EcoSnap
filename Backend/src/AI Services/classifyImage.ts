import axios from "axios";

const classifyImage = async (imageUrl: string) => {
	const response = await axios.post("https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224",
		{
			headers: {
				"Authorization" : `Bearer${process.env.OBJ_KEY}`,
				"Content-Type": "image/jpeg"
			},
			body: imageUrl,
		}
	)
	const result = await response.data;
	return result
}

export default classifyImage
