import UserService from "../service";


const username = "TestUsername";
const password = "TestPassword";
const dateCreated = Date.now();
const privateKey = "TestPrivateKey";

test('Should generate token', () => {
    expect(UserService.createToken( username, password, dateCreated, privateKey)).toBeDefined();
});
