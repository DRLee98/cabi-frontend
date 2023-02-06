import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { TOKEN } from "./commonConstants";

const token = localStorage.getItem(TOKEN);
export const isLoginVar = makeVar(Boolean(token));
export const tokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://cabi-backend.up.railway.app/graphql"
      : "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "wss://cabi-backend.up.railway.app/graphql"
      : "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      "x-jwt": tokenVar() || "",
    },
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": tokenVar() || "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLogin: {
            read() {
              return isLoginVar();
            },
          },
        },
      },
    },
  }),
});
