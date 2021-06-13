module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "cabia-backend",
      url: "https://cabia-backend.herokuapp.com/graphql",
    },
  },
};
