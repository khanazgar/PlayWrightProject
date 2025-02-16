const {test,expect} =require('@playwright/test')

test("Verify Application title", async function ({page}){

    console.log("Launching the Application");
    
    await page.goto("http://google.com")
    const url = await page.url()
    console.log("url is :"+url)

    const title = await page.title()
    console.log("title is :"+title)
    
    await expect (page).toHaveTitle("Google")



})
