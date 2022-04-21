import todosService from "../service";

const mockVerify = jest.fn().mockReturnValue({
    username: 'john',
    dateCreated: '',
});

todosService.jwtVerify = mockVerify;

test('user should be valid', () => {
    const username = "john";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6IkRvZSIsImRhdGVDcmVhdGVkIjoiMjk5OS0xMi0zMVQxNjowMDowMC4wMDBaIiwiaWF0IjoxNjUwNDcxMzczfQ.aU04-E2V7kZ2KWnMMJor7XyB-Yi5A_pfSMf66KVOBIc";
    const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002";
    expect(todosService.checkIsUserValid(username, token, privateKey)).toBe(true);
});

test('user should not be valid', () => {
    const username = "invalid";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6IkRvZSIsImRhdGVDcmVhdGVkIjoiMjk5OS0xMi0zMVQxNjowMDowMC4wMDBaIiwiaWF0IjoxNjUwNDcxMzczfQ.aU04-E2V7kZ2KWnMMJor7XyB-Yi5A_pfSMf66KVOBIc";
    const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002";
    expect(todosService.checkIsUserValid(username, token, privateKey)).toBe(false);
});