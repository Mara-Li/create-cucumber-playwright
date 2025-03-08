import { test, createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";

const { Given, When, Then } = createBdd(test);

Given("the user is on the form page", async ({ page }) => {
	await page.goto(
		"https://www.lambdatest.com/selenium-playground/simple-form-demo",
	);
});

When(
	"the user enters {string} into the message field",
	async ({ page }, message: string) => {
		await page.fill("#user-message", message);
	},
);

When("the user clicks the submit button", async ({ page }) => {
	await page.click("#showInput");
});

Then(
	"the message {string} should be displayed on the page",
	async ({ page }, message: string) => {
		const displayedMessage = await page.textContent("#message");
		expect(displayedMessage).toBe(message);
	},
);
