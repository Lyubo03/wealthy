import { AssetType } from "../common/enums/AssetType";
import {
  CryptoSymbolsArr,
  StockSymbolsArr,
} from "../common/finnhubAssetConstants";
import type { AssetDTO } from "../models/API/AssetDTO";

export async function FetchAssetPrice(assetType: AssetType) {
  const results: AssetDTO[] = [];
  const symbols = extractInvocationType(assetType);

  for (const symbol of symbols) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_FINNHUB_API_URL}quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
      );
      const data = await res.json();
      const asset: AssetDTO = { symbol, price: data.c, change: data.dp };
      results.push(asset);
      console.log(
        `Fetched data for ${symbol}: Price - ${asset.price}, Change - ${asset.change}`,
      );
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      results.push({ symbol, price: 0, change: 0 });
    }
  }

  return results;
}

export async function FetchAssetPrices(symbols: string[]): Promise<AssetDTO[]> {
  const results: AssetDTO[] = [];

  for (const symbol of symbols) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_FINNHUB_API_URL}quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
      );
      const data = await res.json();
      const asset: AssetDTO = { symbol, price: data.c, change: data.dp };
      results.push(asset);
      console.log(
        `Fetched data for ${symbol}: Price - ${asset.price}, Change - ${asset.change}`,
      );
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      results.push({ symbol, price: 0, change: 0 });
    }
  }

  return results;
}

function extractInvocationType(assetType: AssetType): string[] {
  switch (assetType) {
    case AssetType.CRYPTO:
      return CryptoSymbolsArr;
    case AssetType.STOCK:
      return StockSymbolsArr;
    default:
      throw new Error(`Unsupported asset type: ${assetType}`);
  }
}
