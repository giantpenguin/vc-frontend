Microsoft Application Request Routing (ARR) for IIS 7 and above is a proxy-based routing module that forwards HTTP requests to content servers based on HTTP headers, server variables, and load balance algorithms.

ARR relies on the URL rewrite module to inspect incoming HTTP requests to make the routing decisions. Therefore, the URL rewrite module is required to enable ARR features.
https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/setting-http-request-headers-and-iis-server-variables


ISSUES:

AddOpenIdConnect options.Authority overriden with current host behind proxy (UseForwardedHeaders)
https://github.com/dotnet/aspnetcore/issues/31383
The issue was caused by the IIS reverse proxy configurations, that I'm using locally - Application Request Routing -> Server Proxy Settings -> Reverse rewrite host in response headers.
