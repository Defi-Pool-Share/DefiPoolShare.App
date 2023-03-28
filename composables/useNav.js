export const useNav = () => {

  const stateNav = useState('stateNav', () => false)

  const toggleNav = () => {
    stateNav.value = !stateNav.value
  }

  const navs = [
    { title: 'nav.home', section: '#hm' },
    { title: 'nav.about', section: '#st' },
    { title: 'nav.roadmap', section: '#rm' },
    { title: 'nav.tokenomics', section: '#tk' },
    { title: 'nav.team', section: '#team' }
  ]

  const subNav = [
    { title: 'subnav.app', link: '' },
    { title: 'subnav.doc', link: '' },
    { title: 'subnav.terms', link: '' },
    { title: 'subnav.privacy', link: '' }
  ]

  const asideNav = [
    { title: 'aside.home', link: '/app', icon: 'ph:house-simple' },
    { title: 'aside.rubrique', link: '/', icon: 'ph:brackets-curly' },
    { title: 'aside.rubrique', link: '/', icon: 'ph:swimming-pool' },
    { title: 'aside.rubrique', link: '/', icon: 'ph:user-circle' },
    { title: 'aside.rubrique', link: '/', icon: 'ph:gear-six' }
  ]

  return {
    stateNav,
    toggleNav,
    navs,
    subNav,
    asideNav
  }

}