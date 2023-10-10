import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "755356685877-cl2pv1v3q0m6kcrevtm4nsiughre9jf8.apps.googleusercontent.com",
            clientSecret: "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",
        })
    ], callbacks: {
        async redirect({url, baseUrl}) {
            console.log(url);
            console.log(baseUrl);
            
            
            return "http://localhost:3000/google/auth";
        }
    }
});

export { handler as GET, handler as POST };