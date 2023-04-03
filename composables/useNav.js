export const useNav = () => {
  const stateNav = useState("stateNav", () => false);

  const toggleNav = () => {
    stateNav.value = !stateNav.value;
  };

  const navs = [
    { title: "nav.home", section: "#hm" },
    { title: "nav.about", section: "#st" },
    { title: "nav.roadmap", section: "#rm" },
    { title: "nav.tokenomics", section: "#tk" },
    { title: "nav.team", section: "#team" },
  ];

  const subNav = [
    { title: "subnav.app", link: "" },
    { title: "subnav.doc", link: "" },
    { title: "subnav.terms", link: "" },
    { title: "subnav.privacy", link: "" },
  ];

  const asideNav = [
    { title: "aside.home", link: "/app", icon: "ph:house-simple" },
    {
      title: "aside.my_pools",
      link: "/pools",
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
