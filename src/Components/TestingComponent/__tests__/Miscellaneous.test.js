/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import { render, screen, act, fireEvent, prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom'
import Miscellaneous from '../Miscellaneous'
import { callAfterTimeout } from '../../../Constant'
import { getTokenFromMemCache, TokenExtractor } from '../../../Utilies/utils'

// import jwt from 'jsonwebtoken'
jest.mock('node-cache')

jest.mock('node-cache', () => function NodeCache() {
    const cachedObj = { testingKey: 'testingValue' }
    this.get = function (key) {
        return cachedObj[key]
    }
})
describe('Mg Backend tricky test', () => {

    // it('Should extract token', () => {
    //     const nextFn = jest.fn()
    //     const token = jwt.sign({ aud: 'randomvalue', data: { seller_code: 343 } }, 'secret', { expiresIn: '1min' });
    //     process.env.GSC_AUDIENCE = "randomvalue";
    //     TokenExtractor({ headers: { authorization: `Bearer ${token}` } }, undefined, nextFn)
    //     expect(nextFn).toHaveBeenCalledTimes(1)
    // })

    it('Should return null if no key is found', () => {
        const response = getTokenFromMemCache('myKey')
        expect(response).toBe(null)
    })

    it('Should get value from memCache', () => {
        const response = getTokenFromMemCache('testingKey')
        expect(response).toBe('testingValue')
    })

})


window.matchMedia = window.matchMedia || (() => {
    return {
        matches: false,
        addListener() { },
        removeListener() { },
    }
})
describe('Date Picker', () => {
    it('Test Date Picker component', async () => {
        render(<Miscellaneous />)
        //select start date from calender(start date)
        const startDate = screen.getByPlaceholderText('SEARCH_START_DATE_PLACEHOLDER')
        fireEvent.mouseDown(startDate)
        fireEvent.change(startDate, { target: { value: "2020-12-20" } });
        await act(async () => {
            fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[0]);
        })

        const endDate = screen.getByPlaceholderText("SEARCH_END_DATE_PLACEHOLDER");
        await fireEvent.mouseDown(endDate);
        await fireEvent.change(endDate, { target: { value: "2023-02-20" } });
        await act(async () => {
            fireEvent.click(document.querySelectorAll(".ant-picker-cell-selected")[1]);
        })
    })

    it('Should clear Start date', async () => {
        render(<Miscellaneous />)
        const startDate = screen.getByPlaceholderText('SEARCH_START_DATE_PLACEHOLDER')
        fireEvent.mouseOver(startDate)
        const closeIcon = (screen.getAllByRole('img', { name: 'close-circle' })[0])?.parentElement
        await act(async () => {
            await fireEvent.mouseUp(closeIcon)
        })
    })
})

describe('Input', () => {
    it('Test input component', () => {
        render(<Miscellaneous />)
        const inputField = screen.getByPlaceholderText('SEARCH_RULE_NAME')
        act(() => {
            fireEvent.change(inputField, { target: { value: 'Debit' } })
        })
    })
})

describe('Testing constant functions', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    // jest.setTimeout(30000)
    it('Should test setTimeout fn', async () => {
        callAfterTimeout()
        // jest.runAllTimers()
        // jest.advanceTimersByTime(500);
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    })
})

