import { DbConnect } from '@/database/database';
import AdminModel from '@/model/adminModel';
import OtpUserModel from '@/model/otpUser';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs'
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
      name: 'Admin Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
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

        if (admin && credentials?.password) {
          // Check if the password matches
          const isPasswordMatch = await bcryptjs.compare(credentials.password, admin.password);
          if (isPasswordMatch) {
            return {
              email: admin.email,
              role: 'admin',
            };
          }
        }

        return null;
      },
    }),
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
        console.log(`next auth user`)
        console.log(user)

        if (user) {
          return {
            phoneNumber: user.phoneNumber,
            role: 'user',
          };
        }

        return null;
      },
    }),
  ],
};

export default authOptions;
