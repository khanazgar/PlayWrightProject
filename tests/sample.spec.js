const {test,expect} =require('@playwright/test')

test("my first test", async function ({page}) {
expect(12).toBe(12)  
})

test("my second test", async function ({page}) {
    expect(100).toBe(100)   
   })

   test.skip("my third test", async function ({page}) {
    expect("Azgar khan").toContain("Azgar")   
   })

   test("my fourth test", async function ({page}) {
    expect(true).toBeTruthy() 
   })

   test("my five test", async function ({page}) {
    expect(false).toBeFalsy() 
   })

   test("my six test", async function ({page}) {
    expect("Azgar khan".includes("khan")).toBeTruthy() 
   })