//Load playwright module
const {test,expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_request_body.json');
//Write a test
test('Create a post api request using static json file request test', async({ request })=>{

    //Send a post request
const postAPIResponse = await request.post('/booking',{
   
    data:bookingAPIRequestBody
       
})


// Log status code
console.log("Response Status:", postAPIResponse.status());

//Validate status code
expect(postAPIResponse.ok()).toBeTruthy();
expect(postAPIResponse.status()).toBe(200);


const postAPIResponseBody = await postAPIResponse.json();
console.log("Full Response Body:", postAPIResponseBody);
console.log("Booking id :",postAPIResponseBody.bookingid);

// validate json response
expect(postAPIResponseBody.booking.firstname).toBe("Azgar");
expect(postAPIResponseBody.booking).toHaveProperty("firstname","Azgar");
expect(postAPIResponseBody.booking).toHaveProperty("lastname","khan");

//Validate nested json objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");
})