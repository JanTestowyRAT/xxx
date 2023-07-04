function FindProxyForURL(url, host)
{
 
/* Normalize the URL for pattern matching */
url = url.toLowerCase();
host = host.toLowerCase();
 
/* Don't proxy local hostnames */
if (isPlainHostName(host))
{
return 'DIRECT';
}
 
/* Don't proxy local domains */
if (dnsDomainIs(host, ".go4labs.local"))
{
return 'DIRECT';
}

/* Don't proxy Domains */
if ((host == "download.microsoft.com") ||
(host == "ntservicepack.microsoft.com") ||
(host == "cdm.microsoft.com") ||
(host == "wustat.windows.com") ||
(host == "windowsupdate.microsoft.com") ||
(dnsDomainIs(host, ".windowsupdate.microsoft.com")) ||
(host == "update.microsoft.com") ||
(dnsDomainIs(host, ".update.microsoft.com")) ||
(dnsDomainIs(host, ".domena.pl")) ||
(dnsDomainIs(host, ".domena.pl")) ||
(dnsDomainIs(host, ".domena.pl")) ||
(dnsDomainIs(host, ".session.rservices.com")) ||
(dnsDomainIs(host, ".extranet.thomsonreuters.biz")) ||
(dnsDomainIs(host, ".reuters.com")) ||
(dnsDomainIs(host, ".domena.pl")) ||
(dnsDomainIs(host, ".domena.pl")) ||
(dnsDomainIs(host, ".windowsupdate.com")))
{
return 'DIRECT';
}
 
if (isResolvable(host))
{
var hostIP = dnsResolve(host);
 
/* Don't proxy non-routable addresses (RFC 3330) and own public addresesd */
if (isInNet(hostIP, '0.0.0.0', '255.0.0.0') ||
isInNet(hostIP, '10.0.0.0', '255.0.0.0') ||
isInNet(hostIP, '127.0.0.0', '255.0.0.0') ||
isInNet(hostIP, '169.254.0.0', '255.255.0.0') ||
isInNet(hostIP, '172.16.0.0', '255.240.0.0') ||
isInNet(hostIP, '192.0.2.0', '255.255.255.0') ||
isInNet(hostIP, '192.88.99.0', '255.255.255.0') ||
isInNet(hostIP, '192.168.0.0', '255.255.0.0') ||
isInNet(hostIP, '198.18.0.0', '255.254.0.0') ||
isInNet(hostIP, '224.0.0.0', '240.0.0.0'))
{
return 'DIRECT';
}

}

/* if (isInNet(myIpAddress(), "10.x.x.x", "255.255.255.255"))
{ return "PROXY test.proxy.ratels.pl:8080; " +
"PROXY proxy.ratels.pl:8080";
} */
 

/* Proxy Domains via another proxy*/
if ((host == "ratels.pl") ||
(host == "intranet.commerzbank.com") ||
(host == "rootdom.net") ||
(host == "dresdner.net"))
{
return 'PROXY 192.168.153.100:8080';
}
 
 return randomProxy();

function randomProxy()
{
switch( Math.floor( Math.random() *2))
{
case 0: return "PROXY web-wcg.go4labs.local:8080; PROXY web1-wcg.go4labs.local:8080;"
case 1: return "PROXY web1-wcg.go4labs.local:8080; PROXY web-wcg.go4labs.local:8080;"
}
}


return 'DIRECT';
}