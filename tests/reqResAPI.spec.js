const{expect,test}=require('@playwright/test');
const{URLS}=require('../utils/urls');

test.describe('Reqres API Practices',()=>{

test('Get User',async ({ request }) => {

  const response =
      await request.get(
         URLS.REQRESfirst_API);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.data.id).toBe(2);
  expect(body.data.email).toContain('@');
});

test('Create User',async ({ request }) => {
   
    const response = 
         await request.post(
            URLS.REQRESsecond_API,
        {
         data: {
                name: 'Subramanian',
                job: 'Tester'
                }
        });
    expect(response.status()).toBe(201);
});

test('Delete User', async ({ request }) => {

    const response =
        await request.delete(
            URLS.REQRESfirst_API
        );

    expect(response.status()).toBe(204);

});
});