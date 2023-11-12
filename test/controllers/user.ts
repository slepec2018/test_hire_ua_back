import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { create } from '../../src/controllers/user';
import User from '../../src/models/user';
import sinon, { SinonStub } from 'sinon';

describe('Testing the create function', () => {
  let req: Request;
  let res: Partial<Response> & {
    json: (data: any) => void;
    status: (code: number) => any;
    jsonData?: any;
  };
  let next: NextFunction;
  const validUser = {
    firstName: 'Anton',
    lastName: 'Zuban',
    email: 'slepec2018@gmail.com',
    phoneNumber: '1234567890',
    address: 'Aveiro, Portugal',
    zipCode: '3800-000',
  };

  beforeEach(() => {
    req = { body: validUser } as Request;
    res = {
      json: (data) => {
        res.jsonData = data;
      },
      status: (code) => {
        res.statusCode = code;
        return res;
      },
    } as Partial<Response> & { json: (data: any) => void, status: (code: number) => any };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new user and return a success message', async () => {
    const userFindOneStub: SinonStub = sinon.stub(User, 'findOne').resolves(null);
    const userSaveStub: SinonStub = sinon.stub(User.prototype, 'save').resolves({ _id: 'new_id' });

    await create(req, res as Response, next);

    expect(userFindOneStub.calledOnceWith({ email: validUser.email })).to.be.true;
    expect(userSaveStub.calledOnce).to.be.true;
    expect(res.statusCode).to.equal(201);
    expect(res.jsonData).to.deep.equal({ message: "Congratulations on creating your account. Check your email for further steps." });
  });

  it('should return an error if the user already exists', async () => {
    const userFindOneStub: SinonStub = sinon.stub(User, 'findOne').resolves(validUser);

    await create(req, res as Response, next);

    expect(userFindOneStub.calledOnceWith({ email: validUser.email })).to.be.true;
    expect(res.statusCode).to.equal(400);
    expect(res.jsonData).to.deep.equal({ error: 'A user with the given email already exists. Check your mailbox.' });
  });
});
