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
        user.role = user.role == null ? 'user' : user.role;
        token.user = user;
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
      },
      async authorize(credentials) {
        await DbConnect();
        console.log('User credentials:', credentials);

        const user = await OtpUserModel.findOne({ phoneNumber: credentials?.phoneNumber });
        console.log('User found:', user);

        if (user) {
          return {
            email: user.email,
            role: 'user',
          };
        } else {
          console.log('Invalid credentials');
          return null;
        }
      },
    }),

    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email address',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        await DbConnect();
        console.log('Admin credentials:', credentials);
    
        const admin = await AdminModel.findOne({ email: credentials?.email });
    
        if (!admin) {
            console.log('Admin not found');
            return null;
        }
    
        const isPasswordMatch = await comparePassword(credentials?.password, admin.password);
    
        if (!isPasswordMatch) {
            console.log('Invalid password');
            return null;
        }
    
        return {
            email: admin.email,
            role: 'admin',
        };
    }
    
    }),
  ],
};

export default authOptions;
