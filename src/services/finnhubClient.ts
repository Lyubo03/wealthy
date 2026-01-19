import { CryptoSymbolsArr } from "../common/consts";
import type { CryptoDTO } from "../models/CryptoDTO";

//TODO: Think about separating on two interfaces for better scalability
//Should they be two with diff methods or one with a param to specify which to fetch?
//Think of the error handling strategy as well
//implement semaphore to limit concurrent requests if needed and try fetch them in parallel batches
export async function FetchCryptoPrice(){
    const results: CryptoDTO[] = [];

    for (const symbol of CryptoSymbolsArr) {
        try {
            const res = await fetch(`${import.meta.env.VITE_FINNHUB_API_URL}quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`);
            const data = await res.json();
            const crypto: CryptoDTO = { symbol, price: data.c, change: data.dp };
            results.push(crypto);
            console.log(`Fetched data for ${symbol}: Price - ${crypto.price}, Change - ${crypto.change}`);
        } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            results.push({ symbol, price: 0, change: 0 });
        }
    }

    return results;
}