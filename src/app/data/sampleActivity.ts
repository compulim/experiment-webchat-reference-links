export default {
  conversation: { id: 'c-00001' },
  from: { id: 'bot' },
  type: 'message',
  text: `Sure, you should override the default proxy settings[1][1][2][2], when your proxy server requires authentication[3][3].

  [1]: https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1 "Use a proxy server in Windows"
  [2]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/configure-proxy-server-settings "Configure proxy server settings - Windows Server"
  [3]: x-pva-citation:cite-1 "Introduction Configuring proxy settings is a fundamental aspect..."
  `,
  entities: [
    {
      '@context': 'https://schema.org/',
      '@id': 'x-pva-citation:cite-1',
      '@type': 'Claim',
      type: 'https://schema.org/Claim',

      text: `## Introduction

      *Configuring* **proxy** _settings_ __is__ a fundamental aspect of \`network\` and [system administration](http://example.com). Proxies serve as intermediaries between a user's device and the internet, providing various benefits such as improved security, anonymity, and network performance. In this guide, we will delve into the intricacies of configuring Proxy Auto-Discovery (PAD) proxy settings. We'll explore what PAD is, why it's essential, and how to configure it effectively. []
      > This is a block quote!

      1. first
      1. second
      1. third

      - unordered A
      - unordered B
      - unordered C

      ***

      ## Understanding Proxy Auto-Discovery (PAD)

      Proxy Auto-Discovery, often abbreviated as PAD, is a mechanism that simplifies the process of configuring proxy settings for network-connected devices. Its primary purpose is to automate the discovery of proxy servers and settings without manual intervention. PAD relies on a specific protocol called Web Proxy Auto-Discovery (WPAD).

      ## Conclusion

      Configuring Proxy Auto-Discovery (PAD) proxy settings is a vital task for network administrators seeking to streamline the proxy configuration process and enhance network security. By automating the discovery and configuration of proxy servers, PAD ensures efficiency, consistency, and scalability in network environments. However, it is essential to follow the recommended steps carefully and be prepared to troubleshoot common challenges to maintain a smooth proxy configuration process. Ultimately, a well-configured PAD proxy setup contributes to a more secure, efficient, and user-friendly network environment.
      `
    },
    {
      '@id': 'x-webchat-recipient-id:bot',
      '@context': 'https://schema.org/',
      '@type': 'Person',
      type: 'https://schema.org/Person',

      description: 'Surfaced by Azure OpenAI',
      text: 'Azure OpenAI',
      url: 'https://microsoft.com/...'
    }
  ]
};
