module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "cabi-backend",
      url: "https://cabi-backend.herokuapp.com/graphql",
    },
  },
};
