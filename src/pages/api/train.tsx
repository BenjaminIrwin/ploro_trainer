import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    //Parse the following fields:
    //email
    //prompt
    //negativePrompt
    //baseModel
    //trainingImages
    //regularizationImages

    let data = req.body;

    console.log(data);


};