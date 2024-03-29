import NextAuth, { getServerSession } from 'next-auth'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import GoogleProvider from 'next-auth/providers/google'

const adminEmails = [
    "mohamedibourki67@gmail.com"
]

export const auth0 = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        session: ({ session, token, user }) => {
            if (adminEmails.includes(session?.user?.email)) {
                return session
            } else {
                return false
            }
        }
    }
}

export default NextAuth(auth0)

export async function isAdminRequest(req, res) {
    try {
        const session = await getServerSession(req, res, auth0);
        if (!adminEmails.includes(session?.user?.email)) {
            res.status(401)
            res.end
            throw new Error("not an admin");
        }
    } catch (error) {
        res.status(401).send("You are not an admin");
    }
}