import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;

    const train_body = {
        email: body.email,
        sample_prompt: body.prompt,
        training_images: body.trainingImages,
        reg_images: body.regularizationImages,
        base_model: body.baseModel
    }

    fetch('https://api.continuousargumentframework.com/train', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(train_body)
    })

};