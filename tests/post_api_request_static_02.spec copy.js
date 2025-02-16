//Load playwright module
const {test,expect} = require('@playwright/test')

//Write a test
test('Create a post api request using static json file request test', async({ request })=>{

const postAPIResponse = await request.post('/booking',{
   
    data:{
        "firstname": "Azgar khan",
        "lastname": "abdul",
        "totalprice": 1000,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "super bowls"
    }
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
expect(postAPIResponseBody.booking.firstname).toBe("Azgar khan");
expect(postAPIResponseBody.booking).toHaveProperty("firstname","Azgar khan");
expect(postAPIResponseBody.booking).toHaveProperty("lastname","abdul");

//Validate nested json objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");
})