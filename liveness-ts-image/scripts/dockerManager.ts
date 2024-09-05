import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import {
	DescribeImagesCommand,
	ECRClient,
	type ImageDetail,
} from "@aws-sdk/client-ecr";
import * as semver from "semver";
    
    const repositoryUri = process.env.EXPO_PUBLIC_ECR_URI || "";

    const imageName = "docker-image:test";
    const currentTagFile = path.resolve(__dirname, "../current_tag"); // Points to the root level
    
    async function getLatestTag(): Promise<string> {
	const client = new ECRClient({ region: "us-west-2" });
    
	try {
	    const command = new DescribeImagesCommand({
		repositoryName: "liveness-ts",
		filter: { tagStatus: "TAGGED" },
		maxResults: 100, // Increase if necessary
	    });
    
	    const response = await client.send(command);
    
	    if (response.imageDetails) {
		// Sort images by imagePushedAt to get the latest one
		const sortedImages = response.imageDetails.sort(
		    (a: ImageDetail, b: ImageDetail) => {
			if (a.imagePushedAt && b.imagePushedAt) {
			    return (
				b.imagePushedAt.getTime() -
				a.imagePushedAt.getTime()
			    );
			}
			return 0;
		    }
		);
    
		// Return the first tag of the most recent image
		const latestTag = sortedImages[0]?.imageTags?.[0];
		return latestTag || "0.0.0";
	    }
    
	    return "0.0.0";
	} catch (error) {
	    console.error("Error retrieving the latest tag:", error);
	    return "0.0.0";
	}
    }
    
    function incrementTag(tag: string): string {
	const newTag = semver.inc(tag, "patch");
	if (!newTag) {
	    throw new Error(`Failed to increment tag ${tag}`);
	}
	return newTag;
    }
    
    function writeCurrentTag(tag: string) {
	try {
	    fs.writeFileSync(currentTagFile, tag);
	} catch (error) {
	    console.error(`Error writing to ${currentTagFile}:`, error);
	    throw new Error(`Failed to write to ${currentTagFile}`);
	}
    }
    
    function getCurrentTag(): string {
	if (!fs.existsSync(currentTagFile)) {
	    // Create the file with a default tag if it doesn't exist
	    const defaultTag = "0.0.0";
	    writeCurrentTag(defaultTag);
	    console.log(`Created ${currentTagFile} with default tag ${defaultTag}`);
	    return defaultTag;
	}
    
	return fs.readFileSync(currentTagFile, "utf-8").trim();
    }
    
    async function createDockerTag() {
	const currentTag = getCurrentTag(); // Read the current tag from the file
	const newTag = incrementTag(currentTag); // Increment the tag
    
	// Tag the Docker image with the new tag
	execSync(`cd liveness-ts-image && docker tag ${imageName} ${repositoryUri}:${newTag}`);
    
	// Save the new tag to the file
	writeCurrentTag(newTag);
    
	console.log(`New Docker tag created: ${newTag}`);
    }
    
    function authenticateECR() {
	try {
	    execSync(`aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin ${repositoryUri}`, { stdio: 'inherit' });
	    console.log('Successfully authenticated with ECR.');
	} catch (error) {
	    console.error('Error during ECR authentication:', error);
	    process.exit(1);
	}
    }
    
    function pushDockerImage(tag: string) {
	// Reauthenticate with ECR
	authenticateECR();
    
	// Push the Docker image
	try {
	    execSync(`cd liveness-ts-image && docker push ${repositoryUri}:${tag}`, { stdio: 'inherit' });
	    console.log(`Docker image pushed: ${repositoryUri}:${tag}`);
	} catch (error) {
	    console.error('Error pushing Docker image:', error);
	    process.exit(1);
	}
    }
    
    async function main() {
	const command = process.argv[2];
    
	if (!command) {
	    console.error('Please provide a command: "tag" or "push"');
	    process.exit(1);
	}
    
	if (command === 'tag') {
	    await createDockerTag();
	} else if (command === 'push') {
	    const currentTag = getCurrentTag();
	    pushDockerImage(currentTag);
	} else {
	    console.error(`Unknown command: ${command}. Use "tag" or "push".`);
	    process.exit(1);
	}
    }
    
    main().catch((error) => {
	console.error('Error executing the script:', error);
	process.exit(1);
    });