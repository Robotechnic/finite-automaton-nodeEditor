import ghpages from "gh-pages"
import { execSync } from "child_process"

// build project
execSync("npm run format", { stdio: "inherit" })
execSync("npm run lint", { stdio: "inherit" })
execSync("npm run check", { stdio: "inherit" })
execSync("npm run build", { stdio: "inherit" })
execSync("grep -rl '/assets/' ./dist | xargs sed -i 's/\\/assets\\//\\/finite-automaton-nodeEditor\\/assets\\//g'", { stdio: "inherit" })

// deploy
ghpages.publish(
	"dist",
	{
		branch: "gh-pages",
		dotfiles: false,
		message: "Automatic deployment with gh-pages",
		remote: "origin",
		verbose: true,
		push: true,
		silent: false,
	},
	err => {
		if (err) {
			console.error(err)
		}
		// clean folder after deploy
		execSync("rm -rf dist", { stdio: "inherit" })
	}
)
