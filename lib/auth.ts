import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    // requireEmailVerification: true,
    // sendResetPassword: async ({ user, url }) => {
    //     await sendEmailAction({
    //       to: user.email,
    //       subject: "Reset Your Password",
    //       meta: {
    //         description: "Please click the link below to reset your password.",
    //         link: String(url),
    //       },
    //     });
    // },
  },
});
