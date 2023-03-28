<script setup>
  import Scrollbar from 'smooth-scrollbar'

  const props = defineProps({
    target: {
      type: String,
      default: '#smooth'
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    delegate: {
      type: Boolean,
      default: true
    }
  })

  const { isMobileOrTablet, isFirefox, isSafari } = useDevice()

  /** 
   * Smooth scrollbar
   * Horizontal plugin 
   */
  class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
    transformDelta(delta, fromEvent) {
      if (!/wheel/.test(fromEvent.type)) {
        return delta
      }
      const {x, y} = delta
      if (this.scrollbar.options.plugin.horizontal === true) {
        return {
          y: 0,
          x: Math.abs(x) > Math.abs(y) ? x : y
        }
      } else {
        return {
          y:  Math.abs(y) > Math.abs(x) ? y : x,
          x: 0
        }
      }
    }
  }
  HorizontalScrollPlugin.pluginName = 'horizontalScroll' 

  /** 
   * Smooth scrollbar
   * Easing plugin 
   */
  class EdgeEasingPlugin extends Scrollbar.ScrollbarPlugin {
    constructor() {
      super(...arguments)
      this._remainMomentum = {
        x: 0,
        y: 0,
      }
    }
    transformDelta(delta) {
      const {limit, offset,} = this.scrollbar
      const x = this._remainMomentum.x + delta.x
      const y = this._remainMomentum.y + delta.y
      this.scrollbar.setMomentum(
        Math.max(-offset.x, 
        Math.min(x, limit.x - offset.x)), 
        Math.max(-offset.y, Math.min(y, limit.y - offset.y))
      )
      return {
        x: 0, 
        y: 0
      }
    }
    onRender(remainMomentum) {
      Object.assign(this._remainMomentum, remainMomentum)
    }
  }
  EdgeEasingPlugin.pluginName = 'edgeEasing'

  onMounted(() => {

    const { gsap, ScrollTrigger } = useGsap()

    let smooth = ''

    ScrollTrigger.batch('[data-reveal]', {
      interval: .1,
      batchMax: 10,
      onEnter: batch => gsap.to(batch, 1.5, {
        opacity: 1,
        y: 0,
        stagger:{
          each: .1,
          grid: [1,15]
        },
        ease:'power2.out',
        overwrite:true
      }),
      start: 'top bottom'
    })

    const html = qs('html')
    const body = qs('body')

    /** Damping option */
    let damping = .08

    /** if firefox */
    if (isFirefox) {
      damping = .1
      html.classList.add('firefox')
    }

    /** Fix class function */
    const fixClass = y => { y > 50 ? body.classList.add('fix') : body.classList.remove('fix') }

    /** Init smooth if not mobile */
    if (!isMobileOrTablet && !isSafari) {

      Scrollbar.use(EdgeEasingPlugin)

      let delegateDocument = document
      if (props.delegate) {
        delegateDocument = document
      }

      /** Init smooth scrollbar */
      smooth = Scrollbar.init(qs(props.target), {
        damping: damping,
        alwaysShowTracks: false,
        delegateTo: delegateDocument,
        direction: true
      })

      /** Remove default style */
      const style = qs('#smooth-scrollbar-style')
      if (style != null) {
        style.remove()
      }

      const scrollContent = qs('.scroll-content')

      /** Smooth listener */
      smooth.addListener(status => {

        ScrollTrigger.update
        ScrollTrigger.refresh()

        let y = status.offset.y
        let x = status.offset.x

        fixClass(y)

        scrollContent.style.left = x + 'px'

        if (props.horizontal) {
          html.classList.contains('stop') ? smooth.setPosition(sessionStorage.getItem('x' + props.target), 0) : sessionStorage.setItem('x' + props.target, x)
        }else{
          html.classList.contains('stop') ? smooth.setPosition(0, sessionStorage.getItem('y' + props.target)) : sessionStorage.setItem('y' + props.target, y)
        }

      })

      /** Grab style for scrollbar */
      const scrollbarTrackY = qs(".scrollbar-track-y")
      scrollbarTrackY.addEventListener("mousedown", () => {
        body.classList.add("grab")
      })
      document.addEventListener("mouseup", () => {
        if (body.classList.contains("grab")) {
          body.classList.remove("grab")
        }
      })
      body.addEventListener("wheel", e => {
        e.wheelDelta ? e.wheelDelta > 0 : e.deltaY < 0
      })

    } else {

      /** Add class global for mobile */
      html.classList.add('mob')

      /** Listener scroll for fix class */
      window.addEventListener('scroll', () => fixClass(window.scrollY))

    }
    
    const goButtons = qsa('[data-go]')
    goButtons.forEach(button => {
      button.addEventListener('click', () => {

        const targetId = button.dataset.go
        const targetElement = qs(targetId)

        if (targetElement) {
          const targetOffsetTop = targetElement.offsetTop + 5
          if (!isMobileOrTablet && !isSafari) {
            smooth.scrollTo(0, targetOffsetTop, 1000)
          } else {
            window.scrollTo({
              top: targetOffsetTop, 
              behavior: 'smooth'
            })
          }
        }
      })
    })

  })
</script>

<template>
  <div id="smooth" :class="horizontal ? 'hori' : ''">
    <div id="hm" class="rep"></div>
    <slot />
  </div>
</template>