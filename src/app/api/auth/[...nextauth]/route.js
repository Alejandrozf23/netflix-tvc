import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'Iv1.1477fea00c5ea43e',
            clientSecret: '2167b25baaca6410741890effcafd317bcdbd258'
        })
    ],
    callbacks : {
        async session({session, token, user}) {
            session.user.username = session?.user?.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();

            session.user.uid = token.sub;

            return session;
        }
    },
    secret: "default_secret_key"
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }