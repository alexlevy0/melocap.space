// import { Loader } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Stack, useLocalSearchParams, useRouter } from "expo-router";
// import { Leva } from "leva";

// import { Experience } from "@/components/Avatar/Experience";
// import { UI } from "@/components/Avatar/UI";
// import { ChatProvider } from "@/hooks/useChat";
// export default function Search() {

// 	return (
// 		<>
// 			<ChatProvider>
// 				<Loader />
// 				<Leva hidden />
// 				<UI hidden={false} />
// 				<Canvas
// 					shadows
// 					camera={{ position: [0, 0, 1], fov: 30 }}
// 				>
// 					<Experience />
// 				</Canvas>
// 			</ChatProvider>
// 		</>
// 	);
// }

import * as React from 'react'
import { SafeAreaView } from 'react-native'
import { useFrame, Canvas } from '@react-three/fiber'

function Box() {
	const box = React.useRef()
	useFrame(() => (box.current.rotation.x = box.current.rotation.y += 0.01))
	return (
		<mesh ref={box}>
			<boxGeometry args={[1, 1, 1]} />
			<meshPhysicalMaterial color="blue" />
		</mesh>
	)
}

export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Canvas>
				<ambientLight />
				<pointLight position={[-1, 1, 1]} castShadow />
				<Box />
			</Canvas>
		</SafeAreaView>
	)
}