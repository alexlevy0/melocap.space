import { Loader } from "@aws-amplify/ui-react"
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness"
import type { LivenessError } from "@aws-amplify/ui-react-liveness/dist/types/components/FaceLivenessDetector/service/types"
import "@aws-amplify/ui-react/styles.css"
import React from "react"

export function LivenessQuickStartReact() {
	const [loading, setLoading] = React.useState<boolean>(true)
	const [createLivenessApiData, setCreateLivenessApiData] = React.useState<{ sessionId: string } | null>(null)

	React.useEffect(() => {
		const fetchCreateLiveness: () => Promise<void> = async () => {
			try {
				// Making a POST request to the provided Lambda function URL
				const response = await fetch("https://tik525dl3evi2fihfjj37l7i7y0rfhoq.lambda-url.us-west-2.on.aws/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				})

				if (!response.ok) {
					throw new Error("Failed to create liveness session")
				}

				const data = await response.json()
				setCreateLivenessApiData(data)
			} catch (error) {
				console.error("Error fetching the sessionId:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchCreateLiveness()
	}, [])

	const handleAnalysisComplete: () => Promise<void> = async () => {
		if (!createLivenessApiData?.sessionId) {
			console.error("Session ID not available")
			return
		}

		try {
			const response = await fetch(`/api/get?sessionId=${createLivenessApiData.sessionId}`)
			const data = await response.json()

			// Handle the analysis result here
			console.log("Liveness analysis result:", data)
		} catch (error) {
			console.error("Error fetching the analysis result:", error)
		}
	}

	if (loading) {
		return <Loader />
	}

	const onError = (livenessError: LivenessError) => {
		console.error(livenessError)
	}

	return (
		<FaceLivenessDetector
			onError={onError}
			region="us-west-2"
			sessionId={createLivenessApiData?.sessionId || ''}
			onAnalysisComplete={handleAnalysisComplete}
		/>
	)
}