"use client";

import { motion } from "framer-motion";

const routes = [
  { from: [77.1025, 28.7041], to: [88.3639, 22.5726] }, // Delhi to Kolkata
  { from: [77.1025, 28.7041], to: [72.8777, 19.076] },  // Delhi to Mumbai
  { from: [77.1025, 28.7041], to: [75.7873, 26.9124] }, // Delhi to Jaipur
  { from: [77.1025, 28.7041], to: [80.9462, 26.8467] }, // Delhi to Lucknow
  { from: [72.8777, 19.076], to: [78.4867, 17.385] },   // Mumbai to Hyderabad
  { from: [72.8777, 19.076], to: [73.8567, 18.5204] },  // Mumbai to Pune
  { from: [72.8777, 19.076], to: [72.5714, 23.0225] },  // Mumbai to Ahmedabad
  { from: [78.4867, 17.385], to: [80.2707, 13.0827] },  // Hyderabad to Chennai
  { from: [78.4867, 17.385], to: [77.5946, 12.9716] },  // Hyderabad to Bengaluru
  { from: [77.5946, 12.9716], to: [76.2673, 9.9312] },  // Bengaluru to Kochi
  { from: [88.3639, 22.5726], to: [91.7362, 26.1445] }, // Kolkata to Guwahati
  { from: [72.5714, 23.0225], to: [75.8577, 22.7196] }, // Ahmedabad to Indore
  { from: [75.8577, 22.7196], to: [78.4867, 17.385] },  // Indore to Hyderabad
  { from: [80.9462, 26.8467], to: [88.3639, 22.5726] }, // Lucknow to Kolkata
  { from: [75.7873, 26.9124], to: [72.8777, 19.076] },  // Jaipur to Mumbai
  { from: [75.7873, 26.9124], to: [80.2707, 13.0827] }, // Jaipur to Chennai
  { from: [75.7873, 26.9124], to: [77.5946, 12.9716] }, // Jaipur to Bengaluru
  { from: [75.7873, 26.9124], to: [81.6296, 21.2514] }, // Jaipur to Raipur
  { from: [75.7873, 26.9124], to: [75.8577, 22.7196] }, // Jaipur to Indore
  { from: [75.7873, 26.9124], to: [85.8245, 20.2961] }, // Jaipur to Bhubaneswar
  { from: [75.7873, 26.9124], to: [80.6480, 16.5062] }, // Jaipur to Vijayawada
  { from: [75.7873, 26.9124], to: [78.1198, 9.9252] }, // Jaipur to Madurai
  { from: [75.7873, 26.9124], to: [77.0047, 11.0168] }, // Jaipur to Coimbatore
  { from: [75.7873, 26.9124], to: [72.8357, 21.1702] }, // Jaipur to Surat
  { from: [75.7873, 26.9124], to: [80.9462, 26.8467] }, // Jaipur to Lucknow
  { from: [75.7873, 26.9124], to: [78.0421, 30.3165] }, // Jaipur to Dehradun
  { from: [75.7873, 26.9124], to: [73.0167, 26.2389] }, // Jaipur to Jodhpur
  { from: [75.7873, 26.9124], to: [83.3182, 17.6868] }, // Jaipur to Visakhapatnam
  { from: [75.7873, 26.9124], to: [85.1376, 25.5941] }, // Jaipur to Patna
  { from: [75.7873, 26.9124], to: [85.3096, 23.3441] }, // Jaipur to Ranchi 

  // Kolkata to West & South
  { from: [88.3639, 22.5726], to: [72.8777, 19.076] },  // Kolkata to Mumbai
  { from: [88.3639, 22.5726], to: [80.2707, 13.0827] }, // Kolkata to Chennai
  { from: [88.3639, 22.5726], to: [77.5946, 12.9716] }, // Kolkata to Bengaluru
  { from: [88.3639, 22.5726], to: [81.6296, 21.2514] }, // Kolkata to Raipur
  { from: [88.3639, 22.5726], to: [75.8577, 22.7196] }, // Kolkata to Indore
  { from: [88.3639, 22.5726], to: [85.8245, 20.2961] }, // Kolkata to Bhubaneswar
  { from: [88.3639, 22.5726], to: [80.6480, 16.5062] }, // Kolkata to Vijayawada
  { from: [88.3639, 22.5726], to: [78.1198, 9.9252] }, // Kolkata to Madurai
  { from: [88.3639, 22.5726], to: [77.0047, 11.0168] }, // Kolkata to Coimbatore
  { from: [88.3639, 22.5726], to: [72.8357, 21.1702] }, // Kolkata to Surat
  { from: [88.3639, 22.5726], to: [80.9462, 26.8467] }, // Kolkata to Lucknow
  { from: [88.3639, 22.5726], to: [78.0421, 30.3165] }, // Kolkata to Dehradun
  { from: [88.3639, 22.5726], to: [73.0167, 26.2389] }, // Kolkata to Jodhpur
  { from: [88.3639, 22.5726], to: [83.3182, 17.6868] }, // Kolkata to Visakhapatnam
  { from: [88.3639, 22.5726], to: [85.1376, 25.5941] }, // Kolkata to Patna
  { from: [88.3639, 22.5726], to: [85.3096, 23.3441] }, // Kolkata to Ranchi
  // Mumbai to South  
  { from: [72.8777, 19.076], to: [77.5946, 12.9716] },  // Mumbai to Bengaluru
  { from: [72.8777, 19.076], to: [76.2673, 9.9312] },   // Mumbai to Kochi
  { from: [72.8777, 19.076], to: [80.2707, 13.0827] },  // Mumbai to Chennai
  { from: [72.8777, 19.076], to: [72.5714, 23.0225] },  // Mumbai to Ahmedabad
  { from: [72.8777, 19.076], to: [85.8245, 20.2961] },  // Mumbai to Bhubaneswar
  { from: [72.8777, 19.076], to: [80.6480, 16.5062] },  // Mumbai to Vijayawada
  { from: [72.8777, 19.076], to: [78.1198, 9.9252] },  // Mumbai to Madurai
  { from: [72.8777, 19.076], to: [77.0047, 11.0168] },  // Mumbai to Coimbatore
  { from: [72.8777, 19.076], to: [72.8357, 21.1702] },  // Mumbai to Surat
  { from: [72.8777, 19.076], to: [80.9462, 26.8467] },  // Mumbai to Lucknow
  { from: [72.8777, 19.076], to: [78.0421, 30.3165] },  // Mumbai to Dehradun
  { from: [72.8777, 19.076], to: [73.0167, 26.2389] },  // Mumbai to Jodhpur
  { from: [72.8777, 19.076], to: [83.3182, 17.6868] },  // Mumbai to Visakhapatnam
  { from: [72.8777, 19.076], to: [85.1376, 25.5941] },  // Mumbai to Patna
  { from: [72.8777, 19.076], to: [85.3096, 23.3441] },  // Mumbai to Ranchi

  // North India connections
  { from: [77.1025, 28.7041], to: [76.7794, 30.7333] }, // Delhi to Chandigarh
  { from: [76.7794, 30.7333], to: [74.7973, 34.0837] }, // Chandigarh to Srinagar
];

export default routes;