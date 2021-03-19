import mapboxgl from "mapbox-gl"
import { useRef, useState, useEffect } from "react"
//@ts-ignore
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import 'mapbox-gl/dist/mapbox-gl.css'

//@ts-ignore
mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZGUyMzMiLCJhIjoiY2ttN2YzeTFxMHhmbzJ2b2o2cHdtYmN5MyJ9.jMG5SOHve0NgU2aYqSX5BA'

export default () => {
    const mapContainer = useRef<HTMLDivElement>(null)

    const [lng, setLng] = useState(2.341960)
    const [lat, setLat] = useState(48.863129)
    const [zoom, setZoom] = useState(12)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        })
        
        map.on('move', () => {
            setLng(parseFloat(map.getCenter().lng.toFixed(4)))
            setLat(parseFloat(map.getCenter().lat.toFixed(4)))
            setZoom(parseFloat(map.getZoom().toFixed(2)))
        })

        const el = document.createElement('div')
        el.className = "w-4 h-4 bg-blue-500 rounded-full relative"
        el.style.animation = "pulse 1s infinite"
        new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)

        return () => {
            map.remove()
        }
    }, [])

    return [mapContainer, lng, lat, zoom] as const
}