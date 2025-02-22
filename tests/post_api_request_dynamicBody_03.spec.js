//Load playwright module
const {test,expect} = require('@playwright/test')
import {faker} from '@faker-js/faker';
const {DateTime} = require('luxon');
//Write a test
test('03_Create a post api request using dynamic request body test', async({ request })=>{


    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int(1000);
    
    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd');
    
    const postAPIResponse = await request.post('/booking',{
   
   //Create a dynamic post request body
    data:{
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": true,
        "bookingdates": {
            "checkin": checkInDate,
            "checkout": checkOutDate
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
expect(postAPIResponseBody.booking.firstname).toBe(firstName);
expect(postAPIResponseBody.booking).toHaveProperty("firstname",firstName);
expect(postAPIResponseBody.booking).toHaveProperty("lastname",lastName);

//Validate nested json response
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin",checkInDate);
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout",checkOutDate);
})