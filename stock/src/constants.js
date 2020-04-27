export const REQUEST_OPTIONS = {
    headers: { accept: 'application/json' }
};

export const SET_CLIENT_METHOD = {
    name: 'T42.Demo.SetClient',
    accepts: 'Composite:Client{string clientId}'
};

export const SET_PRICES_STREAM = {
    name: 'T42.Demo.SetPrices',
    displayName: 'Publishes last trades',
    returns: 'Composite:Symbol{String symbol, Double bid, Double ask}[]'
};

export const SHARED_CONTEXT_NAME = 'T42.Demo.Client';
