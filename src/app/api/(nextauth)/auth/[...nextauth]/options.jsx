import { DbConnect } from '@/database/database';
import AdminModel from '@/model/adminModel';

import OtpUserModel from '@/model/otpUser';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    phoneNumber: user.phoneNumber,
                    role: user.role || 'user',  
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                phoneNumber: token.user.phoneNumber,
                role: token.user.role,
            };
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            name: 'User Credentials',
            credentials: {
                phoneNumber: {
                    label: 'phone number',
                    type: 'text',
                    placeholder: 'Enter your phone number',
                }
             
            },
            async authorize(credentials) {
                await DbConnect();
                const user = await OtpUserModel.findOne({ phoneNumber: credentials?.phoneNumber });

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),

        CredentialsProvider({
          name: 'Admin Credentials',
          credentials: {
              email: {
                  label: 'email',
                  type: 'email',
                  placeholder: 'Enter your email address',
              },
              password: {
                  label: 'password',
                  type: 'password',
                  placeholder: 'Enter your password',
              }
           
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
