export default `
query GetMyPools($address: String) {
  positions(where: { owner: $address }) {
    id
    owner
    depositedToken0
    depositedToken1
    withdrawnToken0
    withdrawnToken1
    token1 {
      id
      name
      poolCount
      symbol
    }
    token0 {
      id
      name
      poolCount
      symbol
    }
  }
}
`;
