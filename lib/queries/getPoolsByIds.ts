export default `
query GetPoolsByIds($tokenIds: [String]) {
  positions(where: { id_in: $tokenIds }) {
    id
    owner
    depositedToken0
    depositedToken1
    token1 {
      id
      name
      symbol
    }
    token0 {
      id
      name
      symbol
    }
  }
}
`;
