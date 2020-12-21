
/// <reference types="jest" />

import {DoubleLinked} from "../src/api/doubleLinked";


test('checking constructor function of DoubleLinke', () => {
    const newDouble = new DoubleLinked()
  
    expect(newDouble).toEqual({start : null, end : null})
})