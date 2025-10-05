/**
 * Pre-submission validation script
 * Run before submitting to app stores
 */

import { execSync } from "child_process"
import * as fs from "fs"

interface CheckResult {
  name: string
  passed: boolean
  message: string
}

const checks: CheckResult[] = []

function addCheck(name: string, passed: boolean, message: string) {
  checks.push({ name, passed, message })
  console.log(`${passed ? "✅" : "❌"} ${name}: ${message}`)
}

// Check 1: Verify app.json exists and is valid
function checkAppJson() {
  try {
    const appJson = JSON.parse(fs.readFileSync("app.json", "utf8"))
    addCheck("app.json", true, "Valid configuration found")

    // Check required fields
    const requiredFields = ["name", "slug", "version"]
    requiredFields.forEach((field) => {
      if (!appJson.expo[field]) {
        addCheck(`app.json.${field}`, false, `Missing required field: ${field}`)
      }
    })

    // Check bundle IDs
    if (!appJson.expo.ios?.bundleIdentifier) {
      addCheck("iOS Bundle ID", false, "Missing iOS bundle identifier")
    } else {
      addCheck("iOS Bundle ID", true, appJson.expo.ios.bundleIdentifier)
    }

    if (!appJson.expo.android?.package) {
      addCheck("Android Package", false, "Missing Android package name")
    } else {
      addCheck("Android Package", true, appJson.expo.android.package)
    }
  } catch (error) {
    addCheck("app.json", false, "Failed to parse app.json")
  }
}

// Check 2: Verify assets exist
function checkAssets() {
  const requiredAssets = [
    "assets/icon.png",
    "assets/splash.png",
    "assets/adaptive-icon.png", // Android
  ]

  requiredAssets.forEach((asset) => {
    const exists = fs.existsSync(asset)
    addCheck(`Asset: ${asset}`, exists, exists ? "Found" : "Missing")
  })
}

// Check 3: Verify no console.logs in production code
function checkConsoleLogs() {
  try {
    const result = execSync('grep -r "console.log" src/', { encoding: "utf8" })
    const count = result.split("\n").filter((line) => line.trim()).length
    addCheck("Console Logs", false, `Found ${count} console.log statements - remove for production`)
  } catch {
    addCheck("Console Logs", true, "No console.log statements found")
  }
}

// Check 4: Verify environment variables
function checkEnvVars() {
  try {
    const envContent = fs.readFileSync(".env", "utf8")
    const requiredVars = ["EXPO_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_ANON_KEY"]

    requiredVars.forEach((varName) => {
      const hasVar = envContent.includes(varName)
      addCheck(`Env Var: ${varName}`, hasVar, hasVar ? "Set" : "Missing")
    })
  } catch {
    addCheck("Environment Variables", false, ".env file not found")
  }
}

// Check 5: Verify no TypeScript errors
function checkTypeScript() {
  try {
    execSync("npx tsc --noEmit", { encoding: "utf8", stdio: "pipe" })
    addCheck("TypeScript", true, "No type errors")
  } catch (error: any) {
    const errors = error.stdout?.toString() || ""
    const errorCount = (errors.match(/error TS/g) || []).length
    addCheck("TypeScript", false, `Found ${errorCount} type errors`)
  }
}

// Check 6: Verify package.json scripts
function checkPackageJson() {
  try {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
    const requiredScripts = ["start", "build:ios", "build:android"]

    requiredScripts.forEach((script) => {
      const hasScript = pkg.scripts && pkg.scripts[script]
      addCheck(`Script: ${script}`, !!hasScript, hasScript ? "Defined" : "Missing")
    })
  } catch (error) {
    addCheck("package.json", false, "Failed to parse package.json")
  }
}

// Check 7: Verify no TODO comments
function checkTodos() {
  try {
    const result = execSync('grep -r "TODO" src/', { encoding: "utf8" })
    const count = result.split("\n").filter((line) => line.trim()).length
    addCheck("TODO Comments", count === 0, count === 0 ? "None found" : `Found ${count} TODO comments`)
  } catch {
    addCheck("TODO Comments", true, "No TODO comments found")
  }
}

// Check 8: Verify privacy policy exists
function checkPrivacyPolicy() {
  // Check if privacy policy URL is set
  try {
    const appJson = JSON.parse(fs.readFileSync("app.json", "utf8"))
    const hasPrivacyUrl = appJson.expo.web?.privacyUrl || appJson.expo.ios?.privacyUrl
    addCheck("Privacy Policy", !!hasPrivacyUrl, hasPrivacyUrl ? `Set: ${hasPrivacyUrl}` : "Missing privacy policy URL")
  } catch {
    addCheck("Privacy Policy", false, "Could not verify privacy policy")
  }
}

// Main execution
console.log("\n🔍 Running Pre-Submission Checks...\n")

checkAppJson()
checkAssets()
checkEnvVars()
checkTypeScript()
checkPackageJson()
checkConsoleLogs()
checkTodos()
checkPrivacyPolicy()

// Summary
console.log("\n" + "=".repeat(50))
const passedChecks = checks.filter((c) => c.passed).length
const totalChecks = checks.length
const allPassed = passedChecks === totalChecks

console.log(`\n📊 Results: ${passedChecks}/${totalChecks} checks passed`)

if (allPassed) {
  console.log("\n✅ All checks passed! Ready for submission.")
  console.log("\nNext steps:")
  console.log("1. Run: eas build --platform all --profile production")
  console.log("2. Run: eas submit --platform all --latest")
  process.exit(0)
} else {
  console.log("\n❌ Some checks failed. Please fix the issues above before submitting.")
  console.log("\nFailed checks:")
  checks
    .filter((c) => !c.passed)
    .forEach((c) => {
      console.log(`  - ${c.name}: ${c.message}`)
    })
  process.exit(1)
}
