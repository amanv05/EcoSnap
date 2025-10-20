import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const HUGGING_FACE_API = process.env.HUGGING_FACE_API as string;

const classifyImage = async (imageUrl: string) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224",
      { inputs: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API}`,
          "Content-Type": "application/json",
        },
      }
    );
    const objectName = await response.data[0].label;
	  return objectName;

  } catch (e) {
    console.error("error while classifying image: ", e );
    throw e;
  }
};

export default classifyImage;
