export const useTokenomics = () => {

  const tokenomics = [
    { percent: 60, txt: 'tokenomics.liquidity' },
    { percent: 20, txt: 'tokenomics.team' },
    { percent: 10, txt: 'tokenomics.marketing' },
    { percent: 5, txt: 'tokenomics.collaboration' },
    { percent: 5, txt: 'tokenomics.reward' }
  ]

  return {
    tokenomics
  }

}