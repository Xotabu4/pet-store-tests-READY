import { definitions } from '../types/petstore'
import { JsonRequest } from "http-req-builder"
import 'chai/register-should';


describe('Pets', () => {
    it('can get pet by id', async function () {
        const resp = await new JsonRequest()
            .url('http://93.126.97.71:10080/api/pet/1')
            .send<definitions["Pet"]>();
        
        resp.body.id.should.equal(1)
    })
}) 