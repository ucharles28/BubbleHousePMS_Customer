import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { post } from '../../../helpers/ApiRequest'


const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: '93183711763-q06sgd1u4vg3dvdaibjs7dt8orh34487.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials

        const request = {
          email,
          password,
          isSocailAuth: false
        }
        const response = await post('Auth/Customer/SignIn', request)
        if (response.successful) {
          console.log(response.data)
          return response.data
        } else {
          throw new Error(response.data)
        }
      },
      pages: {
        signIn: "auth/login"
      },
      callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
          // update token
          // if (params.user?.role) {
          //   params.token.role = params.user.role;
          // }
          // // return final_token
          // return params.token;
          console.log(token)
          console.log(user)
          console.log(account)
          console.log(profile)
          console.log(isNewUser)
        }
      }
    })

  ],
}

export default (req, res) => NextAuth(req, res, options)