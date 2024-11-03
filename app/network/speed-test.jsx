// import { View, Text, Pressable, ScrollView } from "react-native";
// import { useState, useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as actions from "../../store/actions/speedtest";
// import SpeedTest from "../../services/SpeedTest";
// import SpeedGauge from "../../components/SpeedGauge";

// const SpeedTestScreen = ({ addSpeedTest, removeSpeedTest, history }) => {
//   const [testState, setTestState] = useState({
//     ping: 0,
//     download: 0,
//     upload: 0,
//     status: "Ready",
//     speed: 0,
//     metric: "...",
//     chartDownload: "",
//     chartUpload: "",
//     speedUnit: "Mbps",
//     speedoValue: 0,
//     provider: "",
//     location: "",
//     scanning: false,
//   });

//   const speedTestRef = useRef(null);

//   useEffect(() => {
//     initializeSpeedTest();
//   }, []);

//   const initializeSpeedTest = () => {
//     speedTestRef.current = new SpeedTest(updateCallback, finishCallback);
//   };

//   const updateCallback = (data) => {
//     setTestState((prev) => ({
//       ...prev,
//       ...data,
//       scanning: true,
//     }));
//   };

//   const finishCallback = (results) => {
//     setTestState((prev) => ({
//       ...prev,
//       scanning: false,
//       ...results,
//     }));

//     addSpeedTest({
//       timestamp: Date.now(),
//       ...results,
//     });
//   };

//   const startTest = () => {
//     setTestState((prev) => ({
//       ...prev,
//       scanning: true,
//       speed: 0,
//       ping: 0,
//       download: 0,
//       upload: 0,
//     }));
//     speedTestRef.current?.startScan();
//   };

//   const stopTest = () => {
//     speedTestRef.current?.stopScan();
//     setTestState((prev) => ({
//       ...prev,
//       scanning: false,
//     }));
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-900">
//       <View className="p-4">
//         <View className="bg-gray-800 rounded-lg p-4 mb-4">
//           <SpeedGauge
//             isActive={testState.scanning}
//             speed={testState.speedoValue}
//             status={testState.status}
//           />
//           <Text className="text-white text-center text-3xl font-bold mt-2">
//             {testState.speed.toFixed(1)} {testState.speedUnit}
//           </Text>
//           {testState.provider && (
//             <Text className="text-gray-400 text-center mt-2">
//               {testState.provider} - {testState.location}
//             </Text>
//           )}
//           <Pressable
//             onPress={testState.scanning ? stopTest : startTest}
//             className={`mt-6 p-4 rounded-full ${
//               testState.scanning ? "bg-red-600" : "bg-green-600"
//             }`}
//           >
//             <Text className="text-white text-center text-lg font-bold">
//               {testState.scanning ? "Stop Test" : "Start Test"}
//             </Text>
//           </Pressable>
//         </View>

//         <View className="bg-gray-800 rounded-lg p-4">
//           <Text className="text-white text-xl font-bold mb-4">
//             Test History
//           </Text>
//           {history.map((test) => (
//             <Pressable
//               key={test.timestamp}
//               onLongPress={() => removeSpeedTest(test.timestamp)}
//               className="border-b border-gray-700 py-3"
//             >
//               <Text className="text-gray-400">
//                 {new Date(test.timestamp).toLocaleString()}
//               </Text>
//               <View className="flex-row justify-between mt-1">
//                 <Text className="text-white">
//                   Download: {test.download} Mbps
//                 </Text>
//                 <Text className="text-white">Upload: {test.upload} Mbps</Text>
//               </View>
//               <Text className="text-gray-400">Ping: {test.ping} ms</Text>
//               {test.provider && (
//                 <Text className="text-gray-400">
//                   {test.provider} - {test.location}
//                 </Text>
//               )}
//             </Pressable>
//           ))}
//           {history.length === 0 && (
//             <Text className="text-gray-400 text-center">
//               No test history available
//             </Text>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const mapStateToProps = (state) => ({
//   history: state.speedtest.history,
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(SpeedTestScreen);
