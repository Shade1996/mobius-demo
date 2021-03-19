import { Button } from '@material-ui/core'
import { Battery80, Lock, Room, Settings, Speed } from '@material-ui/icons'
import  React  from 'react'
import { LineChart, Line, XAxis, Legend } from "recharts"
import Bike3d from '../components/Bike3d'
import useOnScreen from '../hooks/useOnScreen'
import { homeScrollTop, page } from '../state'
//@ts-ignore
import bgSrc from "../assets/bg.jpg"

const data = [
    {
        name: "Mon",
        "global average": 4000,
        "your reduction": 2400,
    },
    {
        name: "Tue",
        "global average": 3000,
        "your reduction": 1398,
    },
    {
        name: "Wed",
        "global average": 2000,
        "your reduction": 9800,
    },
    {
        name: "Thu",
        "global average": 2780,
        "your reduction": 3908,
    },
    {
        name: "Fru",
        "global average": 1890,
        "your reduction": 4800,
    },
    {
        name: "Sat",
        "global average": 2390,
        "your reduction": 3800,
    },
    {
        name: "Sun",
        "global average": 3490,
        "your reduction": 4300,
    }
]

const Title: React.FC = ({ children }) => {
    return (
        <div className="text-md opacity-50 mt-12 mb-4  ">
            {children}
        </div>
    )
}

const Btn: React.FC<{ startIcon: any, fullWidth?: boolean, onClick?: () => void }> = ({ children, startIcon, fullWidth, onClick }) => {
    return (
        <Button size="small" startIcon={startIcon} className="bg-white bg-opacity-50 opacity-75 p-4 rounded-full" style={{
            width: fullWidth ? "100%" : "50%"
        }} onClick={onClick}>
            {children}
        </Button>
    )
}

export default function HomePage() {
    const [setChartVisible, chartVisible] = useOnScreen()

    return (
        <div className="w-screen h-screen overflow-hidden">
            <div className="w-full h-full absolute inset-0 bg-cover opacity-50" style={{ backgroundImage: `url(${bgSrc})` }} />
            <Bike3d />
            <div
             className="w-full h-full overflow-x-hidden overflow-y-scroll absolute inset-0"
             onScroll={e => homeScrollTop.value = (e.target as HTMLDivElement).scrollTop}
            >
                <div className="w-full h-full" />
                <div className="w-full min-h-full p-6 bg-blur text-center">

                    <Title>distance travelled</Title>
                    <div className="text-5xl font-bold opacity-75 leading-none" >
                        370km
                    </div>
                    
                    <Title>carbon footprint reduction</Title>
                    <div className="w-full overflow-hidden flex justify-center" ref={setChartVisible}>
                        {chartVisible && (
                            <LineChart width={window.innerWidth * 0.8} height={300} data={data}>
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} tickSize={0} />
                                <Legend />
                                <Line type="monotone" dataKey="your reduction" stroke="#8884d8" strokeWidth={2} />
                                <Line type="monotone" dataKey="global average" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                        )}
                    </div>

                    <Title />
                    <Btn startIcon={<Lock />} fullWidth>
                        tap to unlock
                    </Btn>
                    <div className="w-full flex mt-4">
                        <div className="w-1/2 relative overflow-hidden rounded-full">
                            <div className="absolute inset-0 bg-green-100 h-full" style={{ width: "80%" }} />
                            <Btn startIcon={<Battery80 />} fullWidth>battery: 80%</Btn>
                        </div>
                        <div className="w-2" />
                        <div className="w-1/2 relative overflow-hidden rounded-full">
                            <div className="absolute inset-0 bg-blue-100 h-full" style={{ width: "62%" }} />
                            <Btn startIcon={<Speed />} fullWidth>15.5km/h</Btn>
                        </div>
                    </div>
                    <div className="w-full flex mt-4">
                        <Btn startIcon={<Settings />}>assist lvl: 5</Btn>
                        <div className="w-2" />
                        <Btn startIcon={<Room />} onClick={() => page.value = "map"}>find my bike</Btn>
                    </div>
                </div>
            </div>
        </div>
    )
}
