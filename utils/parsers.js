const { Parser } = require("binary-parser");

export function parseLTP(buffer) {
    return new Parser()
        .int8("subscriptionMode")
        .int8("exchangeType")
        .string("token", { length: 25, encoding: "utf8", stripNull: true })
        .int64le("sequenceNumber")
        .int64le("exchangeTimestamp")
        .int32le("lastTradedPrice")
        .parse(buffer);
}

export function parseQuote(buffer) {
    return new Parser()
        .endianess("little")
        .int8("subscriptionMode")
        .int8("exchangeType")
        .string("token", { length: 25, encoding: "utf8", stripNull: true })
        .int64le("sequenceNumber")
        .int64le("exchangeTimestamp")
        .int64le("lastTradedPrice")
        .int64le("lastTradedQuantity")
        .int64le("averageTradedPrice")
        .int64le("volumeTraded")
        .doublele("totalBuyQuantity")
        .doublele("totalSellQuantity")
        .int64le("openPriceOfDay")
        .int64le("highPriceOfDay")
        .int64le("lowPriceOfDay")
        .int64le("closePrice")
        .parse(buffer);
}

export function parseSnapQuote(buffer) {
    return new Parser()
        .endianess("little")
        .int8("subscriptionMode")
        .int8("exchangeType")
        .string("token", { length: 25, encoding: "utf8", stripNull: true })
        .int64le("sequenceNumber")
        .int64le("exchangeTimestamp")
        .int64le("lastTradedPrice")
        .int64le("lastTradedQuantity")
        .int64le("averageTradedPrice")
        .int64le("volumeTraded")
        .doublele("totalBuyQuantity")
        .doublele("totalSellQuantity")
        .int64le("openPriceOfDay")
        .int64le("highPriceOfDay")
        .int64le("lowPriceOfDay")
        .int64le("closePrice")
        .int64le("lastTradedTimestamp")
        .int64le("openInterest")
        .doublele("openInterestChange")
        .array("bestFiveData", {
            length: 10,
            type: new Parser()
                .endianess("little")
                .int16le("buySellFlag")
                .int64le("quantity")
                .int64le("price")
                .int16le("numberOfOrders"),
        })
        .int64le("upperCircuitLimit")
        .int64le("lowerCircuitLimit")
        .int64le("52WeekHighPrice")
        .int64le("52WeekLowPrice")
        .parse(buffer);
}
