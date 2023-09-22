'use client'
import { ApolloClient, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import { createUploadLink } from "apollo-upload-client";

// These styles apply to every route in the application
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const apiRoot='http://localhost:3001'
  const uploadLink = createUploadLink({
    uri: `${apiRoot}/graphql`,
  });
  const client = new ApolloClient({
    link: from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <html lang="ja">
      <body>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
