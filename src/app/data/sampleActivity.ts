export default {
  conversation: { id: 'c-00001' },
  from: { id: 'bot' },
  type: 'message',
  text: `Sure, you should override the default proxy settings[1]\u200B[2], when your proxy server requires authentication[3]. Here's a fourth citation[4].

[1]: https://support.microsoft.com/en-us/windows/use-a-proxy-server-in-windows-03096c53-0554-4ffe-b6ab-8b1deee8dae1 "Use a proxy server in Windows"
[2]: cite:1 "Introduction Configuring proxy settings is a fundamental aspect..."
[3]: cite:2 "This citation has no name"
[4]: cite:foo "Sample HTML"
`,
  entities: [
    {
      '@context': 'https://schema.org',
      '@id': 'cite:1',
      '@type': 'Claim',
      name: 'Sample Citation From File',
      type: 'https://schema.org/Claim',

      text: `
## Introduction

*Configuring* **proxy** _settings_ __is__ a fundamental aspect of \`network\` and [system administration](http://example.com). Proxies serve as intermediaries between a user's device and the internet, providing various benefits such as improved security, anonymity, and network performance. In this guide, we will delve into the intricacies of configuring Proxy Auto-Discovery (PAD) proxy settings. We'll explore what PAD is, why it's essential, and how to configure it effectively. []
> This is a block quote!

1. first
1. second
1. third

- unordered A
- unordered B
- unordered C
`
    },
    {
      '@context': 'https://schema.org',
      '@id': 'cite:foo',
      '@type': 'Claim',
      name: 'Sample Citation From HTML',
      type: 'https://schema.org/Claim',

      text: `
<h2>Header</h2>
<p>This is some text with a <a href="http://example.com">link in it</a>. Also <strong>some text</strong> <em>with formatting</em>.</p>
<ul>
<li>Unordered</li>
<li>list</li>
<li>items</li>
</ul>
<ol>
<li>Ordered</li>
<li>list</li>
<li>items</li>
</ol>

<script>This isn't allowed!</script>
`
    },
    {
      '@context': 'https://schema.org',
      '@id': 'cite:2',
      '@type': 'Claim',
      type: 'https://schema.org/Claim',
      text: 'Here is some plain text without any Markdown formatting in it.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ReplyAction',
      type: 'https://schema.org/ReplyAction',

      description: 'Surfaced by Azure OpenAI',
      provider: {
        '@type': 'Project',

        name: 'Azure OpenAI',
        url: 'https://www.microsoft.com/en-us/ai/responsible-ai'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VoteAction',
      type: 'https://schema.org/VoteAction',

      actionOption: 'upvote'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VoteAction',
      type: 'https://schema.org/VoteAction',

      actionOption: 'downvote'
    }
  ]
};
