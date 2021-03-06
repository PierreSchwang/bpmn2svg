import assert from 'assert';
import TypedPool from "../src/lib/TypedPool";

describe('TypedPool', () => {

    it('min cannot be higher than max', () => {
        assert.throws(() => {
            new TypedPool<any>(() => Promise.reject(), 2, 1);
        });
    });

    it('min cannot be less than 0', () => {
        assert.throws(() => {
            new TypedPool<any>(() => Promise.reject(), -1, 1);
        });
    })

    it('max cannot be less than 0', () => {
        assert.throws(() => {
            new TypedPool<any>(() => Promise.reject(), 0, -1);
        });
    })

});
