"use client";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion } from "framer-motion";
import routes from "./AnimatedRoutes";
import { geoMercator } from "d3-geo";

const geoUrl = "/maps/india.json";

// Must precisely match the projectionConfig inside ComposableMap
const projection = geoMercator()
  .scale(1100)
  .center([82, 22.5])
  .translate([400, 300]);

const cities = [
  { name: "Delhi", coordinates: [77.1025, 28.7041] as [number, number] },
  { name: "Mumbai", coordinates: [72.8777, 19.076] as [number, number] },
  { name: "Hyderabad", coordinates: [78.4867, 17.385] as [number, number] },
  { name: "Bengaluru", coordinates: [77.5946, 12.9716] as [number, number] },
  { name: "Chennai", coordinates: [80.2707, 13.0827] as [number, number] },
  { name: "Kolkata", coordinates: [88.3639, 22.5726] as [number, number] },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225] as [number, number] },
  { name: "Pune", coordinates: [73.8567, 18.5204] as [number, number] },
  { name: "Jaipur", coordinates: [75.7873, 26.9124] as [number, number] },
  { name: "Lucknow", coordinates: [80.9462, 26.8467] as [number, number] },
  { name: "Indore", coordinates: [75.8577, 22.7196] as [number, number] },
  { name: "Guwahati", coordinates: [91.7362, 26.1445] as [number, number] },
  { name: "Kochi", coordinates: [76.2673, 9.9312] as [number, number] },
  { name: "Chandigarh", coordinates: [76.7794, 30.7333] as [number, number] },
  { name: "Srinagar", coordinates: [74.7973, 34.0837] as [number, number] },
  { name: "Raipur", coordinates: [81.6296, 21.2514] as [number, number] },
  { name: "Bhubaneswar", coordinates: [85.8245, 20.2961] as [number, number] },
  { name: "Vijayawada", coordinates: [80.6480, 16.5062] as [number, number] },
  { name: "Madurai", coordinates: [78.1198, 9.9252] as [number, number] },
  { name: "Coimbatore", coordinates: [77.0047, 11.0168] as [number, number] },
  { name: "Surat", coordinates: [72.8357, 21.1702] as [number, number] },
  { name: "Dehradun", coordinates: [78.0421, 30.3165] as [number, number] },
  { name: "Jodhpur", coordinates: [73.0167, 26.2389] as [number, number] },
  { name: "Visakhapatnam", coordinates: [83.3182, 17.6868] as [number, number] },
  { name: "Patna", coordinates: [85.1376, 25.5941] as [number, number] },
  { name: "Ranchi", coordinates: [85.3096, 23.3441] as [number, number] },  
];

function CurvedLine({ from, to, delay = 0 }: { from: [number, number], to: [number, number], delay: number }) {
  const start = projection(from);
  const end = projection(to);
  if (!start || !end) return null;

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dr = (Math.sqrt(dx * dx + dy * dy) * 1.5).toFixed(2);
  const path = `M ${start[0].toFixed(2)},${start[1].toFixed(2)} A ${dr},${dr} 0 0,1 ${end[0].toFixed(2)},${end[1].toFixed(2)}`;

  return (
    <g>
      <path d={path} fill="none" stroke="url(#arc-gradient)" strokeWidth={1} opacity={0.2} />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#arc-gradient)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 4.5,
          times: [0, 0.7, 1],
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
          delay
        }}
      />
    </g>
  );
}

export default function IndiaDistributionMap() {
  return (
    <div className="relative w-full h-full min-h-[230px] flex flex-col justify-center items-center p-2">
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1100,
            center: [82, 22.5],
          }}
          width={800}
          height={600}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1672AE" />
              <stop offset="100%" stopColor="#3DBB5A" />
            </linearGradient>
          </defs>

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F2F7FB"
                  stroke="#D0E3F0"
                  strokeWidth={1}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#E2F0F9", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {routes.map((route, index) => (
            <CurvedLine 
              key={index} 
              from={route.from as [number, number]} 
              to={route.to as [number, number]} 
              delay={index * 0.4} 
            />
          ))}

          {cities.map((city, index) => (
            <Marker key={city.name} coordinates={city.coordinates}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <circle r={4} fill="#1672AE" stroke="white" strokeWidth={1.5} />
              </motion.g>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <div style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.1rem",
          fontWeight: 800,
          background: "var(--gradient-brand)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.05em"
        }}>
          PAN INDIA
        </div>
        <div style={{
          fontFamily: "var(--font-heading)",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--gray-400)",
          textTransform: "uppercase",
          letterSpacing: "0.1em"
        }}>
          Distribution Network
        </div>
      </div>
    </div>
  );
}
