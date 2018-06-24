function fixedEncodeUri (str) {
    return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}