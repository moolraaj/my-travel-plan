import { DbConnect } from '@/database/database';
import AdminModel from '@/model/adminModel';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    email: user.email,
                    role: user.role || 'user',  
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                email: token.user.email,
                role: token.user.role,  
            };
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter your password',
                },
            },
            async authorize(credentials) {
                await DbConnect();
                const admin = await AdminModel.findOne({ email: credentials?.email });

                if (admin) {
                    return admin;
                } else {
                    return null;
                }
            },
        }),
    ],
};

export default authOptions;
