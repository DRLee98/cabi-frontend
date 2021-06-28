module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "cabi-backend",
      url: "https://cabi-backend.herokuapp.com/graphql",
      // url: "http://localhost:4000/graphql",
    },
  },
};
