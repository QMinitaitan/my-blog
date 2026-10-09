# Article visibility

`src/config/post-visibility.mjs` is the shared publishing boundary. With
`focusHot100 = true`, only non-draft `leetcode-hot100-*` articles are public.
The list, archive, categories, tags, calendar, previous/next links, RSS and
article routes all use this boundary. Hidden routes are not generated, so
sitemap and production Pagefind also cannot include their bodies.

Restore other articles by setting `focusHot100` to `false` and rebuilding.
Their original source, metadata and resources are preserved. Independent
pages such as `/about/` are unaffected. Drafts remain private in both modes.
