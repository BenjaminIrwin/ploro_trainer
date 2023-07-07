import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let body = req.body;

    const train_body = {
        email: body.email,
        sample_prompt: body.prompt,
        training_images: body.trainingImages,
        negative_prompt: body.negativePrompt,
        base_model: body.baseModel,
        model_name: body.modelName
    }

    fetch('https://api.continuousargumentframework.com/train', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(train_body)
    })

    res.status(200).json({ message: 'Training started!' });

};