const{test,expect} =require("@playwright/test")

test("Login test", async function({page}) {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
    await page.getByPlaceholder('Username').fill("Admin")

    await page.locator("input[name='password']").fill("admin123")

    await page.locator("//button[@type='submit']").click()

    await page.waitForTimeout(5000)
    const url = await page.url()
    console.log("url :"+ url )
    
    await expect(page).toHaveURL(/dashboard/)

    await page.getByAltText("profile picture").first().click()
    await page.waitForTimeout(5000)

    await page.getByText("Logout").click()
    await page.waitForTimeout(3000)
    await expect(page).toHaveURL(/login/)

})