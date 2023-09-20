'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// These styles apply to every route in the application
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
const apiRoot='http://localhost:3001'
  const client = new ApolloClient({
    uri: `${apiRoot}/graphql`,
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
