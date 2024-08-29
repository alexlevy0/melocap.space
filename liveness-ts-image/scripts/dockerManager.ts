import { ECRClient, DescribeImagesCommand } from "@aws-sdk/client-ecr"
import { execSync } from "child_process"
import * as fs from "fs"
import * as semver from "semver"

const repositoryUri = "327852390890.dkr.ecr.us-west-2.amazonaws.com/liveness-ts"
const imageName = "docker-image:test"
const currentTagFile = "../current_tag"

export async function getLatestTag(): Promise<string> {
	const client = new ECRClient({ region: "us-west-2" })

	try {
		const command = new DescribeImagesCommand({
			repositoryName: "liveness-ts",
			filter: { tagStatus: "TAGGED" },
			maxResults: 1,
		})

		const response = await client.send(command)
		return response.imageDetails?.[0]?.imageTags?.[0] || "0.0.0"
	} catch (error) {
		console.error("Error retrieving the latest tag:", error)
		return "0.0.0"
	}
}

function incrementTag(tag: string): string {
	return semver.inc(tag, "patch") || "0.0.1"
}

export async function createDockerTag(): Promise<void> {
	try {
		const latestTag = await getLatestTag()
		const newTag = incrementTag(latestTag)

		execSync(`cd liveness-ts-image && docker tag ${imageName} ${repositoryUri}:${newTag}`)
		fs.writeFileSync(currentTagFile, newTag)

		console.log(`New Docker tag created: ${newTag}`)
	} catch (error) {
		console.error("Error creating Docker tag:", error)
	}
}
export function getCurrentTag(): string {
	if (!fs.existsSync(currentTagFile)) {
		console.error("No tag file found. Make sure to run the tag creation first.")
		process.exit(1)
	}
	return fs.readFileSync(currentTagFile, "utf-8").trim()
}

export function pushDockerImage(tag: string): void {
	try {
		execSync(`cd liveness-ts-image && docker push ${repositoryUri}:${tag}`, { stdio: "inherit" })
		console.log(`Docker image pushed: ${repositoryUri}:${tag}`)
	} catch (error) {
		console.error("Error pushing Docker image:", error)
	}
}

export async function main(): Promise<void> {
	const command = process.argv[2]

	if (!command) {
		console.error('Please provide a command: "tag" or "push"')
		process.exit(1)
	}

	switch (command) {
		case "tag":
			await createDockerTag()
			break
		case "push":
			pushDockerImage(getCurrentTag())
			break
		default:
			console.error('Invalid command. Use "tag" or "push".')
			process.exit(1)
	}
}

main().catch((error) => {
	console.error("An unexpected error occurred:", error)
	process.exit(1)
})
