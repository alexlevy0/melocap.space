"use client"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"

import { Feed } from "@/app/components/feed"
import { posts } from "@/app/data"
import {
	AccountSettings,
	Authenticator,
	Button,
	Card,
	CheckboxField,
	Divider,
	Flex,
	Grid,
	Heading,
	Loader,
	Menu,
	MenuItem,
	ThemeProvider,
	defaultDarkModeOverride,
	useAuthenticator,
	useTheme,
} from "@aws-amplify/ui-react"
import { getCurrentUser, signOut } from "aws-amplify/auth"
import React from "react"

export default function LoginMain() {
	return (
		<Authenticator.Provider>
			<Login></Login>
		</Authenticator.Provider>
	)
}

async function currentAuthenticatedUser() {
	try {
		const { username, userId, signInDetails } = await getCurrentUser()
		console.log(`The username: ${username}`)
		console.log(`The userId: ${userId}`)
		console.log(`The signInDetails: ${signInDetails}`)
	} catch (err) {
		console.log(err)
	}
}
function Login() {
	const router = useRouter()
	const params = useLocalSearchParams<{ q?: string }>()
	const filteredPosts = !params.q ? posts : posts.filter((post) => post.post.toLowerCase().includes(params.q.toLowerCase()))

	const { user } = useAuthenticator((context) => [context.user])
	const { authStatus } = useAuthenticator((context) => [context.authStatus])
	const { route, toSignIn, toSignUp } = useAuthenticator((context) => [context.route])
	const [showAccountSettings, setShowAccountSettings] = React.useState(false)
	const [showFeatures, setShowFeatures] = React.useState(false)
	const [renderAuth, setRenderAuth] = React.useState<"signIn" | "signUp" | undefined>(undefined)
	const { tokens } = useTheme()

	console.log({ user })

	React.useEffect(() => {
		if (![authStatus, route].includes("authenticated")) {
			return
		}
		setRenderAuth(undefined)

		currentAuthenticatedUser()
	}, [route, authStatus])

	const goSignIn = (): void => {
		toSignIn()
		setRenderAuth("signIn")
	}

	const goSignUp = () => {
		toSignUp()
		setRenderAuth("signUp")
	}

	const displayAccountSettings = () => {
		setShowAccountSettings(!showAccountSettings)
	}

	const upgrade = async () => {
		try {
			// const stripe = await loadStripe(
			// 	"pk_test_51OHZRzHjC5oFez5BiDFM3Up4nzlz0XkRwfHDXbxLjNqzJSLuBq0ZKwyrhVH26W1pVG18vHKPINzFoBhTPmy7EhGE00vtJ4cAF4",
			// )
			// console.log({ stripe })
			// const error = await stripe?.redirectToCheckout({
			// 	lineItems: [{ price: "price_1OHZaRHjC5oFez5B3xJk2zRS", quantity: 1 }],
			// 	mode: "subscription",
			// 	successUrl: "https://main.dvqngwodvr6ir.amplifyapp.com/",
			// 	cancelUrl: "https://main.dvqngwodvr6ir.amplifyapp.com/cancel",
			// })
			// console.log({ error })
		} catch (error) {
			console.error(error)
		}
	}

	const renderDashboard = () => {
		if (showFeatures) {
			return <Features />
		}
		return showAccountSettings ? (
			<Flex flex={1} direction="column" justifyContent="space-between">
				<Flex direction="column" justifyContent="space-between">
					<AccountSettings.ChangePassword onSuccess={noop} onError={noop} />
				</Flex>
				<Grid templateColumns=".4fr 1fr" columnGap="0.5rem">
					<AccountSettings.DeleteUser onError={noop} onSuccess={noop} />
					<Button variation="primary" loadingText="" onClick={displayAccountSettings}>
						Cancel
					</Button>
				</Grid>
			</Flex>
		) : (
			// : (
			// <Clip />
			// )
			<Flex flex={1} width={"100%"}>
				<Button variation="primary" loadingText="" onClick={() => signOut()}>
					Cancel
				</Button>
			</Flex>
		)
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: "Search",
					headerSearchBarOptions: {
						onChangeText: (event) => {
							// Update the query params to match the search query.
							router.setParams({
								q: event.nativeEvent.text,
							})
						},
					},
				}}
			/>
			{true ?? (
				<Authenticator.Provider>
					<Grid
						style={{ height: "100vh" }}
						columnGap={{ base: "0rem", large: "0.5rem" }}
						rowGap="0.5rem"
						templateColumns={{ base: "0fr 1fr", large: ".2fr 1fr" }}
						templateRows=".3fr 3.6fr .1fr"
					>
						<Card columnStart="1" columnEnd="-1" display="flex">
							<Flex
								flex={1}
								alignContent="center"
								alignItems="center"
								justifyContent="flex-start"
							>
								<Heading color={"#e8e6e3"} level={3} fontWeight="bold">
									Melo
								</Heading>
								<Heading
									display={{ base: "none", large: "block" }}
									// width={'100%'}
									color={"#e8e6e3"}
									level={6}
									fontWeight="bold"
								>
									La
								</Heading>
							</Flex>
							<Flex
								// flex={1}
								alignContent="center"
								alignItems="center"
								justifyContent="flex-end"
							>
								{authStatus === "authenticated" ? (
									<>
										<Button loadingText="" onClick={goSignIn}>
											Dashboard
										</Button>
										<Button loadingText="" onClick={upgrade}>
											Upgrade
										</Button>
										<Menu size="large" menuAlign="end">
											<MenuItem onClick={() => alert("Download")}>
												My Projects
											</MenuItem>
											<MenuItem
												isDisabled
												onClick={() => alert("Create a Copy")}
											>
												My Team
											</MenuItem>
											<MenuItem onClick={() => alert("Create a Copy")}>
												Usage
											</MenuItem>
											<MenuItem onClick={upgrade}>Upgrade</MenuItem>
											<Divider />
											<MenuItem onClick={displayAccountSettings}>
												Account Settings
											</MenuItem>
											<MenuItem onClick={() => signOut()}>
												Logout
											</MenuItem>
										</Menu>
									</>
								) : (
									<>
										<Button
											loadingText=""
											onClick={goSignIn}
											display={{ base: "none", large: "flex" }}
										>
											Login
										</Button>
										<Button
											display={{ base: "none", large: "flex" }}
											loadingText=""
											onClick={goSignUp}
										>
											Sign Up
										</Button>
										<Menu menuAlign="end" size="large">
											<MenuItem onClick={() => setShowFeatures(true)}>
												Features
											</MenuItem>
											<MenuItem onClick={displayAccountSettings}>
												API
											</MenuItem>
											<MenuItem onClick={upgrade}>Upgrade</MenuItem>
											<Divider />
											<MenuItem onClick={goSignIn}>Login</MenuItem>
											<MenuItem onClick={goSignUp}>Sign Up</MenuItem>
										</Menu>
									</>
								)}
							</Flex>
						</Card>
						<Card
							columnStart="1"
							columnEnd="2"
							variation="elevated"
							display={{ base: "none", large: "block" }}
						>
							{false ?? null}
						</Card>
						<Card
							borderRadius={{ base: "0px", large: "20px" }}
							marginRight={{ base: "0rem", large: "0.5rem" }}
							columnStart="2"
							columnEnd="-1"
							display="flex"
						>
							{renderDashboard()}
							{!!renderAuth && authStatus !== "authenticated" && (
								<Authenticator
									hideSignUp={renderAuth === "signIn"}
									loginMechanisms={["email"]}
									signUpAttributes={["email"]}
									variation="modal"
									initialState={renderAuth}
									socialProviders={["google"]}
									services={{
										async validateCustomSignUp(formData) {
											if (
												Object.keys(formData).length >= 3 &&
												!formData.acknowledgement
											) {
												return {
													acknowledgement:
														"You must agree to the Terms & Conditions",
												}
											}
										},
									}}
									components={{
										SignIn: {
											Footer() {
												return (
													<>
														<Flex
															paddingRight={
																tokens
																	.components
																	.authenticator
																	.form
																	.padding
															}
															paddingLeft={
																tokens
																	.components
																	.authenticator
																	.form
																	.padding
															}
															paddingBottom={
																tokens
																	.components
																	.button
																	.paddingBlockEnd
															}
														>
															<Button
																isFullWidth
																variation="link"
																onClick={() =>
																	setRenderAuth(
																		undefined,
																	)
																}
															>
																Cancel
															</Button>
														</Flex>
														<Authenticator.SignIn.Footer />
													</>
												)
											},
										},
										SignUp: {
											FormFields() {
												const {
													validationErrors,
												} = useAuthenticator()
												return (
													<>
														<Authenticator.SignUp.FormFields />
														<CheckboxField
															color={"white"}
															errorMessage={
																validationErrors.acknowledgement as string
															}
															hasError={
																!!validationErrors.acknowledgement
															}
															name="acknowledgement"
															value="yes"
															label="I agree with the Terms & Conditions"
														/>
														<Button
															variation="link"
															onClick={() =>
																setRenderAuth(
																	undefined,
																)
															}
														>
															Cancel
														</Button>
													</>
												)
											},
										},
									}}
								/>
							)}
						</Card>
						<Card columnStart="1" columnEnd="-1">
							Footer
						</Card>
					</Grid>
				</Authenticator.Provider>
			)}
		</>
	)
}
