export default `
query GetMyPools($address: String) {
  positions(where: { owner: $address }) {
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
