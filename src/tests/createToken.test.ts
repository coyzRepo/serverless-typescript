import todosService from "../service";


const username = "TestUsername";
const password = "TestPassword";
const dateCreated = Date.now();
const privateKey = "TestPrivateKey";

test('Should generate token', () => {
    expect(todosService.createToken( username, password, dateCreated, privateKey)).toBeDefined();
});
