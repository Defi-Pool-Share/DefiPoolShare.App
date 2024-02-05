export const useNav = () => {
  const stateNav = useState("stateNav", () => false);

  const toggleNav = () => {
    stateNav.value = !stateNav.value;
  };

  const navs = [
    { title: "nav.home", section: "#hm" },
    { title: "nav.paper", link: "https://cdn.defipoolshare.io/DeFiPoolShare_Whitepaper_V0.5.pdf" },
    { title: "nav.docs", link: "https://docs.defipoolshare.io" },
    { title: "nav.testnet", link: "#" },
    { title: "nav.github", link: "https://github.com/Defi-Pool-Share" },
    { title: "nav.team", link: "https://t.me/DefiPoolShare" },
  ];

  const subNav = [
    { title: "nav.paper", link: "https://cdn.defipoolshare.io/DeFiPoolShare_Whitepaper_V0.5.pdf" },
    { title: "nav.docs", link: "https://docs.defipoolshare.io" },
    { title: "nav.github", link: "https://github.com/Defi-Pool-Share" },
    { title: "nav.contact", link: "" },
  ];

  const asideNav = [
    // { title: "aside.home", link: "/app/home", icon: "ph:house-simple" },
    {
      title: "aside.pools",
      link: "/app/pools",
      icon: "carbon:load-balancer-pool",
    },
    {
      title: "aside.my_pools",
      link: "/app/mypools",
      icon: "carbon:load-balancer-pool",
    },
  ];

  return {
    stateNav,
    toggleNav,
    navs,
    subNav,
    asideNav,
  };
};
