//Load playwright module
const {test,expect} = require('@playwright/test')
const bookingAPIRequestBody = require('../test-data/post_dynamic_request_body.json');

import {stringFormat} from '../utils/common.js';

//Write a test
test('Create a get api request test', async({ request })=>{


   const dynamicRequestBody =  stringFormat(JSON.stringify(bookingAPIRequestBody),"Azhaan","Iqra","Apple");
    //Send a post request
const postAPIResponse = await request.post('/booking',{
   
    data:JSON.parse(dynamicRequestBody),
       
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
expect(postAPIResponseBody.booking.firstname).toBe("Azhaan");
expect(postAPIResponseBody.booking).toHaveProperty("firstname","Azhaan");
expect(postAPIResponseBody.booking).toHaveProperty("lastname","Iqra");

//Validate nested json objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01");
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkout","2019-01-01");
//Validate  json object
expect(postAPIResponseBody.booking.additionalneeds).toBe("Apple");
console.log("====================getAPI=====================");
//Send a get request
const bookingID = postAPIResponseBody.bookingid;

      const getAPIResponse =  await request.get(`/booking/${bookingID}`)

      console.log(await getAPIResponse.json());     
//Validate status code
expect(getAPIResponse.ok()).toBeTruthy();
expect(getAPIResponse.status()).toBe(200);
})