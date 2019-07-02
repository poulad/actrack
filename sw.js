"use strict";

const CACHE_NAME = "actrack-v1";

const urlsToCache = [
    "/_framework/_bin/Microsoft.AspNetCore.Authorization.dll",
    "/_framework/_bin/Microsoft.AspNetCore.Blazor.dll",
    "/_framework/_bin/Microsoft.AspNetCore.Components.Browser.dll",
    "/_framework/_bin/Microsoft.AspNetCore.Components.dll",
    "/_framework/_bin/Microsoft.AspNetCore.Metadata.dll",
    "/_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll",
    "/_framework/_bin/Microsoft.Extensions.DependencyInjection.dll",
    "/_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll",
    "/_framework/_bin/Microsoft.Extensions.Options.dll",
    "/_framework/_bin/Microsoft.Extensions.Primitives.dll",
    "/_framework/_bin/Microsoft.JSInterop.dll",
    "/_framework/_bin/Mono.Security.dll",
    "/_framework/_bin/Mono.WebAssembly.Interop.dll",
    "/_framework/_bin/mscorlib.dll",
    "/_framework/_bin/System.Buffers.dll",
    "/_framework/_bin/System.ComponentModel.Annotations.dll",
    "/_framework/_bin/System.Core.dll",
    "/_framework/_bin/System.dll",
    "/_framework/_bin/System.Memory.dll",
    "/_framework/_bin/System.Net.Http.dll",
    "/_framework/_bin/System.Numerics.Vectors.dll",
    "/_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll",
    "/_framework/_bin/System.Text.Json.dll",
    "/_framework/_bin/System.Threading.Tasks.Extensions.dll",
    "/_framework/wasm/mono.js",
    "/_framework/wasm/mono.wasm",
    "/_framework/blazor.boot.json",
    "/_framework/blazor.webassembly.js",

    // App specific requirements
    "/_framework/_bin/Actrack.dll",
    "/css/bootstrap/bootstrap.min.css",
    "/css/open-iconic/font/css/open-iconic-bootstrap.min.css",
    "/css/open-iconic/font/fonts/open-iconic.woff",
    "/css/site.css",
    "/index.html",
    "/favicon.ico",
    "/",
    "/funcs.js",
    "/sw.js",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                console.log("NOT CACHED:", event.request);
                return fetch(event.request);
            })
    );
});