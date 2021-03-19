import { useState, useEffect } from "react"

export default (rootMargin = '0px') => {
    const [isIntersecting, setIntersecting] = useState(false)
    const [el, setEl] = useState<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!el) return

        const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin })
        observer.observe(el)

        return () => {
            observer.disconnect()
        }
    }, [el])
  
    return <const>[setEl, isIntersecting]
  }
  