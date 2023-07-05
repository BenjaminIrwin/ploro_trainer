import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch('https://api.continuousargumentframework.com/models', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const text = await response.json();
        res.status(200).json(text);
    } catch (err) {
        res.status(400).json(err);
    }

};