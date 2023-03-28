import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export const useGsap = () => {
  
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({
    ease: 'none'
  })
  gsap.config({
    nullTargetWarn: false
  })

  return {
    gsap,
    ScrollTrigger
  }

}