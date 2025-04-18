const{test,expect} =require("@playwright/test")

test("Login test", async function({page}) {

    await page.goto("https://stg.newyorker.com/v2/offers/mot-v2-tny-test-2/")
    
    await page.getByRole('button', { name: 'I Accept' }).click();

    await page.getByRole('button', { name: 'Subscribe' }).click();

    await page.getByTestId('text-input').fill("helloxyz@gmail.com");

    await page.getByLabel('Sign up for <i>The New Yorker').click();

    await page.getByTestId('continue-cta-desktop').click();
    await page.waitForTimeout(3000);
    await page.getByTestId('radio-Paypal').click();

    await page.getByTestId('continue-cta-desktop').click();
    await page.waitForTimeout(3000);
    await page.getByLabel('renewal-notice-consent').click();

    //await page.await page.goto('https://stg.newyorker.com/v2/offers/mot-v2-tny-test-2/review');


  // Wait for the visible PayPal iframe (not the prerender one)
  const visiblePayPalFrame = page.frameLocator('iframe.component-frame.visible[title="PayPal"]');
    
  // Alternative: Use the dynamic name pattern (more reliable)
  // const visiblePayPalFrame = page.frameLocator('iframe[name^="__zoid__paypal_buttons"][class="component-frame visible"]');

  // Wait for the PayPal button inside the iframe
  const payButton = visiblePayPalFrame.locator('[data-funding-source="paypal"]');
  
  await page.evaluate(() => {
    window.scrollTo(0, 500); // x=0, y=500
  });
  // Verify the button is visible (with a longer timeout)

  await expect(payButton).toBeVisible({ timeout: 20000 });
  
  await page.waitForTimeout(5000);

  
  

  const context = page.context();
     // Wait for the new PayPal popup window to appear
     const [popup] = await Promise.all([
        context.waitForEvent('page'),
         payButton.click({ force: true, timeout: 20000 }),
        
    ]);
    page.waitForTimeout(3000) // Safety timeout
    popup.waitForLoadState('domcontentloaded'), // Wait for initial HTML
    popup.waitForLoadState('networkidle'), // Wait for all resources // Waits for new window to open
    

    // Now you can interact with elements in the PayPal popup
    console.log('Popup URL:', popup.url());
    popup.title().then(title => console.log('Popup Title:', title));
  const url = await page.url()
  console.log("url :"+ url )
  
  await popup.getByPlaceholder('Email address or mobile number').fill("helloxyz@gmail.com");
  console.log("data enetered helloxyz@gmail.com :")
  await popup.getByRole('button', { name: 'Next' }).click();
  
  await popup.getByRole('link', { name: 'Cancel and return to merchant' }).click();
  //browser.pause()
})