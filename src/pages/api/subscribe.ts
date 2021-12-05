import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from '../../services/stripe'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        // pegar o cliente logado
        const session = await getSession({ req })

        const customerStripe = await stripe.customers.create({
            email: session.user.email,
        });
        const checkoutSession = await stripe.checkout.sessions.create({

            payment_method_types: ['card'],
            billing_address_collection: 'required',
            customer: customerStripe.id,
            line_items: [
                { price: 'price_1JyiMaGzKajbbZPeHWIOJIhi', quantity: 1 },
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: 'http://loalhost:3000/posts',
            cancel_url: 'http://loalhost:3000/'
        });

        return res.status(200).json({ sessionId: checkoutSession.id })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}