import todosService from "../service";

const mockVerify = jest.fn().mockReturnValue({
    username: 'john',
    dateCreated: '',
});


test('token should be valid', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvaG4iLCJwYXNzd29yZCI6IkRvZSIsImRhdGVDcmVhdGVkIjoiMjk5OS0xMi0zMVQxNjowMDowMC4wMDBaIiwiaWF0IjoxNjUwNDcxMzczfQ.aU04-E2V7kZ2KWnMMJor7XyB-Yi5A_pfSMf66KVOBIc";
    const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002";
    
    const mockDifferenceInHours = jest.fn().mockReturnValue(1);

    todosService.jwtVerify = mockVerify;
    todosService.dateFnsDifferenceInHours = mockDifferenceInHours;
    expect(todosService.checkIsTokenValid(token, privateKey)).toBe(true);
});

test('token should not be valid', () => {
    const token = "invalid.token";
    const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002";
    
    const mockDifferenceInHours = jest.fn().mockReturnValue(2);

    todosService.jwtVerify = mockVerify;
    todosService.dateFnsDifferenceInHours = mockDifferenceInHours;
    expect(todosService.checkIsTokenValid(token, privateKey)).toBe(false);
});