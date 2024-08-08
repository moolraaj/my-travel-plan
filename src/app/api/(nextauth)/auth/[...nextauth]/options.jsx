import { DbConnect } from '@/database/database';
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
          email: user.email,
          role: user.role || 'user',
          phoneNumber: user.phoneNumber,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'User Credentials',
      credentials: {
        phoneNumber: {
          label: 'Phone Number',
          type: 'text',
          placeholder: 'Enter your phone number',
        },
        otp: {
          label: 'OTP',
          type: 'text',
          placeholder: 'Enter your OTP',
        },
      },
      async authorize(credentials) {
        await DbConnect();
        const user = await OtpUserModel.findOne({ phoneNumber: credentials?.phoneNumber });

        if (user) {
          return {
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: 'user',
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

export default authOptions;
