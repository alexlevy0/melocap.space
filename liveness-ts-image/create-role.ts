import { IAMClient, CreateRoleCommand, AttachRolePolicyCommand } from "@aws-sdk/client-iam"
import * as fs from "fs"

const roleName = "lambda-ex"
const policyArn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

const iamClient = new IAMClient({ region: "us-east-1" })

async function createRole() {
	try {
		const trustPolicy = fs.readFileSync("./trust-policy.json", "utf-8")

		const createRoleCommand = new CreateRoleCommand({
			RoleName: roleName,
			AssumeRolePolicyDocument: trustPolicy,
		})

		const createRoleResponse = await iamClient.send(createRoleCommand)
		console.log("Role created successfully:", createRoleResponse.Role?.Arn)

		await attachPolicyToRole(roleName, policyArn)
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating role:", error.message)
		} else {
			console.error("Unknown error creating role")
		}
	}
}

async function attachPolicyToRole(roleName: string, policyArn: string) {
	try {
		const attachPolicyCommand = new AttachRolePolicyCommand({
			RoleName: roleName,
			PolicyArn: policyArn,
		})

		await iamClient.send(attachPolicyCommand)
		console.log(`Policy ${policyArn} attached to role ${roleName} successfully.`)
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error attaching policy:", error.message)
		} else {
			console.error("Unknown error attaching policy")
		}
	}
}

createRole()
